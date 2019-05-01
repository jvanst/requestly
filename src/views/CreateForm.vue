<template>
  <v-container grid-list-lg>
    

    <v-layout wrap>

      <v-flex xs12 class="headline">
        Create Form
      </v-flex>

      <v-flex xs12>
        <v-text-field
          box
          label="Title"
          v-model="request.title"
          hide-details
          ></v-text-field>
      </v-flex>
      
      <v-flex xs12>
        <v-textarea
          box
          label="Description"
          v-model="request.description"
        ></v-textarea>
      </v-flex>

      <v-flex xs12>
        <v-divider/>
      </v-flex>

    </v-layout>
    <v-layout wrap>

      <v-flex xs12 class="title">
        Steps
      </v-flex>

      <v-flex xs12 class="mb-2">
        Steps help break up the request form into pieces. <br>
        You are required to have at least one step, with one title field.
      </v-flex>
      
      <v-flex xs12>
        <v-card
          v-if="!request.steps.length"
          flat
          class="text-xs-center pa-3"
        >
          <i>No steps created</i>
        </v-card>

        <v-expansion-panels>
          <v-expansion-panel
            v-for="(step, i) in request.steps"
            :key="'step'+i"
          >
            <v-expansion-panel-header>
              Step {{ i  + 1 }} - {{ step.title }}

              <template v-slot:actions>
                <v-btn icon @click="removeStep(i)"><v-icon>mdi-delete</v-icon></v-btn>
              </template>
            </v-expansion-panel-header>
            
            <v-expansion-panel-content>
              <field-builder :fields="step.fields"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>

      <v-flex xs12 class="text-xs-center">
        <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                small
                text
                v-on="on"
              >
                Add Step
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Create Step
              </v-card-title>

              <v-card-text>
                <v-text-field
                  box
                  label="Title"
                  v-model="stepTitle"
                  ></v-text-field>

              </v-card-text>

              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="primary"
                  @click.native="addStep()"
                >
                  Create
                </v-btn>
              </v-card-actions>

            </v-card>

          </v-dialog>
      </v-flex>

      <v-flex xs12>
        <v-divider/>
      </v-flex>

      <v-flex xs6/>
      <v-flex xs6 class="text-xs-right">
        <v-btn
          color="primary"
          @click="create()"
        >
          Create Form
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CreateRequestType',
  components: {
    FieldBuilder: () => import('@/components/FieldBuilder'),
  },
  data: () => ({
    dialog: false,
    stepTitle: '',
    request: {
      title: '',
      description: '',
      steps: [
        {
          title: 'Details',
          fields: [
            {
              label: 'Title',
              description: 'Give your request a title',
              type: 'textfield',
              required: true
            },
          ]
        }
      ]
    },
  }),
  methods: {
    addStep () {
      this.request.steps.push({
        title: this.stepTitle,
        fields: []
      })
      this.stepTitle = ''
      this.dialog = false
    },
    removeStep (index) {
      this.request.steps.splice(index, 1)
    },
    create () {
      this.loading = true
      this.$store.dispatch('forms/create', this.request)
        .then(() => this.$router.go('/forms'))
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
