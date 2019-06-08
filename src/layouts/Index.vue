<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">
    <app-bar/>
    <v-content id="content" class="teal" style="overflow:hidden">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Index/AppBar.vue')
  }
}
</script>
