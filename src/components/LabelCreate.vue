<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="primary"
          v-on="on"
        >
          Create <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </template>
    <v-card>
      <v-card-title
        class="subtitle-1"
      >
        Create Label
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
          v-on:keyup.enter="create()"
          >
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          @click="create()"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LabelEdit',
  data: () => ({
    dialog: false,
    label: {
      title: '',
      description: '',
      color: ''
    },
    loading: false
  }),
  methods: {
    create () {
      this.loading = true
      this.$store.dispatch('labels/create', this.label)
        .then(() => {
          this.dialog = false
          this.label = {
            title: '',
            description: '',
            color: ''
          }
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
