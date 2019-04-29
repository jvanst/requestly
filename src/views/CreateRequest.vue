<template>
  <v-container>
    <span class="headline">Create a Request</span>

      <v-container>

        <v-stepper
          v-model="stepperValue"
          vertical
          style="box-shadow: none;border: none;"
        >

          <v-stepper-step
            :complete="stepperValue > 1"
            :editable="stepperValue > 1"
            step="1"
          >
            Type
            <small v-if="request.type">
              {{ typeById(request.type).name }}
            </small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-container>
              <v-layout wrap class="mb-4">
                <v-flex
                  xs12>
                  <v-select
                    v-model="request.type"
                    :items="types"
                    item-value="id"
                    item-text="name"
                    label="Choose a type"
                    required
                  ></v-select>
                </v-flex>
                <v-flex
                  xs12
                  v-for="(request, index) in types"
                  :key="index + 'flex'"
                  class="caption">
                    <b>{{ request.name }}</b>: {{ request.description }}
                </v-flex>
              </v-layout>

              <v-btn
                :disabled="!request.type"
                color="primary"
                @click="stepperValue = 2"
              >Continue</v-btn>
            </v-container>

          </v-stepper-content>

          <template
            v-for="(step, i) in typeById(request.type).steps"
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

        </v-stepper>

      </v-container>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CreateRequest',
  components: {
    FormValidation: () => import('@/components/FormValidation.vue'),
    FieldGenerator: () => import('@/components/FieldGenerator.vue')
  },
  data: () => ({
    stepperValue: 1,
    request: {
      content: {},
      title: null,
      type: 1
    }
  }),
  mounted () {
    this.$store.dispatch('type/fetchTypes')
  },
  computed: {
    ...mapState({
      types: state => state.type.data
    }),
    ...mapGetters({
      typeById: 'type/byId'
    })
  },
  methods: {
    submit () {
      this.$store.dispatch('request/create', this.request)
        .then(() => this.$router.go('/'))
    }
  }
}
</script>
