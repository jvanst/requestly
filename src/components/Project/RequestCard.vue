<template>
  <v-card :to="{ name: 'Request', params: { id: request.id } }">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ request.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ request.title }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar>
          <request-author :uid="request.creatorId" :size="36"/>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-divider/>
    <v-card-actions class="pb-1">
      <request-labels :request="request"/>
      <v-spacer/>
      <v-icon
        class="card-drag-handle"
        v-if="$vuetify.breakpoint.smAndDown"
      >mdi-drag</v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RequestCard',
  props: ['request'],
  components: {
    RequestLabels: () => import('@/components/Project/RequestLabels'),
    RequestAuthor: () => import('@/components/Project/RequestAuthor')
  }
}
</script>
