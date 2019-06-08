<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">
    <app-bar/>
    <v-content id="content" class="teal" style="overflow:hidden">
      <new-content-banner/>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Dashboard/AppBar.vue'),
    NewContentBanner: () => import(/* webpackPreload: true */ '@/components/NewContentBanner')
  },
  data: () => ({
    loading: false
  }),
  created () {
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
      this.loading = false
    }
  }
}
</script>
