<template>
  <v-layout class="pt-2 pl-2 pr-2">
    <v-flex xs6>
      <board-pipeline-refresh/>
    </v-flex>
    <v-flex xs6 class="text-xs-right">
      <board-pipeline-create/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'BoardToolbar',
  components: {
    BoardPipelineRefresh: () => import('@/components/Project/BoardPipelineRefresh'),
    BoardPipelineCreate: () => import('@/components/Project/BoardPipelineCreate')
  }
}
</script>
