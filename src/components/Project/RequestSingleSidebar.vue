<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="pl-2">
        <v-subheader class="pl-0">
          Pipeline
        </v-subheader>
        <request-pipeline :request="request"/>
      </div>
    </v-flex>
    <v-flex>
      <v-divider/>
    </v-flex>
    <v-flex xs12>
      <div class="pl-2">
        <v-subheader class="pl-0">
          Labels
        </v-subheader>
        <request-labels :request="request"/>
      </div>
    </v-flex>
    <v-flex>
      <v-divider/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'RequestSingleBar',
  props: ['request'],
  components: {
    RequestLabels: () => import('@/components/Project/RequestLabels'),
    RequestPipeline: () => import('@/components/Project/RequestPipeline')
  }
}
</script>
