<template>
  <v-content id="content" class="teal" style="overflow:hidden">
    <app-bar/>
    <router-view />
    <!-- <snack-bar/> -->
  </v-content>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Index/AppBar.vue'),
    // SnackBar: () => import(/* webpackPreload: true */ '@/components/SnackBar.vue')
  }
}
</script>
