<template>
  <v-container
    :class="{ 'px-0' : $vuetify.breakpoint.smAndDown }"
  >
    <v-subheader v-if="!$vuetify.breakpoint.smAndDown">
      Forms
    </v-subheader>
    <list-skeleton v-if="loading"/>
    <v-list v-else-if="forms.length">
      <template v-for="(form, i) in forms">
        <v-list-item
          href="#edit"
          @click.native="selectedForm = form; $refs.createForm.dialog = true;"
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
      @click="selectedForm = undefined; $refs.createForm.dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-fab-transition>
      <create-form ref="createForm" :form="selectedForm"/>
    </v-fab-transition>
  </v-container>
</template>

<script>
export default {
  name: 'Forms',
  data: () => ({
    loading: false,
    selectedForm: undefined
  }),
  components: {
    ListSkeleton: () => import('@/components/Project/ListSkeleton'),
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
