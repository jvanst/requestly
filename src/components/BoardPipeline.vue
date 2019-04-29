<template>
  <v-sheet
    color="grey lighten-4"
    class="pa-2"
    elevation="1"
    height="100%"
  >
      <div class="overline pt-1 pl-1">
        {{ pipeline.requests.length }} Requests
      </div>
      <div class="subtitle-1 font-weight-medium pl-1 pb-2">
        {{ pipeline.title }}
      </div>
      <div v-if="loading">
        Loading
      </div>
      <draggable
        v-else
        class="layout column"
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
      </draggable>
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
    RequestCard: () => import('@/components/RequestCard.vue')
  },
  created() {
    this.fetch()
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