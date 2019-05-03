<template>
  <v-dialog
    v-model="dialog"
    width="300"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Delete Pipeline '{{ label.title }}'
      </v-card-title>

      <v-card-text>
        Are you sure you wish to permanently delete this label?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          :loading="loading"
          @click="remove()"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LabelDelete',
  props: ['label'],
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    remove () {
      this.loading = true
      this.$store.dispatch('labels/delete', this.label.id)
        .then(() => {
          this.dialog = false
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
