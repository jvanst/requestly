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
          outlined
          hide-details
        />
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
    async update () {
      this.loading = true
      await this.$store.dispatch('pipelines/put', {
        id: this.pipeline.id,
        payload: {
          ...this.pipeline,
          title: this.title
        }
      })
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
