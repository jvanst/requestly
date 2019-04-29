<template>
  <v-navigation-drawer
    permanent
    app
    clipped
    >
    <v-btn
      color="primary"
      large
      to="/request/create"
      class="ma-3"
    >
      <v-icon left>mdi-plus</v-icon>
      New Request
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>