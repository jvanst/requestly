<template>
  <v-app-bar
    app
    elevate-on-scroll
  >
    <v-toolbar-title class="mr-4">
      Requestly
    </v-toolbar-title>

    <v-toolbar-items v-if="user.isLoggedIn">
      <v-btn
        text
        to="/"
      >
        Board
      </v-btn>
    </v-toolbar-items>

    <v-spacer/>

    <v-toolbar-items v-if="user.isLoggedIn">
      <v-btn
        text
        to="/request/create"
      >
        <v-icon left>mdi-plus</v-icon>
        New Request
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-else>
      <v-btn
        text
        to="/login"
      >
        Login
      </v-btn>
    </v-toolbar-items>

    <user-menu v-if="user.isLoggedIn" class="ml-3"/>

  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'appbar',
  components: {
    UserMenu: () => import('@/components/helpers/usermenu.vue')
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>
