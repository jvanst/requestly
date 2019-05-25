<template>
  <v-menu
    v-model="menu"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        icon
        small
        >
          <v-icon small>mdi-dots-vertical</v-icon>
        </v-btn>
    </template>
    <v-card>
      <v-list dense class="transparent pa-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Edit Request
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>
            <v-icon small>mdi-pencil-outline</v-icon>
          </v-list-item-action-text>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'RequestSingleOptions',
  props: ['item'],
  data: () => ({
    menu: false,
    deleteDialog: false
  })
}
</script>
