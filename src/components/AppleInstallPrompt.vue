<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-layout row align-center justify-center wrap class="pt-3">
        <v-flex xs12 class="text-xs-center title mb-2">
            Install Requestly
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <img src="@/assets/logo.png" width="50" alt="logo"/>
        </v-flex>
      </v-layout>
      <v-card-text class="text-xs-center">
        Install this application to your home screen
        for quick and easy access when you're on the go!
      </v-card-text>
      <v-card-text class="text-xs-center">
        Tab the
        <img
          src="@/assets/apple-navigation-action.png"
          width="16"
          alt="add to homescreen"
          class="mx-2"
        />
        then 'Add to Home Screen'
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          @click="dialog = false"
          text>
          Dismiss
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppleInstallPrompt',
  computed: {
    dialog: {
      get () {
        return this.$store.state.ui.showAppleInstallPrompt
      },
      set (value) {
        this.$store.commit('SHOW_APPLE_INSTALL_PROMPT', value)
      }
    }
  }
}
</script>
