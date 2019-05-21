<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon left>mdi-information-outline</v-icon> Forms
      </v-card-title>
      <v-card-text>
        Here you can manage request forms. Forms give strict format on how requests are built,<br>
        this helps enforce a communication standard between those creating requests and others managing them.
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-list>
        <v-list-item v-if="loading">
          <v-list-item-content>
            <v-list-item-title>
              Loading
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-else v-for="(form, i) in forms">
          <v-list-item :key="'form'+i" :to="{ name: 'Edit Form', params: { 'id': form.id }}">
            <v-list-item-content>
              <v-list-item-title>
                {{ form.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ form.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
              <v-btn icon :to="{ name: 'Edit Form', params: { 'id': form.id }}">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action-text>
          </v-list-item>
          <v-divider :key="i"/>
        </template>
      </v-list>
    </v-card>
    <v-btn
      color="primary"
      fab
      fixed
      bottom
      right
      large
      :to="{ name: 'Create Form' }"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Forms',
  data: () => ({
    loading: false
  }),
  created () {
    this.fetch()
  },
  computed: {
    forms () {
      return this.$store.state.forms.data
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      await this.$store.dispatch('forms/fetch')
      this.loading = false
    }
  }
}
</script>
