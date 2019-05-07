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
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-divider/>
    <v-card-actions>
      <request-labels :request="request"/>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RequestCard',
  props: ['request'],
  components: {
    RequestLabels: () => import('@/components/RequestLabels')
  }
}
</script>
