<template>
    <v-bottom-navigation
      app
      v-model="bottomNav"
      absolute
      grow
    >
      <v-btn
        color="teal"
        text
        value="recent"
      >
        <span>Recent</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="favorites"
      >
        <span>Favorites</span>
        <v-icon>mdi-avorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="nearby"
      >
        <span>Nearby</span>
        <v-icon>mdi-place</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
  export default {
    name: 'BottomNav',
    data () {
      return {
        bottomNav: 'recent'
      }
    }
  }
</script>