<template>
  <v-container>
    <v-card>
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
            <td>{{ user.name }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.active }}</td>
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
