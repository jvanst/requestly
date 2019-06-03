<template>
  <v-app id="app" :dark="$store.state.ui.dark" data-server-rendered="true">
    <router-view />
    <snack-bar/>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    SnackBar: () => import('@/components/SnackBar.vue')
  }
}
</script>
