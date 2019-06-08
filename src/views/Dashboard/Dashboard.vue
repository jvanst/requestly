<template>
  <v-container
    v-bind="{ [`grid-list-${$vuetify.breakpoint.name}`]: true }"
  >
    <div id="skew-background-1" />
    <v-layout row wrap>
      <v-flex xs12>
        <v-subheader class="white--text">
          Your projects
        </v-subheader>
        <v-layout row wrap>
          <v-flex md3 xs12>
            <CreateProject/>
          </v-flex>
          <template v-for="project in projects">
            <v-flex :key="'flex'+project.id" md3 xs12>
              <v-card
                height="90"
                :to="{ name: 'Board', params: { projectId: project.id } }"
              >
                <v-card-title class="title pb-0">
                  {{ project.title }}
                </v-card-title>
                <v-card-text class="subtitle-1 pt-0">
                  {{ project.id }}
                </v-card-text>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
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
    CreateProject: () => import('@/components/Dashboard/CreateProject')
  },
  computed: {
    projects () {
      return this.$store.state.projects.data
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
