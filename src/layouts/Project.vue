<template>
  <v-app :dark="$store.state.ui.dark" data-server-rendered="true">

    <app-bar v-if="$vuetify.breakpoint.mdAndUp"/>
    <app-bar-mobile v-else/>

    <nav-drawer v-if="$vuetify.breakpoint.mdAndUp"/>

    <v-content id="content">
      <router-view />
    </v-content>

    <bottom-nav v-if="$vuetify.breakpoint.smAndDown"/>
  </v-app>
</template>

<script>
export default {
  props: ['productId'],
  name: 'Project',
  components: {
    AppBar: () => import(/* webpackPreload: true */ '@/components/Project/AppBar.vue'),
    AppBarMobile: () => import(/* webpackPreload: true */ '@/components/Project/AppBarMobile.vue'),
    NavDrawer: () => import(/* webpackPreload: true */ '@/components/Project/NavDrawer.vue'),
    BottomNav: () => import(/* webpackPreload: true */ '@/components/Project/BottomNav.vue')
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
