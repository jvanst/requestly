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
    name: 'Requestly'
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
