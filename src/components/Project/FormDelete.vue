<template>
  <v-dialog
    v-model="dialog"
    width="300"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        class="ml-2"
        color="error"
        text
        v-on="on"
      >
        <v-icon left>mdi-delete</v-icon> Delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Delete Form '{{ form.title }}'
      </v-card-title>

      <v-card-text>
        Are you sure you wish to permanently delete this form?
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
  name: 'FormDelete',
  props: ['form'],
  data: () => ({
    title: '',
    loading: false,
    dialog: false
  }),
  methods: {
    async remove () {
      this.loading = true
      await this.$store.dispatch('forms/delete', this.form.id)
      this.dialog = false
      this.$emit('submit', true)
      this.loading = false
    }
  }
}
</script>
