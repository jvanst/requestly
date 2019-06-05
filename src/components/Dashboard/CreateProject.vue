<template>
  <v-dialog
      v-model="dialog"
      width="500px"
    >
      <template v-slot:activator="{ on }">
        <v-card class="mt-2" height="90" v-on="on">
          <v-layout
            column
            align-center
            justify-center
            fill-height
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
          ref="form"
          v-model="valid"
          lazy-validation
          >
          <v-card-text class="pb-0 pt-0">
            <v-text-field
              label="Title"
              v-model="title"
              :rules="nameRules"
              required
              @input="titleChange"
              >
            </v-text-field>
          </v-card-text>

          <v-card-text class="pb-0 pt-0">
            <v-text-field
              label="Project Tag"
              v-model="tag"
              :rules="nameRules"
              :disabled="!title.length"
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
            :disabled="!title"
            @click.native="validate"
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
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 30 || 'Name must be less than 10 characters',
      v => /^[a-zA-Z0-9_-]*$/.test(v) || 'Must be url safe'
    ]
  }),
  created () {
    this.generatorRE()
  },
  methods: {
    generatorRE () {
      this.randomEnding = '-' + Math.floor(Math.random() * 90000)
    },
    titleChange (e) {
      this.tag = e + this.randomEnding
    },
    validate () {
      if (this.$refs.form.validate()) {
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
      this.generatorRE()
    }
  }
}
</script>
