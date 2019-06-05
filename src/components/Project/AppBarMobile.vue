<template>
  <v-app-bar
    app
    dense
    tile
    flat
  >
    <v-layout row>
      <v-flex xs4>
      </v-flex>
      <v-flex xs4 class="text-xs-center">
        <v-toolbar-title>
          {{ $route.name }}
        </v-toolbar-title>
      </v-flex>
      <v-flex xs4 class="text-xs-right">
        <user-menu class="ml-3"/>
      </v-flex>
    </v-layout>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBarMobile',
  components: {
    UserMenu: () => import('@/components/AppBarUserMenu.vue')
  }
}
</script>
