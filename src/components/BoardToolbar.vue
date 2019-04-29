<template>
  <v-toolbar
    flat
    dense
    class="transparent"
    >
      <v-spacer/>
      <create-pipeline/>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'BoardToolbar',
    components: {
      CreatePipeline: () => import('@/components/CreatePipeline')
    }
  }
</script>