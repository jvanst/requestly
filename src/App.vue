<template>
  <v-app id="app" :dark="true">
    <router-view />
    <snack-bar/>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    SnackBar: () => import(/* webpackPreload: true */ '@/components/SnackBar.vue')
  }
}
</script>
