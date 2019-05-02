<template>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex xs9>
        <v-card>
          <v-card-title>
            {{ request.title }}
          </v-card-title>

          <template  v-for="(section, index) in Object.keys(request.content)">

            <v-card-title :key="'content-title'+index">
              {{ section }}
            </v-card-title>

            <v-card-text :key="'content-section'+index">
              {{ request.content[section] }}
            </v-card-text>

          </template>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-layout row warp>
          <v-flex xs12>
            <div class="pa-3">
              <v-subheader class="pl-0">
                Pipeline
              </v-subheader>
              {{ request.pipelineId }}
            </div>
            <v-divider/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Request',
  props: ['id'],
  created () {
    this.fetch()
  },
  data: () => ({
    loading: false
  }),
  computed: {
    request () {
      return this.$store.getters['requests/getById'](this.id)
    }
  },
  methods: {
    fetch () {
      // Do not re-fetch if already available in vuex
      if (this.request) {
        return
      }
      this.loading = true
      this.$store.dispatch('requests/fetchById', this.id)
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
