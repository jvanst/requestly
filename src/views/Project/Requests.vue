<template>
  <v-container
    :class="{ 'px-0' : $vuetify.breakpoint.smAndDown }"
  >
    <v-subheader>
      Requests
    </v-subheader>
    <list-skeleton v-if="loading"/>
    <v-list v-else-if="requests.length">
      <template v-for="request in requests">
        <v-list-item :key="request.id" :to="{ name: 'Request', params: { id: request.id } }">
          <v-list-item-content>
            <v-list-item-title>
              {{ request.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ request.title }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="'divider-'+request.id"/>
      </template>
    </v-list>
    <v-list v-else>
      <v-subheader>
        No requests. Create one with the plus button below.
      </v-subheader>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'Requests',
  data: () => ({
    loading: false
  }),
  components: {
    ListSkeleton: () => import('@/components/Project/ListSkeleton')
  },
  computed: {
    requests () {
      return this.$store.state.requests.data
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      this.$store.dispatch('requests/fetchAll')
      this.loading = false
    }
  }
}
</script>
