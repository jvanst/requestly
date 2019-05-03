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

        <v-text-field
          label="Color"
          v-model="label.color"
          v-on:keyup.enter="update()"
          >
        </v-text-field>
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
    dialog: false,
    loading: false
  }),
  methods: {
    update () {
      this.loading = true
      this.$store.dispatch('labels/update', {
        id: this.label.id,
        payload: this.label
      })
        .then(() => {
          this.dialog = false
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
