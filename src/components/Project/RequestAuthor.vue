<template>
  <div>
    <div v-if="loading">
      <request-author-skeleton/>
    </div>
    <div v-else>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-avatar
            v-on="on"
            :size="size"
            >
            <img :src="user.photoURL" alt="avatar">
          </v-avatar>
        </template>
        <span>{{ user.displayName }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestAuthor',
  props: {
    uid: {
      type: String
    },
    size: {
      type: Number,
      default: 48
    }
  },
  components: {
    RequestAuthorSkeleton: () => import('@/components/Project/RequestAuthorSkeleton')
  },
  data: () => ({
    loading: false
  }),
  computed: {
    user () {
      return this.$store.getters['users/getById'](this.uid || this.$store.state.auth.user.uid)
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      if (!this.user) {
        await this.$store.dispatch('users/fetchById', this.uid || this.$store.state.auth.user.uid)
      }
      this.loading = false
    }
  }
}
</script>

<style>
.round-avatar {
  border-radius: 4px !important;
}
</style>
