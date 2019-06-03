// vue.config.js

module.exports = {
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
    name: 'Requestly',
    themeColor: '#00796B',
    msTileColor: '#000000',
    assetsVersion: 'KmnAgxvbQ6',
    manifestOptions: {
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#4DBA87'
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-icon-144x144.png'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
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
    },
    prerenderSpa: {
      renderRoutes: [
        '/',
        '/login',
        '/register'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
