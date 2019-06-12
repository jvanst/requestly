<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">
    <router-view />
    <snack-bar/>
    <apple-install-prompt/>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    SnackBar: () => import(/* webpackPrefetch: true */ '@/components/SnackBar.vue'),
    AppleInstallPrompt: () => import(/* webpackPrefetch: true */ '@/components/AppleInstallPrompt')
  }
}
</script>
