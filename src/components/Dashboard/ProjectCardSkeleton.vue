<template>
  <v-card
    width="100%"
    height="90"
    class="mb-1"
    flat
  >
    <v-card-title>
      <v-card
        width="100%"
        height="30"
        :color="$store.state.app.dark ? 'grey darken-4' : 'grey lighten-4'"
        flat
      />
    </v-card-title>
    <v-card-text>
      <v-card
        width="100%"
        height="20"
        :color="$store.state.app.dark ? 'grey darken-4' : 'grey lighten-4'"
        flat
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectCardSkeleton'
}
</script>
