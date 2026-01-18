package com.kesug.myapplication

import android.Manifest
import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.webkit.*
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.journeyapps.barcodescanner.CaptureActivity
import com.journeyapps.barcodescanner.ScanContract
import com.journeyapps.barcodescanner.ScanOptions
import com.kesug.myapplication.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

    private val startUrl = "https://shopnoltd-dashboard.onrender.com/login.html"
    private var filePathCallback: ValueCallback<Array<Uri>>? = null
    private var webView: WebView? = null

    // File chooser
    private val fileChooserLauncher =
        registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
            filePathCallback?.onReceiveValue(if (uri != null) arrayOf(uri) else null)
            filePathCallback = null
        }

    // QR scanner
    private val qrScannerLauncher = registerForActivityResult(ScanContract()) { result ->
        result?.contents?.let { scannedValue ->
            webView?.evaluateJavascript(
                "javascript:onQRCodeScanned('$scannedValue')",
                null
            )
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestPermissionsIfNeeded()

        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            cookieManager.setAcceptThirdPartyCookies(WebView(this), true)
        }

        setContent {
            MyApplicationTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AndroidView(
                        factory = {
                            WebView(this).apply {
                                webView = this
                                setupWebView(this)
                                loadUrl(startUrl)
                            }
                        },
                        update = {}
                    )
                }
            }
        }
    }

    private fun requestPermissionsIfNeeded() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val permissionsNeeded = mutableListOf<String>()

            if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED)
                permissionsNeeded.add(Manifest.permission.CAMERA)

            if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED)
                permissionsNeeded.add(Manifest.permission.READ_EXTERNAL_STORAGE)

            if (permissionsNeeded.isNotEmpty()) {
                requestPermissions(permissionsNeeded.toTypedArray(), 101)
            }
        }
    }

    private fun setupWebView(webView: WebView) {
        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

        webView.webViewClient = object : WebViewClient() {

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url.toString()
                return handleCustomUrl(url)
            }

            override fun shouldOverrideUrlLoading(view: WebView?, url: String): Boolean {
                return handleCustomUrl(url)
            }

            private fun handleCustomUrl(url: String): Boolean {

                // Allow normal links
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    return false
                }

                // Special schemes for apps
                val supportedSchemes = listOf(
                    "tg:", "whatsapp:", "fb:", "intent:", "viber:", "sms:", "mailto:",
                    "tel:", "instagram:", "m.me:", "geo:", "market:"
                )

                if (supportedSchemes.any { url.startsWith(it) }) {
                    try {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                        startActivity(intent)
                    } catch (e: ActivityNotFoundException) {

                        // Fallbacks
                        when {
                            url.startsWith("tg:") ->
                                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://t.me/")))

                            url.startsWith("whatsapp:") ->
                                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://wa.me/")))

                            url.startsWith("fb:") || url.startsWith("intent:") ->
                                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://facebook.com/")))

                            else -> Log.e("URL_HANDLER", "No app found for: $url")
                        }
                    }
                    return true
                }

                return false
            }
        }

        // ChromeClient for upload
        webView.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(
                webView: WebView?,
                filePath: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                filePathCallback = filePath
                fileChooserLauncher.launch("*/*")
                return true
            }
        }

        // Download handler
        webView.setDownloadListener { url, _, _, _, _ ->
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            startActivity(intent)
        }

        // JS Interface (Share + QR)
        webView.addJavascriptInterface(object {
            @JavascriptInterface
            fun share(text: String) {
                val intent = Intent(Intent.ACTION_SEND)
                intent.type = "text/plain"
                intent.putExtra(Intent.EXTRA_TEXT, text)
                startActivity(Intent.createChooser(intent, "Share using"))
            }

            @JavascriptInterface
            fun scanQRCode() {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
                    checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED
                ) {
                    requestPermissions(arrayOf(Manifest.permission.CAMERA), 101)
                    return
                }

                runOnUiThread {
                    val options = ScanOptions().apply {
                        setDesiredBarcodeFormats(ScanOptions.QR_CODE)
                        setPrompt("Scanning QR...")
                        setBeepEnabled(true)
                        setOrientationLocked(false)
                        captureActivity = CaptureActivity::class.java
                    }
                    qrScannerLauncher.launch(options)
                }
            }
        }, "Android")
    }
}
