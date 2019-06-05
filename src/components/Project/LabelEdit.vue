<template>
  <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      transition="dialog-bottom-transition"
      width="500"
    >
    <v-card>
      <v-toolbar
        flat
      >
        <v-app-bar-nav-icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          Edit Label
        </v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn
            text
            @click="update()"
            :loading="loading"
            v-if="$vuetify.breakpoint.smAndDown"
          >
            Update
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text class="pb-0 pt-0">
        <v-text-field
        label="Title"
        v-model="label.title"
        :disabled="loading"
        outlined
        >
        </v-text-field>

        <v-text-field
          label="Description"
          v-model="label.description"
          :disabled="loading"
          outlined
          >
        </v-text-field>

        <v-text-field
          label="Color"
          name="color"
          readonly
          outlined
          hide-details
          :value="label.color"
          :disabled="loading"
          @click.stop="dialogColor = true"
          >
        </v-text-field>
      </v-card-text>

      <v-dialog
        v-model="dialogColor"
        width="300px"
      >
        <template v-slot:activator="{ on }">

        </template>
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
        <label-delete :label="label" @submit="() => (dialog = false)" />
        <v-spacer></v-spacer>
        <v-btn
          v-if="!$vuetify.breakpoint.smAndDown"
          color="primary"
          :loading="loading"
          @click="update()"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LabelEdit',
  props: ['label'],
  components: {
    LabelDelete: () => import('@/components/Project/LabelDelete.vue')
  },
  data: () => ({
    dialogColor: false,
    dialog: false,
    loading: false
  }),
  methods: {
    async update () {
      this.loading = true
      await this.$store.dispatch('labels/put', {
        id: this.label.id,
        payload: this.label
      })
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
