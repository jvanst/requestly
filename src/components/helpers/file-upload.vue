<template>
  <div>
    {{ label }}
    <v-btn
      class="ml-0"
      color="primary"
      onclick="document.getElementById('file-input').click();">
      Choose File
    </v-btn>
    <input id="file-input" type="file" @change="handleFile" :accept="accepts" style="display: none;"/>
  </div>
</template>

<script>
export default {
  name: 'file-upload',
  props: {
    accepts: {
      type: String,
      default: '.jpg, .jpeg, .png'
    },
    label: {
      type: String,
      default: 'Choose File'
    }
  },
  methods: {
    handleFile (e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>
