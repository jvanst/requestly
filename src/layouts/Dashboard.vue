<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">
    <app-bar/>
    <v-content id="content" class="teal">
      <new-content-banner/>
      <router-view />
    </v-content>
    <snack-bar/>
    <apple-install-prompt/>
  </v-app>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Dashboard/AppBar.vue'),
    NewContentBanner: () => import(/* webpackPreload: true */ '@/components/NewContentBanner'),
    SnackBar: () => import(/* webpackPrefetch: true */ '@/components/SnackBar.vue'),
    AppleInstallPrompt: () => import(/* webpackPrefetch: true */ '@/components/AppleInstallPrompt')
  }
}
</script>
