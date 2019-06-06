<template>
  <v-app-bar
    app
    dense
    tile
    flat
  >
    <v-app-bar-nav-icon
      v-if="$store.getters['permissions/isUserAdmin']($store.state.auth.user.uid)"
      @click.native="toggleMobileMenu()"
    >
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-items>
      <v-menu
        v-model="projectMenu"
        v-if="$store.state.projects.data.length"
      >
        <template v-slot:activator="{ on }">
          <v-btn small text v-on="on" class="pl-0">
            {{ $store.getters['projects/getById'](projectId).title }}
            <v-icon right class="">mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list dense>
            <v-list-item :to="{ name: 'Dashboard' }">
              View all projects
            </v-list-item>
            <v-divider/>
            <v-subheader>
              Your Projects
            </v-subheader>
            <template v-for="project in $store.state.projects.data">
              <v-list-item
                :key="'tile'+project.id"
                :to="{ name: 'Board', params: { projectId: project.id }}"
                @click="$router.go({ name: 'Board', params: { projectId: project.id }})"
              >
                {{ project.title }}
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
    <v-spacer/>
    <user-menu class="ml-3"/>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBarMobile',
  components: {
    UserMenu: () => import('@/components/AppBarUserMenu.vue')
  },
  data: () => ({
    projectMenu: false
  }),
  computed: {
    projectId: {
      get () {
        return this.$store.state.projects.activeId
      },
      set (id) {
        this.$store.commit('projects/SET_ACTIVE', id)
      }
    }
  },
  methods: {
    toggleMobileMenu () {
      this.$store.commit('TOGGLE_MOBILE_MENU')
    }
  }
}
</script>
