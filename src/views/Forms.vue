<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon left>mdi-information-outline</v-icon> Forms
      </v-card-title>
      <v-card-text>
        Here you can manage request forms. Forms give strict format on how requests are built,<br>
        this helps enforce a communication standard between those creating requests and others managing them.
      </v-card-text>
    </v-card>
    <v-layout class="mt-4">
      <v-flex xs6>
      </v-flex>
      <v-flex xs6 class="text-xs-right">
        <v-btn
          color="primary"
          to="/forms/create"
        >
          Create <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-card class="mt-2">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Sample Request Title
            </v-list-item-title>
            <v-list-item-subtitle>
              Type: Enhancement
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-tile-action>
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-item>
        <v-divider/>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'RequestTypes'
}
</script>
