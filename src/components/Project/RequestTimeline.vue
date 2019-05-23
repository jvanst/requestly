<template>
  <div>
    <v-card v-if="loading">Loading</v-card>
    <v-timeline v-else dense clipped>
      <v-slide-x-transition
        group
      >
        <template v-for="(item, index) in $store.state.timeline.data">
          <request-timeline-status
            v-if="item.type === 'status'"
            :key="'timeline-item-'+index"
            :item="item"
          />
          <request-timeline-comment
            v-else-if="item.type === 'comment'"
            :key="'timeline-item-'+index"
            :item="item"
          />
        </template>
        <request-timeline-comment-new :request="request" key="new-comment"/>
      </v-slide-x-transition>
    </v-timeline>
  </div>
</template>

<script>
export default {
  name: 'RequestTimeline',
  props: ['request'],
  components: {
    RequestTimelineComment: () => import('@/components/Project/RequestTimelineComment'),
    RequestTimelineCommentNew: () => import('@/components/Project/RequestTimelineCommentNew'),
    RequestTimelineStatus: () => import('@/components/Project/RequestTimelineStatus')
  },
  data: () => ({
    loading: false
  }),
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      this.$store.dispatch('timeline/fetch')
      this.loading = false
    }
  }
}
</script>
