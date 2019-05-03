<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon left>mdi-information-outline</v-icon> Labels
      </v-card-title>
      <v-card-text>
        Here you can manage labels. Labels help to give classifications to requests.
      </v-card-text>
      <v-card-actions>
        <label-create/>
      </v-card-actions>
    </v-card>
    <v-card v-if="loading">
      LOADING
    </v-card>
    <v-card v-else class="mt-3">
      <v-simple-table>
        <thead>
          <tr>
            <th>Action</th>
            <th class="text-xs-left">Title</th>
            <th class="text-xs-left">Description</th>
            <th class="text-xs-left">Color</th>
            <th class="text-xs-right">Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="label in labels" :key="label.id">
            <td>
              <label-edit :label="label"/>
              <label-delete :label="label"/>
            </td>
            <td>{{ label.title }}</td>
            <td>{{ label.description }}</td>
            <td>{{ label.color }}</td>
            <td class="text-xs-right">
              <Label
                :title="label.title"
                :description="label.description"
                :color="label.color"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Labels',
  components: {
    Label: () => import('@/components/Label.vue'),
    LabelCreate: () => import('@/components/LabelCreate.vue'),
    LabelEdit: () => import('@/components/LabelEdit.vue'),
    LabelDelete: () => import('@/components/LabelDelete.vue')
  },
  data: () => ({
    loading: false
  }),
  created () {
    this.fetch()
  },
  computed: {
    labels () {
      return this.$store.state.labels.data
    }
  },
  methods: {
    fetch () {
      // Do not re-fetch if already available in vuex
      if (this.$store.state.labels.fetched) {
        return
      }
      this.loading = true
      this.$store.dispatch('labels/fetch')
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
