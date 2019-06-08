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

    <user-menu v-if="$vuetify.breakpoint.mdAndUp" class="ml-3"/>
    <app-bar-user-menu-mobile-sheet v-else/>

  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppBar',
  components: {
    UserMenu: () => import('@/components/AppBarUserMenu.vue'),
    AppBarUserMenuMobileSheet: () => import('@/components/AppBarUserMenuMobileSheet')
  },
  computed: {
    ...mapState({
      user: state => state
    })
  }
}
</script>
