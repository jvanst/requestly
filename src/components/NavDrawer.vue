<template>
  <v-navigation-drawer
    permanent
    app
    clipped
    >
    <v-btn
      color="primary"
      to="/request/create"
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
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Board</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div v-if="$store.state.user.user.role === 'admin'">
        <v-subheader>
          Manage
        </v-subheader>
          <v-list-item link to="/labels/">
            <v-list-item-icon>
              <v-icon>mdi-label-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Labels</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/forms/">
            <v-list-item-icon>
              <v-icon>mdi-shape</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Forms</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/users/">
            <v-list-item-icon>
              <v-icon>mdi-account-supervisor</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer'
}
</script>
