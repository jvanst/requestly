<template>
  <v-layout wrap>

    <v-flex xs12>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-xs-left">Label</th>
            <th class="text-xs-left">Description</th>
            <th class="text-xs-left">Type</th>
            <th class="text-xs-left">Required</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, j) in fields" :key="'field'+j">
            <td>{{ field.label }}</td>
            <td>{{ field.description }}</td>
            <td>{{ field.type }}</td>
            <td>{{ field.required }}</td>
            <td class="text-xs-right">
              <v-btn icon @click="removeField(j)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>

    <v-flex xs12>
      <v-layout>
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
                Add Field
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Create Field
              </v-card-title>

              <v-card-text>
                <v-text-field
                  box
                  label="Title"
                  v-model="label"
                  ></v-text-field>

                <v-textarea
                  box
                  label="Description"
                  v-model="description"
                ></v-textarea>

                <v-select
                  box
                  label="Field Type"
                  v-model="type"
                  :items="fieldTypes"
                />

                <v-switch v-model="required" label="Required"/>

              </v-card-text>

              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="primary"
                  @click.native="addField()"
                >
                  Create
                </v-btn>
              </v-card-actions>

            </v-card>

          </v-dialog>
          
        </v-flex>
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  name: 'FieldBuilder',
  props: ['fields'],
  data: () => ({
    dialog: false,
    label: '',
    description: '',
    type: '',
    required: true,
    fieldTypes: [
      'textfield',
      'textarea',
      'fileupload'
    ]
  }),
  methods: {
    addField() {
      this.fields.push({
        label: this.label,
        description: this.description,
        type: this.type,
        required: this.required
      })
      this.dialog = false
      this.label = ''
      this.description = ''
      this.type = ''
      this.required = true
    },
    removeField(index) {
      this.fields.splice(index, 1)
    },
  }
}
</script>
