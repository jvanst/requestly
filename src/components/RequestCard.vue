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
        <v-list-tile-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-tile-avatar>
      </v-list-item>
    </v-list>
    <v-divider/>
    <v-card-actions>
      <v-chip
        color="orange"
        label
      >
        <b>Enhancement</b>
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RequestCard',
  props: ['request']
}
</script>
