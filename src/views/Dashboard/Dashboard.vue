<template>
  <v-container
    grid-list-sm
  >
    <v-subheader class="white--text">
      Your projects
    </v-subheader>
    <v-layout
      v-if="!loading"
      row
      wrap
      >
      <v-flex md3 xs12>
        <create-project/>
      </v-flex>
      <v-flex
        v-for="project in projects"
        :key="'flex'+project.id"
        md3
        xs12
      >
        <project-card :project="project"/>
      </v-flex>
    </v-layout>
    <v-layout
      v-else
      row
      wrap
      >
      <v-flex
        v-for="n in 4"
        :key="'flex'+n"
        md3
        xs12
      >
        <project-card-skeleton/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    loading: false
  }),
  components: {
    CreateProject: () => import('@/components/Dashboard/CreateProject'),
    ProjectCard: () => import('@/components/Dashboard/ProjectCard'),
    ProjectCardSkeleton: () => import('@/components/Dashboard/ProjectCardSkeleton')
  },
  computed: {
    projects () {
      return this.$store.state.projects.data
    }
  },
  created () {
    this.fetch()
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
