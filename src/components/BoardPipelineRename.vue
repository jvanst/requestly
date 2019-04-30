<template>
  <v-dialog
    v-model="dialog"
    width="300"
  >
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Rename Pipeline '{{ pipeline.title }}'
      </v-card-title>

      <v-card-text class="pb-0 pt-0">
        <v-text-field
        label="Title"
        v-model="title"
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
    update () {
      this.loading = true
      this.$store.dispatch('pipelines/update', {
        id: this.pipeline.id,
        payload: {
          title: this.title
        }
      })
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
