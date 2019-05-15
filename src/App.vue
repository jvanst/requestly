<template>
  <v-app id="app" :dark="$store.state.ui.dark">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>
