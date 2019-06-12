<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">
    <app-bar/>
    <v-content id="content" class="teal">
      <new-content-banner/>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Dashboard/AppBar.vue'),
    NewContentBanner: () => import(/* webpackPreload: true */ '@/components/NewContentBanner')
  }
}
</script>
