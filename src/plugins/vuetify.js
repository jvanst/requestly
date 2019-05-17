import 'vuetify/src/styles/main.sass'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  icons: {
    iconfont: 'md' // default
  }
})

export default new Vuetify({
  theme: {
    dark: false
  }
})
