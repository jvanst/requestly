<template>
  <v-timeline-item
    :icon="item.icon"
    fill-dot
    small
  >
    <v-layout justify-space-between class="grey--text">
      <v-flex xs7>{{ item.value }}</v-flex>
      <v-flex xs5 text-xs-right>{{ item.createdOn.seconds | formatSeconds }}</v-flex>
    </v-layout>
  </v-timeline-item>
</template>

<script>
export default {
  name: 'RequestTimelineStatus',
  props: ['item']
}
</script>
