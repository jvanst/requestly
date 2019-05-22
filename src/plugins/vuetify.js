import 'vuetify/src/styles/main.sass'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#009688',
        error: '#F44336',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FBC02D'
      },
      dark: {
        primary: '#009688',
        error: '#F44336',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FBC02D'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
