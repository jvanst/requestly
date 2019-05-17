<template>
  <v-container grid-list-xl>
    <div id="skew-background-1" />
    <v-layout row wrap>
      <v-flex xs12>
        <v-card flat height="300" class="transparent pa-3">
          <h3 class="display-1 white--text">
            Welcome to Requestly!
          </h3>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-subheader class="white--text">
          Your projects
        </v-subheader>
        <v-layout row wrap>
          <v-flex xs3 class="pt-3">
            <CreateProject @create="addProject"/>
          </v-flex>
          <template v-for="project in projects">
            <v-flex :key="'flex'+project.id" xs3>
              <v-card
                :to="{ name: 'Board', params: { projectId: project.id } }"
                height="200"
              >
                <v-card-title class="title pb-0">
                  {{ project.title }}
                </v-card-title>
                <v-card-title class="subtitle-1 pt-0">
                  {{ project.id }}
                </v-card-title>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProjectAPI from '@/api/Projects'

export default {
  name: 'Dashboard',
  data: () => ({
    loading: false,
    projects: []
  }),
  components: {
    CreateProject: () => import('@/components/Dashboard/CreateProject')
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      this.projects = await ProjectAPI.fetch()
      this.loading = false
    },
    addProject (payload) {
      this.projects.push(payload)
    }
  }
}
</script>

<style>
#skew-background-1 {
  width: 200vw;
  height: 120vh;
  background-color: #ffa726;
  position: absolute;
  left: -50vw;
  top: 70vh;
  transform: skew(-10deg, 10deg);
}
</style>
