<template>
  <v-dialog
    v-model="dialog"
    width="300"
  >
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
  props: ['value', 'form'],
  data: () => ({
    title: '',
    loading: false
  }),
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    remove () {
      this.loading = true
      this.$router.replace('/forms/')
      this.$store.dispatch('forms/delete', this.form.id)
        .then(() => {
          this.dialog = false
          this.showSnackbar('Successfuly deleted', 'success')
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
