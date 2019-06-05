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
      <v-list v-else-if="labels.length">
        <template v-for="label in labels">
          <v-list-item
            href="#edit"
            @click.native="selectedLabel = label; $refs.edit.dialog = true;"
            :key="'list-item' + label.id">
            <v-list-item-content>
              <v-list-item-title>
                {{ label.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ label.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
              <Label
                :label="label"
              />
            </v-list-item-action-text>
          </v-list-item>
          <v-divider :key="'list-divider' + label.id"/>
        </template>
      </v-list>
      <v-list v-else>
        <v-subheader>
          You have no labels. Create one with the plus button below.
        </v-subheader>
      </v-list>
    <label-create/>
    <label-edit :label="selectedLabel" ref="edit"/>
  </v-container>
</template>

<script>
export default {
  name: 'Labels',
  components: {
    Label: () => import('@/components/Project/Label.vue'),
    LabelCreate: () => import('@/components/Project/LabelCreate.vue'),
    LabelEdit: () => import('@/components/Project/LabelEdit.vue')
  },
  data: () => ({
    loading: false,
    selectedLabel: {}
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
    async fetch () {
      // If data has been loaded previously
      if (!this.loaded()) {
        this.loading = true
      }
      await this.$store.dispatch('labels/fetch')
      this.loading = false
    },
    loaded () {
      if (this.$store.state.labels.data.length) {
        return true
      }
      return false
    }
  }
}
</script>
