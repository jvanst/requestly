<template>
  <v-layout wrap class="mb-4">
    <v-flex
      v-for="(field, index) in fields"
      :key="`field-${index}`"
      xs12>

      <!-- If textarea -->
      <v-textarea
        v-if="field.type === 'textarea'"
        v-model="content[field.label.toLowerCase()]"
        :label="field.label"
        :hint="field.description"
        :required="field.required"
        :rules="field.required ? [v => !!v || field.label + ' is required'] : ''"
        :prefix="field.prefix"
        class="mb-3"
        outlined
      ></v-textarea>

      <!-- if textfield -->
      <v-text-field
        v-else-if="field.type === 'textfield'"
        v-model="content[field.label.toLowerCase()]"
        :label="field.label"
        :hint="field.description"
        :required="field.required"
        :rules="field.required ? [v => !!v || field.label + ' is required'] : ''"
        :prefix="field.prefix"
        class="mb-3"
        outlined
      ></v-text-field>

      <!-- if fileupload -->
      <file-upload
        v-else-if="field.type === 'fileupload'"
        :label="field.label"
        :accepts="field.accepts"
        :required="field.required"
        outlined
      />

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'FieldGenerator',
  components: {
    FileUpload: () => import('@/components/Project/FileUpload.vue')
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    content: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    this.fields.forEach(field => {
      this.content[field.label.toLowerCase()] = null
    })
  }
}
</script>
