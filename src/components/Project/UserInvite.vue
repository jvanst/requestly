<template>
  <v-dialog
      v-model="dialog"
      width="350"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="primary"
          :class="{ 'mb-5' : $vuetify.breakpoint.smAndDown }"
          fab
          fixed
          bottom
          right
          large
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Invite user
      </v-card-title>

      <v-card-text class="pb-0 pt-0">
        <v-text-field
          label="Email"
          v-model="email"
          outlined
        >
        </v-text-field>

        <v-select
          label='Role'
          v-model="role"
          :items="['admin', 'viewer']"
          outlined
        />

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          @click="invite()"
        >
          Invite
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UserInvite',
  data: () => ({
    dialog: false,
    email: '',
    role: null,
    loading: false
  }),
  methods: {
    async invite () {
      this.loading = true
      this.$store.dispatch('invites/put', {
        id: this.email,
        payload: {
          email: this.email,
          projectId: this.$store.state.projects.activeId,
          role: this.role
        }
      })
      this.dialog = false
      this.email = null
      this.role = null
      this.loading = false
    }
  }
}
</script>
