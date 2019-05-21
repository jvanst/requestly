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
        secondary: '#FF9800',
        accent: '#D7EEFA',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        typhography: '#212121'
      },
      dark: {
        primary: '#009688',
        secondary: '#FF9800',
        accent: '#D7EEFA',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        typhography: '#212121'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
