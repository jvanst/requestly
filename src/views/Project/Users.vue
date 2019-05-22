<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon left>mdi-information-outline</v-icon> Users
      </v-card-title>
      <v-card-text>
        Here you can manage users, permissions and invitations.
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
            <td>{{ user.uid }}</td>
            <td>{{ user.role | capitalizeFirstLetter }}</td>
            <td>{{ user.active ? 'Active' : 'Inactive'}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <!-- <v-card class="mt-3" v-if="invites.length">
      <v-card-title class="title">
        Manage invited users
      </v-card-title>
      <v-card-text>
        Users you have invited to Requestly and have not yet accepted.
      </v-card-text>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-xs-left">Email</th>
            <th class="text-xs-left">Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in invites" :key="'user'+index">
            <td>{{ user.id }}</td>
            <td>{{ user.role | capitalizeFirstLetter }}</td>
            <td class="text-xs-right"><user-invite-cancel :invite="user"/></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card> -->
    <user-invite/>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  components: {
    UserInvite: () => import('@/components/Project/UserInvite')
    // UserInviteCancel: () => import('@/components/Project/UserInviteCancel')
  },
  created () {
    this.fetchInvites()
    this.fetchPermissions()
  },
  computed: {
    activeProject () {
      return this.$store.state.projects.activeId
    },
    users () {
      return this.$store.state.permissions.data
    },
    invites () {
      return this.$store.state.invites.data
    }
  },
  methods: {
    async fetchInvites () {
      this.$store.dispatch('invites/fetch', this.$store.state.projects.activeId)
    },
    async fetchPermissions () {
      this.$store.dispatch('permissions/fetch', this.$store.state.projects.activeId)
    }
  }
}
</script>
