<template>
  <v-container
    :class="{ 'px-0' : $vuetify.breakpoint.smAndDown }"
  >
    <v-list v-if="loading">
      <template v-for="(n, index) in 5">
        <v-list-item :key="'list-item' + index">
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-card
                :color="$store.state.ui.dark ? 'grey darken-4' : 'grey lighten-4'"
                width="100%"
                height="20px"
                flat
              />
            </v-list-item-subtitle>
            <v-list-item-title>
              <v-card
                :color="$store.state.ui.dark ? 'grey darken-4' : 'grey lighten-4'"
                width="50%"
                height="20px"
                flat
              />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="'list-divider' + index"/>
      </template>
    </v-list>
    <v-list v-else-if="forms.length">
      <template v-for="(form, i) in forms">
        <v-list-item
          :key="'form'+i"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ form.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ form.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="i"/>
      </template>
    </v-list>
    <v-list v-else>
      <v-subheader>
        You have no forms. Create one with the plus button below.
      </v-subheader>
    </v-list>
    <v-btn
      color="primary"
      :class="{ 'mb-5' : $vuetify.breakpoint.smAndDown }"
      fab
      fixed
      bottom
      right
      large
      @click.native="$refs.createForm.dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <create-form ref="createForm"/>
  </v-container>
</template>

<script>
export default {
  name: 'Forms',
  data: () => ({
    loading: false
  }),
  components: {
    CreateForm: () => import('@/components/Project/FormBuilder')
  },
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
