<template>
  <v-banner
    v-model="dialog"
    transition="slide-y-transition"
  >
    <div v-if="refreshingApp">
      <v-progress-linear
        indeterminate
        absolute
        bottom
        color="secondary"
      ></v-progress-linear>
      Installing new version...
    </div>
    <div v-else>
      New version available, would you like to update now?
    </div>
    <template #actions>
      <v-btn
        v-if="!refreshingApp"
        text
        @click="dialog = false"
      >Dismiss</v-btn>
      <v-btn
        v-if="!refreshingApp"
        text
        @click="update()"
      >Update</v-btn>
    </template>
  </v-banner>
</template>

<script>
export default {
  name: 'NewContentBanner',
  computed: {
    dialog: {
      get () {
        if (this.$store.state.app.newContentAvailable != null) {
          if (this.$store.state.app.updateDismissed) {
            return false
          }
          return true
        }
        return false
      },
      set (value) {
        this.$store.commit('DISMISS_UPDATE', !value)
      }
    },
    refreshingApp () {
      return this.$store.state.app.refreshingApp
    }
  },
  methods: {
    update () {
      this.$store.dispatch('serviceWorkerSkipWaiting')
    }
  }
}
</script>
