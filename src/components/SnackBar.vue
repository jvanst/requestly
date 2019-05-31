<template>
  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
    :multi-line="snackbar.message.length > 68"
    bottom
    right
    :timeout="6000"
  >
    {{ snackbar.message }}
    <v-btn dark icon @click="snackbar.visible = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SnackBar',
  computed: {
    ...mapState({
      snackbar: state => state.snackbar
    })
  }
}
</script>
