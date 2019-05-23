<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Edit Label '{{ label.title }}'
      </v-card-title>

      <v-card-text class="pb-0 pt-0">
        <v-text-field
        label="Title"
        v-model="label.title"
        >
        </v-text-field>

        <v-text-field
          label="Description"
          v-model="label.description"
          >
        </v-text-field>

        <v-dialog
          v-model="dialogColor"
          persistent
          width="300px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="Color"
              readonly
              :value="label.color"
              v-on="on"
              >
            </v-text-field>
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
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
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
