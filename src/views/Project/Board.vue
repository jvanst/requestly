<template>
    <v-layout column fill-height>
      <v-flex v-if="loading" shrink>
        <v-toolbar
          flat
          dense
          class="transparent"
        />
      </v-flex>
      <v-flex v-if="!loading" class="pa-1" style="overflow-x:scroll;overflow-y:hidden">
        <draggable
          class="layout row fill-height justify-start align-start"
          v-model="pipelines"
          group="pipelines"
          handle=".pipeline-header"
          :disabled="!$store.getters['permissions/isUserAdmin']($store.state.auth.user.uid)"
        >
          <v-flex
            v-for="(pipelines, i) in pipelines"
            :key="'flex-pipelines'+i"
            pa-1
            style="max-width:300px;min-width:300px"
            fill-height
          >
            <board-pipeline :pipeline="pipelines"/>
          </v-flex>
        </draggable>
      </v-flex>
      <v-flex v-else>
        <board-pipeline-skeleton/>
      </v-flex>
      <board-pipeline-create v-if="$store.getters['permissions/isUserAdmin']($store.state.auth.user.uid)"/>
    </v-layout>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Board',
  components: {
    draggable,
    BoardPipelineSkeleton: () => import('@/components/Project/BoardPipelineSkeleton'),
    BoardPipeline: () => import('@/components/Project/BoardPipeline'),
    BoardPipelineCreate: () => import('@/components/Project/BoardPipelineCreate')
  },
  created () {
    this.fetch()
  },
  data: () => ({
    loading: false
  }),
  computed: {
    pipelines: {
      get () {
        return this.$store.state.pipelines.data
      },
      set (value) {
        /*
        * When handling draging, its important that we inverse the vuex
        * paradime for the UX to remain seemless. First we update the vuex store
        * then send the update out to the API
        */
        this.$store.commit('pipelines/UPDATE_ORDER', value)
        this.$store.dispatch('pipelines/updateBatch')
      }
    }
  },
  methods: {
    async fetch () {
      // If data has been loaded previously
      if (!this.loaded()) {
        this.loading = true
      }
      await Promise.all([
        this.$store.dispatch('pipelines/fetch'),
        this.$store.dispatch('requests/fetch'),
        this.$store.dispatch('labels/fetch')
      ])
      this.loading = false
    },
    loaded () {
      if (this.$store.state.pipelines.data.length &&
        this.$store.state.requests.data.length &&
        this.$store.state.labels.data.length) {
        return true
      }
      return false
    }
  }
}
</script>
