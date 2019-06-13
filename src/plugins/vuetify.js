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
        secondary: '#00796B'
      },
      dark: {
        primary: '#00796B',
        secondary: '#00796B'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
