<template>
  <v-layout class="pt-2 pl-2 pr-2">
    <v-flex xs6>
      <board-pipeline-refresh/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'BoardToolbar',
  components: {
    BoardPipelineRefresh: () => import('@/components/Project/BoardPipelineRefresh')
  }
}
</script>
