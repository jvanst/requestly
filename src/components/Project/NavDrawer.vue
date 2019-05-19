<template>
  <v-navigation-drawer
    permanent
    app
    clipped
    >
    <v-btn
      color="primary"
      :to="{ name: 'Create Request' }"
      class="ma-3"
    >
      <v-icon left>mdi-plus</v-icon>
      New Request
    </v-btn>
    <v-list
        dense
        nav
        shaped
      >
      <v-list-item link :to="{ name: 'Board' }" exact>
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Board</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list
        dense
        nav
        shaped
      >
      <v-subheader>
        Manage
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
      </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer'
}
</script>
