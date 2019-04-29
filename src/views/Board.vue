<template>
    <v-container fill-height fluid class="pa-0">
      <v-layout column>
        <v-flex shrink>
          <BoardToolbar/>
        </v-flex>
        <v-flex grow class="pa-1">
          <v-layout
            row
            fill-height
            justify-start
            align-start
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
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Board',
  components: {
    BoardToolbar: () => import('@/components/BoardToolbar'),
    BoardPipeline: () => import('@/components/BoardPipeline')
  },
  created() {
    this.fetch()
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState({
      pipelines: state => state.pipelines.data
    })
  },
  methods: {
    fetch() {
      this.loading = true;
      this.$store.dispatch('pipelines/fetch')
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    },
  }
}
</script>
