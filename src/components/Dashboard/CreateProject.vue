<template>
  <v-dialog
      v-model="dialog"
      width="500px"
      class="mt-1"
    >
      <template v-slot:activator="{ on }">
        <v-card
          height="90"
          v-on="on"
        >
          <v-layout
            column
            align-center
            justify-center
            fill-height
            class="pa-0 ma-0"
            >
            <v-icon size="32">mdi-plus</v-icon>
            Add Project
          </v-layout>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="subtitle-1">
          Create a Project
        </v-card-title>

        <v-form
          ref="createProjectForm"
          v-model="valid"
          lazy-validation
          >
          <v-card-text class="pb-0 pt-0">
            <v-text-field
              label="Project Title"
              name='Project Title'
              v-model="title"
              @input="titleChange"
              :rules="titleRules"
              outlined
              required
            />
          </v-card-text>

          <v-card-text class="pb-0 pt-0">
            <v-text-field
              label="Project Tag"
              name="Project Tag"
              v-model="tag"
              :rules="tagRules"
              :disabled="!title.length"
              outlined
              required
            >
              <template v-slot:append>
                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  Project IDs are globally unique identifiers. <br>
                  You cannot change the project ID after you create it.
                </v-tooltip>
              </template>
            </v-text-field>
          </v-card-text>
        </v-form>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            @click.native="validate()"
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
    randomEnding: '',
    loading: false,
    valid: false,
    titleRules: [
      v => !!v || 'Project Title is required',
      v => v.length <= 30 || 'Project Title must be less than 10 characters'
    ],
    duplicateTag: false
  }),
  computed: {
    tagRules () {
      return [
        v => !!v || 'Project tag is required',
        v => v.length <= 30 || 'Project tag must be less than 10 characters',
        v => /^[a-zA-Z0-9_-]*$/.test(v) || 'Must be url safe',
        () => (this.duplicateTag === false) || 'This tag is already in use'
      ]
    }
  },
  methods: {
    titleChange (e) {
      this.tag = e.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_-]/g, '')
    },
    validate () {
      if (this.$refs.createProjectForm.validate()) {
        this.create()
      }
    },
    async create () {
      this.loading = true
      this.$store.dispatch('projects/put', { id: this.tag, payload: { title: this.title } })
      this.title = ''
      this.tag = ''
      this.dialog = false
      this.loading = false
      this.valid = false
    }
  }
}
</script>
