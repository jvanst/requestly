<template>
  <v-card :to="`/request/${request.id}`">
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
          <request-author :request="request" :size="36"/>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-divider/>
    <v-card-actions class="pb-1">
      <request-labels :request="request"/>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RequestCard',
  props: ['request'],
  components: {
    RequestLabels: () => import('@/components/RequestLabels'),
    RequestAuthor: () => import('@/components/RequestAuthor')
  }
}
</script>
