<template>
  <v-app-bar
    app
    dense
    tile
  >

    <v-toolbar-title class="pr-4">
      Requestly
    </v-toolbar-title>

    <v-spacer/>

    <user-menu v-if="$store.state.isLoggedIn" class="ml-3"/>

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
      user: state => state
    })
  }
}
</script>
