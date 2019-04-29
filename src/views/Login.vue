<template>
  <v-container fill-height>
    <v-layout wrap align-center justify-center style="max-width:500px;margin:auto">
      <v-flex xs12 class="text-xs-center">
        <v-layout wrap>
          <v-flex xs12>
            <v-form>
              <v-text-field
                light
                label="Email"
                type="email"
                name="email"
                color="black"
                v-model="email"
                :disabled="loading"
                @keyup.enter="login()"
              ></v-text-field>
              <v-text-field
                light
                label="Password"
                type="password"
                name="password"
                color="black"
                v-model="password"
                :disabled="loading"
                @keyup.enter="login()"
              ></v-text-field>
              <v-btn
                block
                dark
                color="secondary"
                @click.native="login()"
                :loading="loading"
              >
                Login
              </v-btn>
            </v-form>
          </v-flex>
          <v-flex xs12 class="pt-3 pb-3 mt-3 mb-2">
            <div style="height: 12px; border-bottom: 1px solid #212121; text-align: center">
              <span class="subheading grey lighten-5 grey--text text--darken-4 pr-3 pl-3">
                Sign in With
              </span>
            </div>
          </v-flex>
          <v-flex xs12 class="pr-1">
            <v-btn
              block
              dark
              color="red lighten-1"
              @click.native="google()"
            >
              <v-icon>mdi-google-plus</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 class="pt-4">
            <router-link to="/register" class="black--text pr-2">Need an Account?</router-link>
            <router-link to="/recover" class="black--text pl-2">Forgot your password?</router-link>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('user/login',
        {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.showSnackbar('Successfully logged in', 'success')
          this.$router.replace('/')
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    },
    google () {
      this.loading = true
      this.$store.dispatch('user/loginWithGoogle')
        .then(() => {
          this.showSnackbar('Successfully logged in', 'success')
          this.$router.replace('/')
        })
        .catch((error) => this.showSnackbar(error.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>
