<template>
  <v-app-bar
    app
    dense
    tile
    flat
    clipped-left
    class="elevation-1"
  >

    <v-toolbar-title>
      Requestly
    </v-toolbar-title>

    <v-toolbar-items class="ml-4">

        <v-menu
          v-model="projectMenu"
          v-if="$store.state.projects.data.length"
        >
          <template v-slot:activator="{ on }">
            <v-btn small text v-on="on">
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

    <v-toolbar-items v-if="!$store.state.user">
      <v-btn
        text
        to="/login"
      >
        Login
      </v-btn>
    </v-toolbar-items>

    <user-menu v-if="$store.state.user" class="ml-3"/>

  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
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
  }
}
</script>
