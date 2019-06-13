<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">
    <app-bar/>
    <v-content id="content" class="teal" style="overflow:hidden">
      <router-view />
    </v-content>
    <snack-bar/>
    <apple-install-prompt/>
  </v-app>
</template>

<script>
import AppBar from '@/components/Index/AppBar.vue'

export default {
  name: 'Project',
  components: {
    AppBar,
    SnackBar: () => import(/* webpackPrefetch: true */ '@/components/SnackBar.vue'),
    AppleInstallPrompt: () => import(/* webpackPrefetch: true */ '@/components/AppleInstallPrompt')
  }
}
</script>
