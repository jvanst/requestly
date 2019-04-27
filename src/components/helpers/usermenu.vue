<template>
  <v-menu :close-on-content-click="false" offset-y left :min-width="300">
    <v-avatar slot="activator" size="34">
      <v-img v-if="user.data.photoURL" :src="user.data.photoURL" />
      <v-icon v-else>mdi-account-circle</v-icon>
    </v-avatar>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="user.data.photoURL" :src="user.data.photoURL" />
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> {{ user.data.displayName }}</v-list-item-title>
            <v-list-item-subtitle> {{ user.data.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item @click.native="setDark(!dark)">
          <v-list-item-action>
            <v-switch :value="dark"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-card-actions>
        <v-btn text disabled> Account </v-btn>
        <v-spacer />
        <v-btn text @click.native="logout()"> Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    dark: false
  }),
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    setDark (value) {
      this.dark = value
    },
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.go('/login')
    }
  }
}
</script>
