<template>
  <div>
    <span v-if="loading">
    </span>
    <span v-else>
      {{ pipeline.title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'RequestPipeline',
  props: ['request'],
  data: () => ({
    loading: false
  }),
  created () {
    this.fetch()
  },
  computed: {
    pipeline () {
      return this.$store.getters['pipelines/getById'](this.request.pipelineId)
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      await this.$store.dispatch('pipelines/fetch')
      this.loading = false
    }
  }
}
</script>
