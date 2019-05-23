<template>
  <v-timeline-item
    fill-dot
    class="white--text"
    large
  >
    <request-author slot="icon" :uid="item.creatorId"/>
    <v-card>
      <v-toolbar dense flat>
        <v-toolbar-title class="body-2">
          <b>{{ user.displayName }}</b>
          commented {{ item.createdOn.seconds | formatSeconds }}
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <request-timeline-comment-options :item="item"/>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider/>
      <v-card-text>
        {{ item.value }}
      </v-card-text>
    </v-card>
  </v-timeline-item>
</template>

<script>
export default {
  name: 'RequestTimelineComment',
  props: ['item'],
  components: {
    RequestAuthor: () => import('@/components/Project/RequestAuthor'),
    RequestTimelineCommentOptions: () => import('@/components/Project/RequestTimelineCommentOptions')
  },
  data: () => ({
    loading: false
  }),
  computed: {
    user () {
      return this.$store.getters['users/getById'](this.item.creatorId)
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      if (!this.user) {
        await this.$store.dispatch('users/fetchById', this.item.creatorId)
      }
      this.loading = false
    }
  }
}
</script>
