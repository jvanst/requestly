<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ on }">
      <v-avatar v-on="on" :size="size">
        <v-img v-if="user.photoURL" :src="user.photoURL" />
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-avatar>
    </template>
    <v-list class="pb-0">
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar :size="36">
            <v-img v-if="user.photoURL" :src="user.photoURL" />
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
    </v-list>
    <v-list>
      <v-list-item @click.native="dark = !dark">
        <v-list-item-avatar>
          <v-switch
            v-model="dark"
            disabled
          ></v-switch>
        </v-list-item-avatar>
        <v-list-item-title>Dark Mode</v-list-item-title>
      </v-list-item>
      <v-list-item @click.native="logout()">
        <v-list-item-avatar>
          <v-avatar :size="36">
            <v-icon>mdi-logout</v-icon>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppBarUserMenuMobileSheet',
  data: () => ({
    sheet: false
  }),
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
        return this.$store.state.app.dark
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
