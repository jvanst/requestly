<template>
  <v-content id="content">
    <app-bar/>
    <nav-drawer/>
    <router-view />
  </v-content>
</template>

<script>
export default {
  props: ['productId'],
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Project/AppBar.vue'),
    NavDrawer: () => import(/* webpackPreload: true */ '@/components/Project/NavDrawer.vue')
  },
  created () {
    this.$store.commit('projects/SET_ACTIVE', this.$route.params.projectId)
    this.fetch()
  },
  computed: {
    projects () {
      return this.$store.state.projects.data
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      await this.$store.dispatch('projects/fetch')
      await this.$store.dispatch('permissions/fetch')
      this.loading = false
    }
  }
}
</script>
