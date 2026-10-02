import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare const process: { env: { [key: string]: string | undefined } };

// Netlify CodePush server URL loaded strictly from environment configuration
const CODEPUSH_SERVER_URL = process.env.CODEPUSH_SERVER_URL;
const BUNDLE_VERSION_KEY = '@codepush_bundle_version';

export interface UpdateCheckResponse {
  updateAvailable: boolean;
  downloadUrl: string | null;
  latestVersion: string;
  mandatory: boolean;
  hash: string;
  releaseNotes?: string;
}

export const CodePushService = {
  /**
   * Checks Netlify serverless endpoint for available JS bundle updates
   */
  async checkForUpdates(): Promise<void> {
    try {
      if (!CODEPUSH_SERVER_URL) {
        console.warn('[CodePush] Error: CODEPUSH_SERVER_URL environment variable is not defined.');
        return;
      }

      const platform = Platform.OS; // 'android' or 'ios'
      const currentVersion = (await AsyncStorage.getItem(BUNDLE_VERSION_KEY)) || '1.0.0';

      console.log(`[CodePush] Checking updates for ${platform} (Active: v${currentVersion})...`);

      const endpoint = `${CODEPUSH_SERVER_URL}/.netlify/functions/check-update?platform=${platform}&currentVersion=${currentVersion}`;
      const res = await fetch(endpoint);
      const data: UpdateCheckResponse = await res.json();

      if (data.updateAvailable && data.downloadUrl) {
        console.log(`⚡ [CodePush] New OTA update detected: v${data.latestVersion}`);
        await this.downloadAndApplyUpdate(data.downloadUrl, data.latestVersion);
      } else {
        console.log('✅ [CodePush] App is up to date.');
      }
    } catch (err) {
      console.warn('[CodePush] Update check failed:', err);
    }
  },

  /**
   * Downloads update ZIP, unzips bundle to documents directory, updates local version & restarts JS runtime
   */
  async downloadAndApplyUpdate(downloadUrl: string, newVersion: string): Promise<void> {
    const downloadDest = `${RNFS.CachesDirectoryPath}/bundle-update.zip`;
    const extractPath = `${RNFS.DocumentDirectoryPath}/codepush_bundle`;

    console.log(`[CodePush] Downloading bundle from CDN: ${downloadUrl}`);
    const downloadResult = await RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: downloadDest,
    }).promise;

    console.log(`[CodePush] Download completed with status: ${downloadResult.statusCode}`);

    if (downloadResult.statusCode >= 200 && downloadResult.statusCode < 400) {
      // 2. Extract archive to app documents directory
      await unzip(downloadDest, extractPath);

      // 3. Update active version record in AsyncStorage
      await AsyncStorage.setItem(BUNDLE_VERSION_KEY, newVersion);

      // 4. Clean up downloaded ZIP archive
      await RNFS.unlink(downloadDest);

      console.log('🎉 [CodePush] Hotfix installed! Reloading app JS engine...');

      // 5. Instantly restart React Native JS runtime engine
      RNRestart.Restart();
    } else {
      console.warn(`[CodePush] Download failed with status code: ${downloadResult.statusCode}`);
    }
  },
};
