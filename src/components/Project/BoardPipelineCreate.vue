<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="300"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="primary"
          :class="{ 'mb-5' : $vuetify.breakpoint.smAndDown }"
          fab
          fixed
          bottom
          right
          large
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="subtitle-1">
          Create a Pipeline
        </v-card-title>

        <v-divider/>

        <v-card-text>
          <v-text-field
          label="Title"
          v-model="title"
          v-on:keyup.enter="create()"
          hide-details
          outlined
        />
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
    </v-dialog>
</template>

<script>
export default {
  name: 'CreatePipeline',
  data: () => ({
    dialog: false,
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
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
