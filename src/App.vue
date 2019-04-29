<template>
  <v-app id="app">
    <app-bar/>
    <nav-bar/>
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
    NavBar: () => import(/* webpackPreload: true */ '@/components/NavBar.vue'),
    SnackBar: () => import(/* webpackPreload: true */ '@/components/SnackBar.vue')
  }
}
</script>
