<template>
  <v-app-bar
    app
    dense
    tile
    v-if="!isRunningStandalone()"
  >

    <v-toolbar-title class="pr-4">
      Requestly
    </v-toolbar-title>

    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn
        text
        to="/"
      >
        Home
      </v-btn>
      <!-- <v-btn
        text
        to="/usecases"
      >
        Use Cases
      </v-btn> -->
    </v-toolbar-items>

    <v-spacer/>

    <v-toolbar-items v-if="!$store.state.auth.isLoggedIn">
      <v-btn
        text
        to="/login"
      >
        Sign In
      </v-btn>
    </v-toolbar-items>

    <v-btn
      v-else
      outlined
      to="/dashboard"
    >
      Dashboard
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  methods: {
    isRunningStandalone () {
      return (window.matchMedia('(display-mode: standalone)').matches)
    }
  }
}
</script>
