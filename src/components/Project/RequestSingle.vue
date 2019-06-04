<template>
  <v-card style="min-width: 100%;">
    <v-toolbar dense flat>
      <v-toolbar-title class="body-2" v-if="user">
        <b>{{ user.displayName }}</b>
        commented
          {{ request.createdOn.seconds | formatSeconds }}
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <request-single-options
         v-if="
          request.creatorId === $store.state.auth.user.uid ||
          $store.getters['permissions/isUserAdmin']($store.state.auth.user.uid)"
        />
      </v-toolbar-items>
    </v-toolbar>
    <v-divider/>
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
</template>

<script>
export default {
  name: 'RequestSingle',
  props: ['request'],
  components: {
    RequestSingleOptions: () => import('@/components/Project/RequestSingleOptions')
  },
  data: () => ({
    loading: false
  }),
  computed: {
    user () {
      return this.$store.getters['users/getById'](this.request.creatorId)
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      if (!this.user) {
        await this.$store.dispatch('users/fetchById', this.request.creatorId)
      }
      this.loading = false
    }
  }
}
</script>
