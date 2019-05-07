<template>
  <div>
    <div v-if="loading">
    </div>
    <div v-else>
      <div
        v-for="label in request.labels"
        :key="label.id"
        class="mr-1 mb-1"
        style="display:inline-block"
      >
        <Label :label="getLabel(label.id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestLabels',
  props: ['request'],
  components: {
    Label: () => import('@/components/Label')
  },
  data: () => ({
    loading: false
  }),
  methods: {
    getLabel (id) {
      return this.$store.getters['labels/getById'](id)
    }
  }
}
</script>
