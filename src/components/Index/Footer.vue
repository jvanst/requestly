<template>
  <v-footer
      color="orange lighten-1"
      padless
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-flex
          class="orange darken-1"
          lighten-2
          py-3
          text-xs-center
          white--text
          xs12
        >
          &copy;2019 — <strong>Requestly</strong>
        </v-flex>
      </v-layout>
    </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us'
    ]
  })
}
</script>
