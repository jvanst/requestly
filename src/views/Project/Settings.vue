<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon left>mdi-information-outline</v-icon> Settings
      </v-card-title>
      <v-card-text>
        Adjust project settings
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-list>
        <!-- <v-list-item>
          <v-list-tile-action>
            <v-switch v-model="publicByLink"/>
          </v-list-tile-action>
          <v-list-item-content>
            <v-list-item-title>
              Publicly available by link
            </v-list-item-title>
            <v-list-item-subtitle>
              Allow anyone who has the link to your project view and contribute
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item to="#" @click.stop="deleteDialog = true">
          <v-list-tile-action style="width:38px">
            <v-icon>mdi-delete</v-icon>
          </v-list-tile-action>
          <v-list-item-content>
            <v-list-item-title>
              Close Project
            </v-list-item-title>
            <v-list-item-subtitle>
              Permanently delete all project data
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog
      v-model="deleteDialog"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>
          Closing your project will permanently delete all project data.
          You will not be able to recover any data after this point.
        </v-card-text>

        <v-card-actions>

          <v-btn
            text
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="error"
            @click="closeProject()"
          >
            Delete Forever
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Settings',
  data: () => ({
    publicByLink: true,
    deleteDialog: false
  }),
  methods: {
    async closeProject () {
      this.$router.push({ name: 'Dashboard' })
      this.$store.dispatch('projects/delete', this.$store.state.projects.activeId)
      this.deleteDialog = true
    }
  }
}
</script>
