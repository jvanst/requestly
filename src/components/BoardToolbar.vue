<template>
  <v-toolbar
    flat
    dense
    class="transparent"
    >
      <v-spacer/>
      <board-pipeline-create/>
  </v-toolbar>
</template>

<script>
export default {
  name: 'BoardToolbar',
  components: {
    BoardPipelineCreate: () => import('@/components/BoardPipelineCreate')
  }
}
</script>
