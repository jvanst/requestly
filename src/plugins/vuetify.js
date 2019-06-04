import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#00796B',
        error: '#F44336',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FBC02D'
      },
      dark: {
        primary: '#00796B',
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
