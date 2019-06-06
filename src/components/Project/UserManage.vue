<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="500"
    >
    <v-card>
      <v-toolbar
        flat
      >
        <v-app-bar-nav-icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          Manage User
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn
            text
            @click="update()"
            :loading="loading"
            v-if="$vuetify.breakpoint.smAndDown"
          >
            Update
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text class="pb-0 pt-0">
        <v-select
          label='Role'
          v-model="user.role"
          :items="['admin', 'viewer']"
          outlined
        />
      </v-card-text>

      <v-card-actions>
        <user-delete :user="user" @submit="() => (dialog = false)"/>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!$vuetify.breakpoint.smAndDown"
          color="primary"
          :loading="loading"
          @click="update()"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ManageUser',
  props: {
    user: {
      type: Object,
      default: () => ({
        email: '',
        photoURL: '',
        displayName: '',
        role: ''
      })
    }
  },
  components: {
    UserDelete: () => import('@/components/Project/UserDelete')
  },
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    async update () {
      this.loading = true
      const payload = Object.assign({}, this.user)
      delete payload.id // Remove id from beind submitted
      await this.$store.dispatch('permissions/put', {
        id: this.user.id,
        payload
      })
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
