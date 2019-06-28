<template>
  <v-app :dark="$store.state.app.dark" data-server-rendered="true">

    <app-bar v-if="$vuetify.breakpoint.mdAndUp"/>
    <app-bar-mobile v-else/>

    <nav-drawer v-if="$vuetify.breakpoint.mdAndUp"/>

    <v-content id="content">
      <new-content-banner/>
      <router-view />
    </v-content>

    <snack-bar/>
    <apple-install-prompt/>

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
    BottomNav: () => import(/* webpackPreload: true */ '@/components/Project/BottomNav.vue'),
    NewContentBanner: () => import(/* webpackPreload: true */ '@/components/NewContentBanner'),
    SnackBar: () => import(/* webpackPrefetch: true */ '@/components/SnackBar.vue'),
    AppleInstallPrompt: () => import(/* webpackPrefetch: true */ '@/components/AppleInstallPrompt')
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
      await Promise.all([
        this.$store.dispatch('projects/fetch'),
        this.$store.dispatch('permissions/fetchById', this.$store.state.auth.user.uid)
      ])
      this.loading = false
    }
  }
}
</script>
