<template>
  <v-menu :close-on-content-click="false" offset-y left :min-width="250">
    <v-avatar slot="activator" size="34">
      <v-img v-if="user.data.photoURL" :src="user.data.photoURL" />
      <v-icon v-else>mdi-account-circle</v-icon>
    </v-avatar>
    <v-card>
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
        <v-spacer />
        <v-btn text @click.native="logout()"> Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppBarUserMenu',
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
