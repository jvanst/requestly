<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">
    <app-bar/>
    <v-content id="content" class="teal" style="overflow:hidden">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/Index/AppBar.vue'

export default {
  name: 'Project',
  components: {
    AppBar
  }
}
</script>
