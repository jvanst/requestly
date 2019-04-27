<template>
    <v-layout wrap class="mb-4">
      <v-flex
        v-for="(field, index) in fields"
        :key="`field-${index}`"
        xs12>

        <!-- If textarea -->
        <v-textarea
          v-if="field.type === 'textarea'"
          v-model="content[field.label]"
          :label="field.label"
          :hint="field.description"
          :required="field.required"
          :rules="field.required ? [v => !!v || field.label + ' is required'] : ''"
          :prefix="field.prefix"
          class="mb-3"
        ></v-textarea>

        <!-- if textfield -->
        <v-text-field
          v-else-if="field.type === 'textfield'"
          v-model="content[field.label]"
          :label="field.label"
          :hint="field.description"
          :required="field.required"
          :rules="field.required ? [v => !!v || field.label + ' is required'] : ''"
          :prefix="field.prefix"
          class="mb-3"
        ></v-text-field>

        <!-- if fileupload -->
        <file-upload
          v-else-if="field.type === 'fileupload'"
          :label="field.label"
          :accepts="field.accepts"
          :required="field.required"
        />

      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'field-generator',
  components: {
    FileUpload: () => import('@/components/helpers/file-upload.vue')
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
  }
}
</script>
