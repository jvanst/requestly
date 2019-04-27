<template>
  <v-layout row>
    <v-flex xs12>
      <v-card style="max-width:800px" class="mx-auto" flat>
        <v-alert v-if="response.code" color="error" icon="warning" value="true">
          {{response.message}}
        </v-alert>
        <v-card-title>
          <span class="headline pl-3 pt-3">Register</span>
        </v-card-title>
        <v-card v-if="loading" flat class="text-xs-center" height="196px">
          <v-progress-circular indeterminate v-bind:size="50" color="primary"></v-progress-circular>
        </v-card>
        <v-card v-else-if="verification_email" flat class="text-xs-center" height="196px">
          <v-card-text class="subheading">
            <v-icon class="green--text" x-large>check_circle</v-icon> Verification Email Sent
          </v-card-text>
          <v-card-text>
            <v-btn to="/" flat><v-icon left>keyboard_arrow_left</v-icon> Back to homepage </v-btn>
          </v-card-text>
        </v-card>
        <v-layout v-else wrap class="pr-4 pl-4 pb-4">
          <v-flex xs12 class="pl-2 pr-2">
            <v-text-field label="Email" type="email" name="email" v-model="email"></v-text-field>
          </v-flex>
          <v-flex xs12 class="pl-2 pr-2">
            <v-text-field label="Confirm Email" type="email" name="email" v-model="email"></v-text-field>
          </v-flex>
          <v-flex xs12 class="pl-2 pr-2">
            <v-text-field label="Password" type="password" name="password" v-model="password"></v-text-field>
          </v-flex>
          <v-flex xs12 class="pl-2 pr-2">
            <v-text-field label="Confirm Password" type="password" name="password" v-model="password"></v-text-field>
          </v-flex>
          <v-flex xs12 class="pl-2 pr-2">
            <v-text-field label="Display Name" type="text" name="display name" v-model="displayName"></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-right">
            <v-btn class="primary" @click.native="register()">Register</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    email: '',
    password: '',
    displayName: ''
  }),
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    register () {
      this.$store.dispatch('user/REGISTER', {
        email: this.email,
        password: this.password,
        info: { displayName: this.displayName }
      }).then(() => {

      })
    }
  }
}
</script>
