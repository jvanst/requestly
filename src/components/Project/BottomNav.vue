<template>
    <v-bottom-navigation
      app
      v-model="bottomNav"
      grow
    >
      <v-btn
        color="teal"
        text
        value="board"
        :to="{ name: 'Board' }"
      >
        <span>Board</span>
        <v-icon>mdi-view-dashboard-outline</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="requests"
        :to="{ name: 'Requests' }"
      >
        <span>Requests</span>
        <v-icon>mdi-table-of-contents</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="labels"
        :to="{ name: 'Labels' }"
      >
        <span>Labels</span>
        <v-icon>mdi-label-outline</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="forms"
        :to="{ name: 'Forms' }"
      >
        <span>Forms</span>
        <v-icon>mdi-shape</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="users"
        :to="{ name: 'Users' }"
      >
        <span>Users</span>
        <v-icon>mdi-account-supervisor</v-icon>
      </v-btn>

    </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
      bottomNav: 'board'
    }
  }
}
</script>
