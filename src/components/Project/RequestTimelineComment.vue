<template>
  <v-timeline-item
    fill-dot
    class="white--text"
    large
  >
    <request-author slot="icon" :uid="item.creatorId"/>
    <v-card>
      <v-toolbar dense flat>
        <v-toolbar-title class="body-2" v-if="!loading">
          <b>{{ user.displayName }}</b>
          commented {{ item.createdOn.seconds | formatSeconds }}
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <request-timeline-comment-options
            v-if="
              item.creatorId === $store.state.user.uid ||
              $store.getters['permissions/isUserAdmin']($store.state.user.uid)"
            :item="item"
            @edit="setEdit"
          />
        </v-toolbar-items>
      </v-toolbar>
      <v-divider/>
      <request-timeline-comment-edit v-if="editing" :item="item" @edit="setEdit"/>
      <v-card-text v-else>
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
    RequestTimelineCommentOptions: () => import('@/components/Project/RequestTimelineCommentOptions'),
    RequestTimelineCommentEdit: () => import('@/components/Project/RequestTimelineCommentEdit')
  },
  data: () => ({
    loading: false,
    editing: false
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
    },
    setEdit (value) {
      this.editing = value
    }
  }
}
</script>
