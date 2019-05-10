<template>
  <v-container grid-list-lg class="scroll-y">
    <v-layout xs12 v-if="loading">
      LOADING
    </v-layout>
    <v-layout wrap v-else>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex xs12 class="headline pb-0">
            {{ request.title }}
          </v-flex>
          <v-flex xs12 class="body-2">
            <v-chip
              v-if="!request.closed"
              class="mr-3"
              color="success"
              label
            >
              <v-icon left small>mdi-information-outline</v-icon>
              <b>Open</b>
            </v-chip>
            <v-chip
              v-else
              class="mr-3"
              color="error"
              label
            >
              <v-icon left small>mdi-checkbox-marked-circle-outline</v-icon>
              <b>Closed</b>
            </v-chip>
            Name opened this request on date · 0 Comments
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="pr-2">
        <v-divider/>
      </v-flex>
      <v-flex xs9>
        <v-layout>
          <v-flex shrink>
            <v-avatar
              tile
              class="round-avatar"
              >
              <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex grow>
            <request-single :request="request"/>
            <request-timeline :request="request"/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <request-single-sidebar :request="request"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Request',
  props: ['id'],
  components: {
    RequestSingle: () => import('@/components/RequestSingle'),
    RequestSingleSidebar: () => import('@/components/RequestSingleSidebar'),
    RequestTimeline: () => import('@/components/RequestTimeline')
  },
  created () {
    this.fetch()
  },
  data: () => ({
    loading: false
  }),
  computed: {
    request () {
      return this.$store.getters['requests/getById'](this.id)
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      await this.$store.dispatch('requests/fetchById', this.id)
      await this.$store.dispatch('user/fetchById', this.request.createdBy)
      this.loading = false
    }
  }
}
</script>

<style>
.round-avatar {
  border-radius: 4px;
}
</style>
