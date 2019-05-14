<template>
  <v-container fill-height>
    <v-layout wrap align-center justify-center style="max-width:500px;margin:auto">
      <v-flex xs12>
        <v-card flat>
          <v-card-title>
            <span class="headline">Register</span>
          </v-card-title>
          <v-form>
        <v-text-field
          label="Email"
          type="email"
          name="email"
          v-model="email"
          :disabled="loading"
        ></v-text-field>
        <v-text-field
          label="Confirm Email"
          type="email"
          name="email"
          v-model="email"
          :disabled="loading"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          name="password"
          v-model="password"
          :disabled="loading"
        ></v-text-field>
        <v-text-field
          label="Confirm Password"
          type="password"
          name="password"
          v-model="password"
          :disabled="loading"
        ></v-text-field>
        <v-text-field
          label="Display Name"
          type="text"
          name="display name"
          v-model="displayName"
          :disabled="loading"
        ></v-text-field>
        </v-form>
        <v-card-actions>
          <router-link
            to="/login"
            :class="{ 'black--text': !dark, 'white--text': dark }"
            >Back to login</router-link
          >
          <v-spacer/>
          <v-btn
            class="secondary"
            @click.native="register()"
            :loading="loading"
          >Register</v-btn>
        </v-card-actions>
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
    password: '',
    displayName: '',
    loading: false
  }),
  methods: {
    async register () {
      this.loading = true
      await this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        displayName: this.displayName
      })
      this.$router.replace('/')
      this.loading = false
    }
  }
}
</script>
