import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare const process: { env: { [key: string]: string | undefined } };

// Netlify CodePush server URL loaded strictly from environment configuration
const CODEPUSH_SERVER_URL = process.env.CODEPUSH_SERVER_URL || 'https://codepushs.netlify.app';
const BUNDLE_VERSION_KEY = '@codepush_bundle_version';
const CODEPUSH_API_KEY_KEY = '@codepush_api_key';

// Default Scoped App API Key for SkillSwap
const DEFAULT_API_KEY = process.env.CODEPUSH_API_KEY || 'sk_live_skillswap_app_key_8849';

export interface UpdateCheckResponse {
  updateAvailable: boolean;
  downloadUrl: string | null;
  latestVersion: string;
  mandatory: boolean;
  hash: string;
  releaseNotes?: string;
}

export interface CheckUpdateResult {
  updateAvailable: boolean;
  latestVersion?: string;
  applied: boolean;
  message: string;
}

export const CodePushService = {
  /**
   * Retrieves active App API Key for scoping server requests
   */
  async getApiKey(): Promise<string> {
    try {
      return (await AsyncStorage.getItem(CODEPUSH_API_KEY_KEY)) || DEFAULT_API_KEY;
    } catch {
      return DEFAULT_API_KEY;
    }
  },

  /**
   * Sets custom App API Key for scoping requests
   */
  async setApiKey(key: string): Promise<void> {
    await AsyncStorage.setItem(CODEPUSH_API_KEY_KEY, key);
  },

  /**
   * Reports live device status ping to Netlify serverless database with API Key scoping
   */
  async reportStatus(action: string, version: string): Promise<void> {
    try {
      const platform = Platform.OS;
      const apiKey = await this.getApiKey();

      await fetch(`${CODEPUSH_SERVER_URL}/.netlify/functions/report-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          platform,
          version,
          action,
          apiKey,
          device: `${platform === 'android' ? 'Android Phone' : 'iPhone'} (${Platform.Version})`,
        }),
      });
    } catch (e) {
      console.warn('[CodePush] Telemetry ping error:', e);
    }
  },

  /**
   * Checks Netlify serverless endpoint and silently downloads & applies updates in the background
   */
  async checkForUpdates(options: { autoRestart?: boolean } = {}): Promise<CheckUpdateResult> {
    try {
      const platform = Platform.OS; // 'android' or 'ios'
      const currentVersion = (await AsyncStorage.getItem(BUNDLE_VERSION_KEY)) || '1.0.0';
      const apiKey = await this.getApiKey();

      console.log(`[CodePush] Silently checking updates for ${platform} (Active: v${currentVersion})...`);

      // Telemetry ping
      this.reportStatus(`App active → Background update check (Active: v${currentVersion})`, currentVersion);

      const endpoint = `${CODEPUSH_SERVER_URL}/.netlify/functions/check-update?platform=${platform}&currentVersion=${currentVersion}&apiKey=${encodeURIComponent(apiKey)}`;
      const res = await fetch(endpoint, {
        headers: {
          'x-api-key': apiKey,
        },
      });
      const data: UpdateCheckResponse = await res.json();

      if (data.updateAvailable && data.downloadUrl) {
        console.log(`⚡ [CodePush] New OTA update detected: v${data.latestVersion} → Downloading silently in background...`);
        this.reportStatus(`Found release v${data.latestVersion} → Silent background download`, data.latestVersion);

        const applied = await this.downloadAndApplyUpdate(data.downloadUrl, data.latestVersion, {
          autoRestart: options.autoRestart ?? false,
        });

        return {
          updateAvailable: true,
          latestVersion: data.latestVersion,
          applied,
          message: `Update v${data.latestVersion} downloaded silently in background.`,
        };
      } else {
        console.log(`✅ [CodePush] App is on latest version (v${currentVersion}).`);
        return {
          updateAvailable: false,
          latestVersion: currentVersion,
          applied: false,
          message: 'App is up to date.',
        };
      }
    } catch (err: any) {
      console.warn('[CodePush] Background update check failed:', err);
      return {
        updateAvailable: false,
        applied: false,
        message: err?.message || 'Network check failed',
      };
    }
  },

  /**
   * Downloads update ZIP, unzips bundle to documents directory, updates local version record silently
   */
  async downloadAndApplyUpdate(
    downloadUrl: string,
    newVersion: string,
    options: { autoRestart?: boolean } = {}
  ): Promise<boolean> {
    const downloadDest = `${RNFS.CachesDirectoryPath}/bundle-update.zip`;
    const extractPath = `${RNFS.DocumentDirectoryPath}/codepush_bundle`;

    try {
      console.log(`[CodePush] Downloading bundle silently: ${downloadUrl}`);
      const downloadResult = await RNFS.downloadFile({
        fromUrl: downloadUrl,
        toFile: downloadDest,
      }).promise;

      if (downloadResult.statusCode >= 200 && downloadResult.statusCode < 400) {
        // 1. Extract archive to app documents directory
        await unzip(downloadDest, extractPath);

        // 2. Update active version record in AsyncStorage
        await AsyncStorage.setItem(BUNDLE_VERSION_KEY, newVersion);

        // 3. Clean up downloaded ZIP archive
        await RNFS.unlink(downloadDest);

        console.log(`🎉 [CodePush] Silent update installed: v${newVersion}!`);
        this.reportStatus(`Applied OTA update v${newVersion} silently in background`, newVersion);

        // If autoRestart is requested, reload JS engine immediately without popup
        if (options.autoRestart) {
          RNRestart.Restart();
        }

        return true;
      } else {
        console.warn(`[CodePush] Silent download failed with status code: ${downloadResult.statusCode}`);
        return false;
      }
    } catch (e) {
      console.warn('[CodePush] Silent update application error:', e);
      return false;
    }
  },

  /**
   * Gets the currently active CodePush bundle version string
   */
  async getActiveVersion(): Promise<string> {
    try {
      return (await AsyncStorage.getItem(BUNDLE_VERSION_KEY)) || '1.0.0 (Base Build)';
    } catch {
      return '1.0.0 (Base Build)';
    }
  },

  /**
   * Clears installed OTA hotfix bundle locally on device and resets back to base build 1.0.0
   */
  async clearInstalledHotfix(): Promise<void> {
    try {
      const extractPath = `${RNFS.DocumentDirectoryPath}/codepush_bundle`;
      const exists = await RNFS.exists(extractPath);
      if (exists) {
        await RNFS.unlink(extractPath);
      }
      await AsyncStorage.removeItem(BUNDLE_VERSION_KEY);
      this.reportStatus('Mobile app reset to Base Build (Cleared installed hotfix)', '1.0.0 (Base Build)');
      console.log('🗑️ [CodePush] Hotfix cleared. Restarting app to base build...');
      RNRestart.Restart();
    } catch (err: any) {
      console.warn('[CodePush] Error clearing hotfix:', err);
    }
  },
};
