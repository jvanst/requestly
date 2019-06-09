<template>
    <v-bottom-navigation
      app
      v-model="bottomNav"
      grow
      style="position:fixed"
    >
      <v-btn
        color="teal"
        text
        value="new"
        :to="{ name: 'Create Request' }"
        exact
        style="height:56px"
      >
        <span>New</span>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="requests"
        :to="{ name: 'Requests' }"
        style="height:56px"
      >
        <span>Requests</span>
        <v-icon>mdi-table-of-contents</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="board"
        :to="{ name: 'Board' }"
        exact
        style="height:56px"
      >
        <span>Board</span>
        <v-icon>mdi-view-dashboard-outline</v-icon>
      </v-btn>

      <v-btn
        v-if="$store.getters['permissions/isUserAdmin']($store.state.auth.user.uid)"
        color="teal"
        text
        value="project"
        :to="{ name: 'Labels' }"
        style="height:56px"
      >
        <span>Project</span>
        <v-icon>mdi-folder-outline</v-icon>
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
