<template>
  <router-view />
</template>

<script>
export default {
  name: 'app',
  created () {
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$store.commit('SET_DARK', true)
    }
  }
}
</script>
