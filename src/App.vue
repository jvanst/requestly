<template>
  <v-app id="app" :dark="$store.state.ui.dark">
    <app-bar/>
    <nav-drawer/>
    <v-content id="content">
      <router-view />
      <snack-bar/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/AppBar.vue'),
    NavDrawer: () => import(/* webpackPreload: true */ '@/components/NavDrawer.vue'),
    SnackBar: () => import(/* webpackPreload: true */ '@/components/SnackBar.vue')
  }
}
</script>
