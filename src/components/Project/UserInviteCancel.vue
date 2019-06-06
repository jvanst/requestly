<template>
  <v-dialog
      v-model="dialog"
      width="350"
    >
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
  props: {
    invite: {
      Type: Object,
      default: () => ({
        email: ''
      })
    }
  },
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
