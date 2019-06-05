<template>
  <v-container fill-height>
    <v-layout wrap align-center justify-center style="max-width:500px;margin:auto">
      <v-flex xs12>
        <v-card class="pa-2">
          <v-card-title class="mb-2 text-xs-center">
            <span class="headline">Register</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    label="Email"
                    type="email"
                    name="email"
                    v-model="email"
                    :rules="emailRules"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Confirm Email"
                    type="email"
                    name="email"
                    v-model="emailConfirm"
                    :rules="emailConfirmRules"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    v-model="password"
                    :rules="passwordRules"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Confirm Password"
                    type="password"
                    name="password"
                    v-model="passwordConfirm"
                    :rules="passwordConfirmRules"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Display Name"
                    type="text"
                    name="display name"
                    v-model="displayName"
                    :rules="nameRules"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-btn
                    block
                    dark
                    color="primary"
                    @click.native="validate()"
                    :loading="loading"
                  >Register</v-btn>
                </v-form>
              </v-flex>
              <v-flex xs12 class="text-xs-center pt-4">
                <router-link
                  to="/login"
                  :class="{ 'black--text': !$store.state.ui.dark, 'white--text': $store.state.ui.dark }"
                  >Back to login</router-link>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
    loading: false,
    valid: true,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    nameRules: [
      v => !!v || 'DisplayName is required',
      v => (v && v.length <= 30) || 'Name must be less than 30 characters'
    ]
  }),
  computed: {
    emailConfirmRules () {
      return [
        () => (this.email === this.emailConfirm) || 'E-mail fields must match',
        v => !!v || 'Confirmation E-mail is required'
      ]
    },
    passwordConfirmRules () {
      return [
        () => (this.password === this.passwordConfirm) || 'Password fields must match',
        v => !!v || 'Confrimation password is required'
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.register()
      }
    },
    async register () {
      this.loading = true
      await this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        displayName: this.displayName
      })
      this.loading = false
    }
  }
}
</script>
