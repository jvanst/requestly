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
      <v-flex xs9 id="scrolling-techniques-8">
        <v-layout>
          <v-flex>
            <v-avatar
              tile
              class="round-avatar"
              >
              <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex>
            <v-card class="pa-2">
              <template  v-for="(section, index) in Object.keys(request.content)">
                <v-card-title
                  class="title"
                  :key="'content-title'+index">
                  {{ section | capitalizeFirstLetter }}
                </v-card-title>

                <v-card-text :key="'content-section'+index">
                  {{ request.content[section] }}
                </v-card-text>
              </template>
            </v-card>
            <request-timeline :request="request"/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="pl-2">
              <v-subheader class="pl-0">
                Pipeline
              </v-subheader>
              <request-pipeline :request="request"/>
            </div>
          </v-flex>
          <v-flex>
            <v-divider/>
          </v-flex>
          <v-flex xs12>
            <div class="pl-2">
              <v-subheader class="pl-0">
                Labels
              </v-subheader>
              <request-labels :request="request"/>
            </div>
          </v-flex>
          <v-flex>
            <v-divider/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Request',
  props: ['id'],
  components: {
    RequestTimeline: () => import('@/components/RequestTimeline'),
    RequestLabels: () => import('@/components/RequestLabels'),
    RequestPipeline: () => import('@/components/RequestPipeline')
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
    fetch () {
      // Do not re-fetch if already available in vuex
      if (this.request) {
        return
      }
      this.loading = true
      this.$store.dispatch('requests/fetchById', this.id)
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style>
.round-avatar {
  border-radius: 4px;
}
</style>
