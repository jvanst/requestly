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
    </v-list>

    <template v-slot:append>
      <v-list
        dense
        nav
        shaped
      >
        <v-list-item link to="/forms/">
          <v-list-item-icon>
            <v-icon>mdi-shape</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Form Builder</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer'
}
</script>
