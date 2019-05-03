<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip
        :color="color"
        label
      >
        <b>{{ title }}</b>
      </v-chip>
    </template>
    <span>{{ description }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Label',
  props: ['title', 'color', 'description']
}
</script>
