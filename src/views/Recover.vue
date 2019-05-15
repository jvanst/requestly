<template>
  <v-container fill-height>
    <v-layout
      wrap
      align-center
      justify-center
      style="max-width:500px;margin:auto"
    >
      <v-flex>
        <v-card class="pa-3">
          <v-card-title class="mb-2 text-xs-center">
            <span class="headlines">Recover</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Email"
                  type="email"
                  name="email"
                  v-model="email"
                  :disabled="loading"
                  @keyup.enter="recover(email)"
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex class="pt-3 pl-2">
                <router-link
                  to="/login"
                  :class="{ 'black--text': !dark, 'white--text': dark }"
                  >Back to login</router-link
                >
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn
                  class="secondary"
                  :loading="loading"
                  @click.native="recover(email)"
                  >Recover</v-btn
                >
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
  name: 'Recover',
  data: () => ({
    loading: false,
    email: '',
    dark: false
  }),
  methods: {
    async recover (email) {
      this.loading = true
      await this.$store.dispatch('recover', email)
      this.$router.replace('/login')
      this.loading = false
    }
  }
}
</script>
