<template>
  <v-navigation-drawer
    app
    v-model="$store.state.ui.mobileMenu"
    >
    <v-list
        dense
        nav
        shaped
      >
      <v-subheader>
        Manage Project
      </v-subheader>
        <v-list-item link :to="{ name: 'Labels' }">
          <v-list-item-icon>
            <v-icon>mdi-label-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Labels</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'Forms' }">
          <v-list-item-icon>
            <v-icon>mdi-shape</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Forms</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'Users' }">
          <v-list-item-icon>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'Settings' }">
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer'
}
</script>
