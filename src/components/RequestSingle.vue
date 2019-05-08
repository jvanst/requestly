<template>
  <v-card class="pa-2">
    <template  v-for="(section, index) in Object.keys(request.content)">
      <v-card-title
        class="title"
        :key="'content-title'+index">
        {{ section | capitalizeFirstLetter }}
      </v-card-title>

      <v-card-text :key="'content-section'+index">
        {{ request.content[section] }}
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'RequestSingle',
  props: ['request']
}
</script>
