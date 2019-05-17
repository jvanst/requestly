<template>
  <v-app-bar
    app
    dense
    tile
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
      <v-btn
        text
        to="/usecases"
      >
        Use Cases
      </v-btn>
    </v-toolbar-items>

    <v-spacer/>

    <v-toolbar-items v-if="!$store.state.user">
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
import { mapState } from 'vuex'

export default {
  name: 'AppBar',
  computed: {
    ...mapState({
      user: state => state
    })
  }
}
</script>
