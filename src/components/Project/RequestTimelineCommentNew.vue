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
        <template v-if="
          $store.getters['permissions/isUserAdmin']($store.state.auth.user.uid)
        ">
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
        </template>
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
      if (this.comment.length) {
        await this.post()
      }
      await this.close()
    },
    async post () {
      await this.$store.dispatch('timeline/create', {
        type: 'comment',
        value: this.comment,
        creatorId: this.$store.state.auth.user.uid,
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
      await this.$store.dispatch('timeline/create', {
        createdOn: {
          seconds: Math.trunc((new Date()).getTime() / 1000)
        },
        creatorId: this.$store.state.auth.user.uid,
        icon: 'mdi-cancel',
        type: 'status',
        value: 'closed this request'
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
      await this.$store.dispatch('timeline/create', {
        createdOn: {
          seconds: Math.trunc((new Date()).getTime() / 1000)
        },
        creatorId: this.$store.state.auth.user.uid,
        icon: 'mdi-lock-open-outline',
        type: 'status',
        value: 'reopened this request'
      })
    }
  }
}
</script>
