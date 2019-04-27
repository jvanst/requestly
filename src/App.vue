<template>
  <v-app id="app">
    <appbar/>
    <v-content id="content" class="white">
      <router-view />
      <snackbar/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  components: {
    appbar: () => import(/* webpackPreload: true */ '@/components/core/appbar.vue'),
    snackbar: () => import(/* webpackPreload: true */ '@/components/helpers/snackbar.vue')
  }
}
</script>
