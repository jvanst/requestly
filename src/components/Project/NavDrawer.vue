<template>
  <v-navigation-drawer
    permanent
    app
    clipped
    >
    <v-btn
      color="primary"
      :to="{ name: 'Create Request' }"
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
      <v-list-item link :to="{ name: 'Board' }" exact>
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Board</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'Requests' }" exact>
        <v-list-item-icon>
          <v-icon>mdi-table-of-contents</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Requests</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list
        dense
        nav
        shaped
        v-if="$store.getters['permissions/isUserAdmin']($store.state.auth.user.uid)"
      >
      <v-subheader>
        Manage
      </v-subheader>
        <v-list-item link :to="{ name: 'Labels' }">
          <v-list-item-icon>
            <v-icon>mdi-label-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Labels</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'Forms' }">
          <v-list-item-icon>
            <v-icon>mdi-shape</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Forms</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'Users' }">
          <v-list-item-icon>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'Settings' }">
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    <v-card
      class="primary mt-3"
      tile
      dark
      v-show="canInstall"
      >
      <v-card-title class="subtitle-1">
        Get the Desktop App
      </v-card-title>
      <v-card-text class="body-2">
        Install our PWA for a seamless experience!
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click="dismiss()">
          Not Now
        </v-btn>
        <v-btn @click="install()">
          Install
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',
  computed: {
    canInstall () {
      const standalone = window.matchMedia('(display-mode: standalone)').matches
      if (!standalone && // not standalone
        (window.deferredPrompt != null) && // can install
        !this.$store.state.app.installPromptDismissed) { // not dismissed
        return true
      }
      return false
    }
  },
  methods: {
    install () {
      window.deferredPrompt.prompt()
      window.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            this.dismiss()
          }
          window.deferredPrompt = null
        })
    },
    dismiss () {
      this.$store.commit('DISMISS_INSTALL_PROMPT', true)
    }
  }
}
</script>
