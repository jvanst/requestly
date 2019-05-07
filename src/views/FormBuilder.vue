<template>
  <v-container grid-list-lg>

    <v-layout v-if="loading" wrap>
      <v-flex xs12 >
       LOADING
      </v-flex>
    </v-layout>

    <v-layout v-else wrap>

      <v-flex xs6 class="headline">
        <span v-if="form">Edit Form: {{ form.title }}</span>
        <span v-else>Create Form</span>
      </v-flex>

      <v-flex xs6 class="text-xs-right" v-if="id">
        <v-btn icon @click.native="deleteDialog = true" >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <form-delete v-model="deleteDialog" :form="form"/>
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
    </v-layout>

    <v-layout wrap>

      <v-flex xs12 class="title">
        Labels
      </v-flex>

      <v-flex xs12 class="mb-2">
        Here you can pick labels that will be automatically applied.
      </v-flex>

      <v-flex>
          <div v-if="loadingLabels">
            LOADING
          </div>
          <div v-else>
            <v-btn
              v-for="label in labels"
              :key="label.id"
              @click="toggleLabel(label.id)"
              :color="label.color"
              class="mr-2"
              >
              {{ label.title }}
              <v-icon
                v-if="request.labels.find(e => e === label.id)"
                right
              >mdi-check-circle-outline</v-icon>
            </v-btn>
          </div>
      </v-flex>

      <v-flex xs12>
        <v-divider/>
      </v-flex>

      <v-flex xs6>
        <v-btn text to="/forms" exact>
          Back
        </v-btn>
      </v-flex>

      <v-flex xs6 class="text-xs-right">
        <v-btn
          v-if="form"
          :loading="loading"
          color="primary"
          @click.native="update()"
        >
          Update
        </v-btn>
        <v-btn
          v-else
          :loading="loading"
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
  props: ['id'],
  name: 'FormBuilder',
  components: {
    FieldBuilder: () => import('@/components/FieldBuilder'),
    FormDelete: () => import('@/components/FormDelete')
  },
  data: () => ({
    editing: true,
    loading: false,
    loadingLabels: false,
    dialog: false,
    deleteDialog: false,
    stepTitle: '',
    request: {
      title: '',
      description: '',
      labels: [],
      steps: [
        {
          title: 'Details',
          fields: [
            {
              label: 'Title',
              description: 'Give your request a title',
              type: 'textfield',
              required: true
            }
          ]
        }
      ]
    }
  }),
  computed: {
    form () {
      return this.$store.getters['forms/getById'](this.id)
    },
    labels () {
      return this.$store.state.labels.data
    }
  },
  created () {
    // If Id exists then we want to edit this form
    if (this.id) {
      this.fetch()
    }
    this.fetchLabels()
  },
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
    toggleLabel (id) {
      let label = this.request.labels.findIndex(e => e === id)

      if (label !== -1) {
        this.request.labels.splice(label, 1)
        return
      }
      this.request.labels.push(id)
    },
    fetchLabels () {
      // Do not re-fetch if already available in vuex
      if (this.$store.state.labels.fetched) {
        return
      }
      this.loadingLabels = true
      this.$store.dispatch('labels/fetch')
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loadingLabels = false))
    },
    fetch () {
      this.editing = true

      // Do not re-fetch if already available in vuex
      if (this.form) {
        this.request = this.form
        return
      }
      this.loading = true
      this.$store.dispatch('forms/fetchById', this.id)
        .then(() => (this.request = this.form))
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    },
    create () {
      this.loading = true
      this.$store.dispatch('forms/create', this.request)
        .then(() => {
          this.$router.replace('/forms')
          this.showSnackbar('Succesfully created', 'success')
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    },
    update () {
      this.loading = true
      this.$store.dispatch('forms/update', { id: this.id, payload: this.request })
        .then(() => {
          this.$router.replace('/forms')
          this.showSnackbar('Succesfully updated', 'success')
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
