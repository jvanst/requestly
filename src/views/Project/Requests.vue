<template>
  <v-container>
    <v-card>
      <v-list v-if="loading">
        LOADING
      </v-list>
      <v-list v-else>
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Requests',
  data: () => ({
    loading: false
  }),
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
