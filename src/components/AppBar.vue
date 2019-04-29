<template>
  <v-app-bar
    app
    dense
    tile
    flat
    clipped-left
    class="elevation-1"
  >

  <v-toolbar-title>
        Requestly
      </v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items v-if="!user.isLoggedIn">
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
  name: 'AppBar',
  components: {
    UserMenu: () => import('@/components/AppBarUserMenu.vue')
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>
