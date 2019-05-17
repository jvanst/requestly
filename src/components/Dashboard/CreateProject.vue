<template>
  <v-dialog
      v-model="dialog"
      width="500px"
    >
      <template v-slot:activator="{ on }">
        <v-card height="200" class="mt-2" v-on="on">
          <v-layout
            column
            align-center
            justify-center
            fill-height
            >
            <v-icon size="64">mdi-plus</v-icon>
            Add Project
          </v-layout>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="subtitle-1">
          Create a Project
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

        <v-card-text class="pb-0 pt-0">
          <v-text-field
          label="Project Tag"
          v-model="tag"
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
    </v-dialog>
</template>

<script>
export default {
  name: 'CreateProject',
  data: () => ({
    dialog: false,
    title: '',
    tag: '',
    loading: false
  }),
  methods: {
    async create () {
      this.loading = true
      this.$store.dispatch('projects/put', { id: this.tag, payload: { title: this.title } })
      this.title = ''
      this.tag = ''
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
