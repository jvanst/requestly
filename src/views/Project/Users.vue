<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon left>mdi-information-outline</v-icon> Users
      </v-card-title>
      <v-card-text>
        Here you can manage users, and thier permissions.
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-xs-left">Name</th>
            <th class="text-xs-left">Role</th>
            <th class="text-xs-left">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="'user'+index">
            <td>{{ index }}</td>
            <td>{{ user.role | capitalizeFirstLetter }}</td>
            <td>{{ user.active ? 'Active' : 'Inactive'}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  computed: {
    activeProject () {
      return this.$store.state.projects.activeId
    },
    users () {
      return this.$store.getters['projects/getById'](this.activeProject).permissions
    }
  }
}
</script>
