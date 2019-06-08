<template>
  <v-app-bar
    app
    dense
    tile
    elevate-on-scroll
  >
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

    <template v-slot:extension v-if="showTabMenu()">
      <v-tabs
        v-model="projectTabs"
        centered
        grow
        dense
      >
        <v-tab
          href="#labels"
          :to="{ name: 'Labels' }"
          active-class=""
        >
          Labels
        </v-tab>
        <v-tab
          href="#forms"
          :to="{ name: 'Forms' }"
          active-class=""
        >
          Forms
        </v-tab>
        <v-tab
          href="#users"
          :to="{ name: 'Users' }"
          active-class=""
        >
          Users
        </v-tab>
        <v-tab
          href="#settings"
          :to="{ name: 'Settings' }"
          active-class=""
        >
          Settings
        </v-tab>
      </v-tabs>
    </template>

    <v-spacer/>
    <app-bar-user-menu-mobile-sheet class="ml-3" :size="28" />
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBarMobile',
  components: {
    AppBarUserMenuMobileSheet: () => import('@/components/AppBarUserMenuMobileSheet')
  },
  data: () => ({
    projectMenu: false,
    projectTabs: 'labels'
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
    showTabMenu () {
      if (this.$route.name === 'Labels' ||
        this.$route.name === 'Forms' ||
        this.$route.name === 'Settings' ||
        this.$route.name === 'Users') {
        return true
      }
      return false
    }
  }
}
</script>
