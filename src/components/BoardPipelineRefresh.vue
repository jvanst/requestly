<template>
  <v-btn
    depressed
    @click="refresh"
    :loading="loading"
  >
    <v-icon>mdi-refresh</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BoardPipelineRefresh',
  data: () => ({
    loading: false
  }),
  methods: {
    refresh () {
      this.loading = true
      Promise.all([
        this.$store.dispatch('pipelines/fetch'),
        this.$store.dispatch('requests/fetch')
      ])
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
