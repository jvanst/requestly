<template>
  <v-container>
    <span class="headline">Create a Request</span>
      <v-container v-if="loading">
        LOADING
      </v-container>

      <v-container v-else>

        <v-stepper
          v-model="stepperValue"
          vertical
        >

          <v-stepper-step
            :complete="stepperValue > 1"
            :editable="stepperValue > 1"
            step="1"
          >
            Type
            <small v-if="formId">
              {{ form.title }}
            </small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-container>
              <v-layout wrap class="mb-4">
                <v-flex
                  xs12>
                  <v-select
                    v-model="formId"
                    :items="forms"
                    item-value="id"
                    item-text="title"
                    label="Choose a type"
                    required
                  ></v-select>
                </v-flex>
                <v-flex
                  xs12
                  v-for="(form, index) in forms"
                  :key="index + 'flex'"
                  class="caption">
                    <b>{{ form.title }}</b>: {{ form.description }}
                </v-flex>
              </v-layout>

              <v-btn
                :disabled="!formId"
                color="primary"
                @click="stepperValue = 2"
              >Continue</v-btn>
            </v-container>

          </v-stepper-content>

          <div v-if="form">
          <template
            v-for="(step, i) in form.steps"
          >
            <v-stepper-step
              :key="'step-' + i"
              :step="2 + i"
              :complete="stepperValue > (2 + i)"
              :editable="stepperValue > (2 + i)"
            >
              {{ step.title }}
            </v-stepper-step>

            <v-stepper-content
              :key="'step-content-' + i"
              :step="2 + i"
            >
              <form-validation v-on:valid="stepperValue += 1">
                <template v-slot:default>
                  <field-generator
                    :fields="step.fields"
                    :content="request.content"
                  />
                </template>

                <template v-slot:button>
                  <v-btn
                    color="primary"
                  >Continue</v-btn>
                </template>

              </form-validation>
            </v-stepper-content>

          </template>
          </div>

          <v-stepper-step
            :key="'step-' + (form ? form.steps.length : 0) + 2"
            :step="(form ? form.steps.length : 0) + 2"
            :complete="stepperValue > ((form ? form.steps.length : 0) + 1)"
            :editable="stepperValue > ((form ? form.steps.length : 0) + 1)"
          >
            Confirm
          </v-stepper-step>

          <v-stepper-content :step="(form ? form.steps.length : 0) + 2">
            <v-container>
              <v-btn
                @click="create()"
                :loading="creating"
                color="primary"
              >Submit</v-btn>
            </v-container>

          </v-stepper-content>

        </v-stepper>

      </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CreateRequest',
  components: {
    FormValidation: () => import('@/components/FormValidation.vue'),
    FieldGenerator: () => import('@/components/FieldGenerator.vue')
  },
  data: () => ({
    stepperValue: 1,
    formId: null,
    request: {
      content: {}
    },
    loading: false,
    creating: false
  }),
  created () {
    this.fetch()
  },
  computed: {
    ...mapState({
      forms: state => state.forms.data
    }),
    form () {
      return this.$store.getters['forms/getById'](this.formId)
    }
  },
  methods: {
    fetch () {
      // Do not re-fetch if already available in vuex
      if (this.$store.state.forms.fetched) {
        return
      }
      this.loading = true
      this.$store.dispatch('forms/fetch')
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    },
    create () {
      this.creating = true
      this.$store.dispatch('requests/create', this.request)
        .then(() => this.$router.replace('/'))
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.creating = false))
    }
  }
}
</script>
