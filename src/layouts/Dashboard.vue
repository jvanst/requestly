<template>
  <v-content id="content" class="teal" style="overflow:hidden">
    <app-bar/>
    <router-view />
  </v-content>
</template>

<script>
export default {
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Dashboard/AppBar.vue')
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
