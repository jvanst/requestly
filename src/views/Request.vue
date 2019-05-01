<template>
  <v-container>
    <v-card>
    <v-toolbar
      flat
    >
      <v-btn
        to="/"
        text
      >
        <v-icon left>mdi-keyboard-backspace</v-icon> Back
      </v-btn>
    </v-toolbar>
    <v-card-text>
      Request {{ id }}
    </v-card-text>
    <v-card-text>
      {{ request }}
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Request',
  props: ['id'],
  mounted () {
    this.fetch()
  },
  data: () => ({
    loading: false
  }),
  computed: {
    request () {
      return this.$store.getters['requests/getById'](this.id)
    }
  },
  methods: {
    fetch () {
      // Do not re-fetch if already available in vuex
      if (this.request) {
        return
      }
      this.loading = true
      this.$store.dispatch('requests/fetchById', this.id)
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
