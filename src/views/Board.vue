<template>
    <v-container fill-height fluid class="pa-0">
      <v-layout column>
        <v-flex shrink>
          <BoardToolbar/>
        </v-flex>
        <v-flex v-if="loading">
          loading
        </v-flex>
        <v-flex grow class="pa-1" v-else>
          <draggable
            class="layout row fill-height justify-start align-start"
            v-model="pipelines"
            group="pipelines"
            handle=".pipeline-header"
          >
            <v-flex
              v-for="(pipelines, i) in pipelines"
              :key="'flex-pipelines'+i"
              pa-1
              style="max-width:300px"
              fill-height
            >
              <board-pipeline :pipeline="pipelines"/>
            </v-flex>
          </draggable>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Board',
  components: {
    draggable,
    BoardToolbar: () => import('@/components/BoardToolbar'),
    BoardPipeline: () => import('@/components/BoardPipeline')
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
        this.$store.commit('pipelines/UPDATE_ORDER', value)
        this.$store.dispatch('pipelines/updateBatch')
          .catch((error) => this.showSnackbar(error.message, 'error'))
      }
    }
  },
  methods: {
    fetch () {
      this.loading = true
      Promise.all([
        this.$store.dispatch('pipelines/fetch'),
        this.$store.dispatch('requests/fetch')
      ])
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
