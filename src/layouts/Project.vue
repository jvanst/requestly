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
  props: ['productId'],
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Project/AppBar.vue'),
    NavDrawer: () => import(/* webpackPreload: true */ '@/components/Project/NavDrawer.vue'),
    SnackBar: () => import(/* webpackPreload: true */ '@/components/SnackBar.vue')
  },
  created () {
    this.$store.commit('SET_PROJECT', { id: this.$route.params.projectId })
  }
}
</script>
