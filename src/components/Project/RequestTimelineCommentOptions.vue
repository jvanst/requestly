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
        <v-list-item @click.stop="deleteDialog = true; menu = false">
          <v-list-item-content>
            <v-list-item-title class="error--text">
              Delete Comment
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>
            <v-icon small>mdi-delete</v-icon>
          </v-list-item-action-text>
        </v-list-item>
        <request-timeline-comment-delete :id="item.id" v-model="deleteDialog"/>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'RequestTimelineCommentOptions',
  props: ['item'],
  components: {
    RequestTimelineCommentDelete: () => import('@/components/Project/RequestTimelineCommentDelete')
  },
  data: () => ({
    menu: false,
    deleteDialog: false
  })
}
</script>
