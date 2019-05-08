<template>
  <v-tooltip bottom v-if="label.title">
    <template v-slot:activator="{ on }">
      <v-chip
        :color="label.color"
        label
        dark
      >
        <b>{{ label.title }}</b>
      </v-chip>
    </template>
    <span>{{ label.description }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Label',
  props: {
    label: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        color: ''
      })
    }
  }
}
</script>
