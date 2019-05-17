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
            <CreateProject/>
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
