<template>
  <div>
    <div
      v-for="label in request.labels"
      :key="label"
      class="mr-1 mb-1"
      style="display:inline-block"
    >
      <Label :label="getLabel(label)" />
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
  methods: {
    getLabel (id) {
      return this.$store.getters['labels/getById'](id)
    }
  }
}
</script>
