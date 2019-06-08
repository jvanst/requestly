<template>
  <v-banner v-model="v0" single-line transition="slide-y-transition">
    New content available.
    <template v-slot:actions="{ dismiss }">
      <v-btn text color="primary" @click="dismiss">Update</v-btn>
    </template>
  </v-banner>
</template>

<script>
export default {
  name: 'NewContentSW',
  props: {
    refreshingApp: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    v0: true
  })
}
</script>
