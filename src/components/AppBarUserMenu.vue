<template>
  <v-menu
    :close-on-content-click="false"
    offset-y left
    :min-width="250"
    >
    <template v-slot:activator="{ on }">
      <v-avatar v-on="on" :size="size">
        <v-img v-if="user.photoURL" :src="user.photoURL" />
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-avatar>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="dark"
            ></v-switch>
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
  props: {
    size: {
      type: Number,
      default: 32
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    dark: {
      get () {
        return this.$store.state.ui.dark
      },
      set (value) {
        this.$store.commit('SET_DARK', value)
      }
    }
  },
  methods: {
    async logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/')
    }
  }
}
</script>
