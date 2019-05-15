<template>
  <v-timeline dense clipped>

    <v-timeline-item
      class="mb-3"
      icon-color="primary"
      small
    >
      <v-layout justify-space-between>
        <v-flex xs7>This request was created</v-flex>
        <v-flex xs5 text-xs-right>15:26 EDT</v-flex>
      </v-layout>
    </v-timeline-item>

    <v-slide-x-transition
      group
    >
      <v-timeline-item
        v-for="event in timeline"
        :key="event.id"
        class="mb-3"
        color="pink"
        small
      >
        <v-layout justify-space-between>
          <v-flex xs7 v-text="event.text"></v-flex>
          <v-flex xs5 text-xs-right v-text="event.time"></v-flex>
        </v-layout>
      </v-timeline-item>
    </v-slide-x-transition>

    <v-timeline-item
      fill-dot
      class="white--text mb-5"
      large
    >
      <template v-slot:icon>
        <v-avatar>
          <v-img v-if="user.photoURL" :src="user.photoURL" />
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
      </template>

      <v-card>
        <v-card-text class="pa-2">
          <v-textarea
            v-model="input"
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
            @click="close()"
          >
            <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
            <template v-if="!input">Close</template>
            <template v-else>Comment &amp; Close</template>
          </v-btn>
          <v-btn
            @click="comment"
            :disabled="request.closed"
            color="primary"
          >
            Comment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RequestTimeline',
  props: ['request'],
  data: () => ({
    events: [],
    input: null,
    nonce: 0
  }),
  computed: {
    timeline () {
      return this.events.slice()
    },
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    comment () {
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })

      this.input = null
    },
    async close () {
      await this.$store.dispatch('requests/update', {
        id: this.request.id,
        payload: {
          ...this.request,
          closed: true
        }
      })
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: 'Closed this issue',
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })
    },
    async open () {
      await this.$store.dispatch('requests/update', {
        id: this.request.id,
        payload: {
          ...this.request,
          closed: false
        }
      })
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: 'Reopened this issue',
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })
    }
  }
}
</script>
