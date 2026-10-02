package com.skillswap

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

import java.io.File

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList = PackageList(this).packages,
      jsBundleFilePath = getJSBundleFile(),
    )
  }

  private fun getJSBundleFile(): String? {
    val codepushFile = File(filesDir, "codepush_bundle/index.android.bundle")
    return if (codepushFile.exists()) {
      codepushFile.absolutePath
    } else {
      null
    }
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
