<template>
  <v-sheet
    color="grey lighten-4"
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
      set (value) {

      }
    }
  },
  methods: {
    handleChange ({ added, removed, moved }) {
      if (added) {
        const request = this.$store.getters['requests/getById'](added.element.id)
        this.$store.commit('requests/UPDATE_REQUEST', { ...request, pipelineId: this.pipeline.id })
        this.$store.dispatch('requests/update', {
          id: request.id,
          payload: {
            ...request,
            pipelineId: this.pipeline.id
          }
        })
          .catch((error) => this.showSnackbar(error.message, 'error'))
      }
    },
    create (id) {
      this.$store.dispatch('requests/create', {
        pipelineId: id,
        title: 'test request'
      })
        .catch((error) => this.showSnackbar(error.message, 'error'))
    }
  }
}
</script>

<style>
.pipeline-header {
  cursor: grab;
}
</style>
