<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <slot/>

    <div @click="validate()">
      <slot
        name="button"
      />
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'FormValidation',
  data: () => ({
    valid: true
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.$emit('valid')
      }
    }
  }
}
</script>
