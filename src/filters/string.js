import Vue from 'vue'

Vue.filter('capitalizeFirstLetter', s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
})
