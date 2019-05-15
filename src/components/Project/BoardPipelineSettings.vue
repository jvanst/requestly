<template>
  <v-menu
      v-model="menu"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          v-on="on"
          icon
          small
          >
            <v-icon small>mdi-dots-vertical</v-icon>
          </v-btn>
      </template>
      <v-card>
        <v-list dense class="transparent">
          <v-list-item @click.stop="() => { deleteDialog = true; menu = false }">
            <v-list-item-content>
              <v-list-item-title>
                Delete Pipeline
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action-text>
              <v-icon small>mdi-delete</v-icon>
            </v-list-item-action-text>
            <pipeline-delete v-model="deleteDialog" :pipeline="pipeline"/>
          </v-list-item>
          <v-list-item @click.stop="() => { renameDialog = true; menu = false }">
            <v-list-item-content>
              <v-list-item-title>
                Rename Pipeline
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action-text>
              <v-icon small>mdi-pencil</v-icon>
            </v-list-item-action-text>
            <pipeline-rename v-model="renameDialog" :pipeline="pipeline"/>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
</template>

<script>
export default {
  name: 'PipelineSettings',
  props: ['pipeline'],
  components: {
    PipelineRename: () => import('@/components/Project/BoardPipelineRename'),
    PipelineDelete: () => import('@/components/Project/BoardPipelineDelete')
  },
  data: () => ({
    menu: false,
    deleteDialog: false,
    renameDialog: false
  })
}
</script>
