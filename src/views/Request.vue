<template>
  <v-container>
    <v-card>
    <v-toolbar
      flat
    >
      <v-btn
        @click="$router.go(-1)"
        text
      >
        <v-icon left>mdi-keyboard-backspace</v-icon> Back
      </v-btn>
    </v-toolbar>
    <v-card-text>
      Request {{ id }}
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Request',
  props: ['id']
}
</script>
