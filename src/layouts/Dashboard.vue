<template>
  <v-app id="app" :dark="$store.state.ui.dark">
    <app-bar/>
    <v-content id="content" class="teal" style="overflow:hidden">
      <router-view />
      <snack-bar/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Dashboard/AppBar.vue'),
    SnackBar: () => import(/* webpackPreload: true */ '@/components/SnackBar.vue')
  }
}
</script>
