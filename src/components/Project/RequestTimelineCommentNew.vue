<template>
  <v-timeline-item
    fill-dot
    class="white--text mb-5"
    large
  >
    <request-author slot="icon"/>
    <v-card>
      <v-card-text class="pa-2">
        <v-textarea
          v-model="comment"
          hide-details
          label="Leave a comment..."
          filled
          @keydown.enter="comment"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          v-if="request.closed"
          color="primary"
          @click="open()"
        >
          Reopen
        </v-btn>
        <v-btn
          v-else
          class="pl-3"
          @click="postAndClose()"
        >
          <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
          <template v-if="!comment">Close</template>
          <template v-else>Comment &amp; Close</template>
        </v-btn>
        <v-btn
          @click="post()"
          :disabled="request.closed"
          color="primary"
        >
          Comment
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-timeline-item>
</template>

<script>
export default {
  name: 'RequestTimelineCommentNew',
  props: ['request'],
  components: {
    RequestAuthor: () => import('@/components/Project/RequestAuthor')
  },
  data: () => ({
    comment: ''
  }),
  methods: {
    async postAndClose () {
      await this.post()
      await this.close()
    },
    async post () {
      await this.$store.dispatch('timeline/create', {
        type: 'comment',
        value: this.comment,
        creatorId: this.$store.state.user.uid,
        createdOn: {
          seconds: Math.trunc((new Date()).getTime() / 1000)
        }
      })
      this.comment = ''
    },
    async close () {
      await this.$store.dispatch('requests/put', {
        id: this.request.id,
        payload: {
          ...this.request,
          closed: true
        }
      })
    },
    async open () {
      await this.$store.dispatch('requests/put', {
        id: this.request.id,
        payload: {
          ...this.request,
          closed: false
        }
      })
    }
  }
}
</script>
