<template>
  <v-card
    height="90"
    :to="{ name: 'Board', params: { projectId: project.id } }"
    class="mb-1"
  >
    <v-card-title class="title pb-0">
      {{ project.title }}
    </v-card-title>
    <v-card-text class="subtitle-1 pt-0">
      {{ project.id }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      default: () => ({
        title: '',
        id: ''
      })
    }
  }
}
</script>
