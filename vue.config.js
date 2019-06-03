// vue.config.js

var path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [ '/', '/login' ],
        renderer: new Renderer({
          headless: true,
          renderAfterDocumentEvent: 'render-event'
        })
      })
    ]
  },
  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass')
      }
    }
  },
  pwa: {
    themeColor: '#00796B',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.join('public', 'service-worker.js')
    }
  },
  pluginOptions: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
}
