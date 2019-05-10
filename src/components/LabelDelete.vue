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
    async remove () {
      this.loading = true
      await this.$store.dispatch('labels/delete', this.label.id)
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
