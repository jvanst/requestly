<template>
  <v-snackbar
    v-model="snackbarVisible"
    :color="snackbarColor"
    :multi-line="snackbarMessage.length > 68"
    bottom
    right
    :timeout="6000"
  >
    {{ snackbarMessage }}
    <v-btn dark icon @click="snackbarVisible = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar'
}
</script>
