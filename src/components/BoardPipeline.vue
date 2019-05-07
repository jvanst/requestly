<template>
  <v-sheet
    :color="$store.state.ui.dark ? 'grey darken-4' : 'grey lighten-4'"
    elevation="1"
    height="100%"
  >
      <v-list dense class="transparent pipeline-header">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="overline">
              {{ requests.length }}
              Requests
            </v-list-item-subtitle>
            <v-list-item-title class="subtitle-1 font-weight-medium">
              {{ pipeline.title }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <board-pipeline-settings :pipeline="pipeline"/>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider/>
      <draggable
        class="layout column ma-2"
        v-model="requests"
        group="requests"
        style="height: 90%;"
        @change="handleChange"
      >
        <v-flex
          v-for="request in requests"
          :key="request.id"
          mb-2
          shrink
        >
          <request-card :request="request"/>
        </v-flex>
      </draggable>
  </v-sheet>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'BoardColumn',
  props: ['pipeline'],
  components: {
    draggable,
    RequestCard: () => import('@/components/RequestCard.vue'),
    BoardPipelineSettings: () => import('@/components/BoardPipelineSettings')
  },
  computed: {
    requests: {
      get () {
        return this.$store.getters['requests/getByPipelineId'](this.pipeline.id)
      },
      set () {}
    }
  },
  methods: {
    /*
    * When handling draging, its important that we inverse the standard vuex
    * paradime for the UX to remain seemless. First we update the vuex store
    * then send the update out to the API
    */
    handleChange ({ added, removed, moved }) {
      if (added) {
        // Request to be updated
        const request = this.$store.getters['requests/getById'](added.element.id)

        // Update store
        this.$store.commit('requests/UPDATE', {
          ...request,
          pipelineId: this.pipeline.id
        })

        // Update API
        this.$store.dispatch('requests/update', {
          id: request.id,
          payload: {
            ...request,
            pipelineId: this.pipeline.id
          }
        })
      }
    }
  }
}
</script>

<style>
.pipeline-header {
  cursor: grab;
}
</style>
