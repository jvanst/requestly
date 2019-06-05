<template>
  <v-app :dark="$store.state.ui.dark" data-server-rendered="true">
    <app-bar/>
    <v-content id="content" class="teal" style="overflow:hidden">
      <router-view />
    </v-content>
    <snack-bar/>
  </v-app>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import('@/components/Index/AppBar.vue'),
    SnackBar: () => import('@/components/SnackBar.vue')
  }
}
</script>
