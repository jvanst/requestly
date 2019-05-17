<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >

      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          v-on="on"
          >
            <v-icon>mdi-shape-square-plus</v-icon>
          </v-btn>
      </template>

      <v-card>
        <v-card-title class="subtitle-1">
          Create a Pipeline
        </v-card-title>

        <v-divider/>

        <v-card-text class="pb-0 pt-0">
          <v-text-field
          label="Title"
          v-model="title"
          v-on:keyup.enter="create()"
          >
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            :disabled="!title"
            @click.native="create()"
            :loading="loading"
          >
            Create
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-menu>
</template>

<script>
export default {
  name: 'CreatePipeline',
  data: () => ({
    menu: false,
    title: '',
    loading: false
  }),
  methods: {
    async create () {
      this.loading = true
      await this.$store.dispatch('pipelines/create', {
        title: this.title,
        order: this.$store.state.pipelines.data.length
      })
      this.title = ''
      this.menu = false
      this.loading = false
    }
  }
}
</script>
