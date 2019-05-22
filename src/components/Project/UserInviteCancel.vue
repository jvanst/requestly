<template>
  <v-dialog
      v-model="dialog"
      width="350"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          text
          v-on="on"
        >
          <v-icon>mdi-cancel</v-icon>
        </v-btn>
      </template>
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Cancel Invitation
      </v-card-title>

      <v-card-text>
        Are you sure you want to cancel the invitation to {{ invite.email }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          @click="cancel()"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UserInviteCancel',
  props: ['invite'],
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    async cancel () {
      this.loading = true
      this.$store.dispatch('invites/delete', this.invite.email)
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
