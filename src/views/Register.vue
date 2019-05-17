<template>
  <v-container fill-height>
    <v-layout wrap align-center justify-center style="max-width:500px;margin:auto">
      <v-flex xs12>
        <v-card class="pa-3">
          <v-card-title class="mb-2 text-xs-center">
            <span class="headline">Register</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <v-form>
                  <v-text-field
                    label="Email"
                    type="email"
                    name="email"
                    v-model="email"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Confirm Email"
                    type="email"
                    name="email"
                    v-model="email"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    v-model="password"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Confirm Password"
                    type="password"
                    name="password"
                    v-model="password"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Display Name"
                    type="text"
                    name="display name"
                    v-model="displayName"
                    :disabled="loading"
                    outlined
                  ></v-text-field>
                  <v-btn
                    block
                    dark
                    color="primary"
                    @click.native="register()"
                    :loading="loading"
                  >Register</v-btn>
                </v-form>
              </v-flex>
              <v-flex xs12 class="text-xs-center pt-4">
                <router-link
                  to="/login"
                  :class="{ 'black--text': !dark, 'white--text': dark }"
                  >Back to login</router-link>
              </v-flex>
            </v-layout>
          </v-card-text>
          <!-- <v-card-actions>
            <router-link
              to="/login"
              :class="{ 'black--text': !dark, 'white--text': dark }"
              >Back to login</router-link
            >
            <v-spacer/>
            <v-btn
              block
              dark
              color="primary"
              class="secondary"
              @click.native="register()"
              :loading="loading"
            >Register</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthAPI from '@/api/Auth'

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    displayName: '',
    loading: false
  }),
  methods: {
    async register () {
      this.loading = true
      await AuthAPI.register(this.email, this.password, this.displayName)
      this.$router.replace('/')
      this.loading = false
    }
  }
}
</script>
