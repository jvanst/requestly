<template>
  <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      transition="dialog-bottom-transition"
      width="500"
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
      <v-toolbar
        flat
      >
        <v-app-bar-nav-icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          Create Label
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn
            text
            @click="create()"
            :loading="loading"
            v-if="$vuetify.breakpoint.smAndDown"
          >
            Create
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-text-field
          label="Title"
          outlined
          v-model="label.title"
          :disabled="loading"
          >
        </v-text-field>

        <v-text-field
          label="Description"
          outlined
          v-model="label.description"
          :disabled="loading"
          >
        </v-text-field>

        <v-text-field
          label="Click to choose color"
          name="color"
          readonly
          :value="label.color"
          :disabled="loading"
          outlined
          hide-details
          @click.stop="dialogColor = true"
          >
        </v-text-field>
      </v-card-text>

      <v-dialog
        v-model="dialogColor"
        width="300px"
      >
        <v-card class="text-xs-center">
          <v-color-picker
            flat
            show-swatches
            hide-inputs
            hide-canvas
            hide-mode-switch
            swatches-max-height
            v-model="label.color"
            @input="dialogColor = false"
          />
        </v-card>
      </v-dialog>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!$vuetify.breakpoint.smAndDown"
          color="primary"
          :loading="loading"
          @click="create()"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LabelCreate',
  data: () => ({
    dialogColor: false,
    dialog: false,
    label: {
      title: '',
      description: '',
      color: '#FFFFFF'
    },
    loading: false
  }),
  methods: {
    async create () {
      this.loading = true
      await this.$store.dispatch('labels/create', this.label)
      this.dialog = false
      this.label = {
        title: '',
        description: '',
        color: '#FFFFFF'
      }
      this.loading = false
    }
  }
}
</script>
