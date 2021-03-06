<template>
  <v-container
    grid-list-lg
    class="scroll-y"
  >
    <v-layout wrap v-if="loading">
      <request-skeleton/>
    </v-layout>
    <v-layout wrap v-else justify-center>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex xs12 class="title pb-0">
            {{ request.title }}
          </v-flex>
          <v-flex xs8 class="body-2">
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
            {{ this.$store.getters['timeline/getComments'].length }} Comments
          </v-flex>
          <v-flex xs4 class="text-xs-right">
            <v-btn
              v-if="$vuetify.breakpoint.smAndDown"
              @click="requestDrawer = !requestDrawer"
              icon>
              <v-icon v-if="requestDrawer">mdi-unfold-less-horizontal</v-icon>
              <v-icon v-else>mdi-unfold-more-horizontal</v-icon>
            </v-btn>
            <v-btn
              v-if="$vuetify.breakpoint.mdAndUp"
              @click="showSideMenu = !showSideMenu"
              icon>
              <v-icon v-if="showSideMenu">mdi-unfold-less-vertical</v-icon>
              <v-icon v-else>mdi-unfold-more-vertical</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="pr-2">
        <v-divider/>
      </v-flex>
      <v-flex xs12 md9>
        <v-layout>
          <v-flex shrink v-if="$vuetify.breakpoint.mdAndUp">
            <request-author :uid="request.creatorId"/>
          </v-flex>
          <v-flex>
            <request-single :request="request"/>
            <request-timeline :request="request"/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md3 v-show="showSideMenu">
        <request-single-sidebar
          v-if="$vuetify.breakpoint.mdAndUp"
          :request="request"
        />
        <v-navigation-drawer
          v-else
          app
          bottom
          v-model="requestDrawer"
        >
          <request-single-sidebar :request="request"/>
        </v-navigation-drawer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Request',
  props: ['id'],
  components: {
    RequestSingle: () => import('@/components/Project/RequestSingle'),
    RequestSingleSidebar: () => import('@/components/Project/RequestSingleSidebar'),
    RequestTimeline: () => import('@/components/Project/RequestTimeline'),
    RequestAuthor: () => import('@/components/Project/RequestAuthor'),
    RequestSkeleton: () => import('@/components/Project/RequestSkeleton')
  },
  created () {
    this.$store.commit('requests/SET_ACTIVE', this.id)
    this.fetch()
  },
  data: () => ({
    loading: false,
    requestDrawer: false,
    showSideMenu: true
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
      await this.$store.dispatch('labels/fetch')
      this.loading = false
    }
  },
  mounted () {
    if (localStorage.showSideMenu) {
      this.showSideMenu = JSON.stringify(localStorage.getItem('showSideMenu'))
    }
  },
  watch: {
    showSideMenu (value) {
      localStorage.setItem('showSideMenu', JSON.stringify(value))
    }
  }
}
</script>
