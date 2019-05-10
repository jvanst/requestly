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
    async refresh () {
      this.loading = true
      await Promise.all([
        this.$store.dispatch('pipelines/fetch'),
        this.$store.dispatch('requests/fetch')
      ])
      this.loading = false
    }
  }
}
</script>
