<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :hide-overlay="$vuetify.breakpoint.smAndDown"
    transition="dialog-bottom-transition"
    max-width="750"
    persistent
  >
  <v-card>
    <v-toolbar
      flat
    >
      <v-app-bar-nav-icon @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-if="editing">
        Edit Form
      </v-toolbar-title>
      <v-toolbar-title v-else>
        Create Form
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn
          text
          @click="update()"
          :loading="loading"
          v-if="editing && $vuetify.breakpoint.smAndDown"
        >
          Update
        </v-btn>
        <v-btn
          text
          @click="create()"
          :loading="loading"
          v-else-if="$vuetify.breakpoint.smAndDown"
        >
          Create
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        label="Title"
        v-model="form.title"
        outlined
      ></v-text-field>

      <v-textarea
        label="Description"
        v-model="form.description"
        outlined
      ></v-textarea>

      <v-divider/>

      <v-subheader>
        Steps
        <v-spacer/>
        <v-dialog
            v-model="addDialog"
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
              <v-toolbar
                flat
              >
              <v-app-bar-nav-icon @click="addDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-app-bar-nav-icon>
              <v-toolbar-title>
                Create Step
              </v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
              <v-card-text>
                <v-text-field
                  outlined
                  label="Title"
                  v-model="stepTitle"
                  hide-details
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
      </v-subheader>

      <v-list v-if="!form.steps.length" class="pt-0">
        <v-subheader>
          You have no steps yet.
        </v-subheader>
      </v-list>

      <v-expansion-panels v-else accordion :value="true">
        <v-expansion-panel
          v-for="(step, i) in form.steps"
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

      <v-divider/>

      <v-subheader>
        Automatically apply these labels.
      </v-subheader>

      <div v-if="loadingLabels">
        LOADING
      </div>
      <div v-else class="pl-2 ml-1">
        <v-btn
          v-for="label in labels"
          :key="label.id"
          @click="toggleLabel(label.id)"
          :color="label.color"
          class="mr-2"
          small
          >
          {{ label.title }}
          <v-icon
            v-if="form.labels.find(e => e === label.id)"
            right
          >mdi-check-circle-outline</v-icon>
        </v-btn>
      </div>
    </v-card-text>

    <v-card-actions>
      <form-delete
        v-if="editing"
        :form="form"
        @submit="() => (dialog = false)"
      />
      <v-spacer/>
      <v-btn
        v-if="editing && !$vuetify.breakpoint.smAndDown"
        color="primary"
        @click.native="update()"
      >
        Update
      </v-btn>
      <v-btn
        v-else-if="!editing && !$vuetify.breakpoint.smAndDown"
        color="primary"
        @click.native="create()"
      >
        Create
      </v-btn>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    form: {
      Type: Object,
      default: () => ({
        title: '',
        description: '',
        labels: [],
        steps: []
      })
    }
  },
  name: 'FormBuilder',
  components: {
    FieldBuilder: () => import('@/components/Project/FieldBuilder'),
    FormDelete: () => import('@/components/Project/FormDelete')
  },
  data: () => ({
    loading: false,
    loadingLabels: false,
    dialog: false,
    addDialog: false,
    deleteDialog: false,
    stepTitle: ''
  }),
  computed: {
    labels () {
      return this.$store.state.labels.data
    },
    editing () {
      if (this.form.id) {
        return true
      }
      return false
    }
  },
  created () {
    this.fetchLabels()
  },
  methods: {
    addStep () {
      this.form.steps.push({
        title: this.stepTitle,
        fields: []
      })
      this.stepTitle = ''
      this.addDialog = false
    },
    removeStep (index) {
      this.form.steps.splice(index, 1)
    },
    toggleLabel (id) {
      let label = this.form.labels.findIndex(e => e === id)

      if (label !== -1) {
        this.form.labels.splice(label, 1)
        return
      }
      this.form.labels.push(id)
    },
    async fetchLabels () {
      this.loadingLabels = true
      await this.$store.dispatch('labels/fetch')
      this.loadingLabels = false
    },
    async create () {
      this.loading = true
      await this.$store.dispatch('forms/create', this.form)
      this.loading = false
      this.dialog = false
    },
    async update () {
      this.loading = true
      const payload = Object.assign({}, this.form)
      delete payload.id // Remove id from beind submitted
      await this.$store.dispatch('forms/put', {
        id: this.form.id,
        payload
      })
      this.loading = false
      this.dialog = false
    }
  }
}
</script>
