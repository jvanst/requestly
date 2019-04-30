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
              <!-- {{ pipeline.requests.length }} -->
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
      <!-- <div v-if="loading">
        Loading
      </div>
      <draggable
        v-else
        class="layout column ma-2"
        v-model="pipeline.requests"
        group="requests"
        style="height: 90%;"
        @change="handleChange"
      >
        <v-flex
          v-for="request in pipeline.requests"
          :key="request.id"
          mb-2
          shrink
        >
          <request-card :request="request"/>
        </v-flex>
      </draggable> -->
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'BoardColumn',
  props: ['pipeline'],
  components: {
    draggable,
    RequestCard: () => import('@/components/RequestCard.vue'),
    BoardPipelineSettings: () => import('@/components/BoardPipelineSettings')
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    fetch() {
      this.loading = true;
      this.$store.dispatch('requests/fetch', this.pipeline.id)
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    },
    handleChange({added, removed, moved}) {
    },
  }
}
</script>