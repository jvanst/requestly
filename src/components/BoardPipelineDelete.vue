<template>
  <v-dialog
    v-model="dialog"
    width="300"
  >
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Delete Pipeline '{{ pipeline.title }}'
      </v-card-title>

      <v-card-text>
        Are you sure you wish to permanently delete this pipeline?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
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
  name: 'PipelineRename',
  props: ['value', 'pipeline'],
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
    remove() {
      this.loading = true
      this.$store.dispatch('pipelines/delete', this.pipeline.id)
        .then(() => {
          this.menu = false
          this.dialog = false
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>