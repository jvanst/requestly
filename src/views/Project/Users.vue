<template>
  <v-container
    :class="{ 'px-0' : $vuetify.breakpoint.smAndDown }"
  >
    <v-subheader v-if="!$vuetify.breakpoint.smAndDown">
      Users
    </v-subheader>
    <list-skeleton v-if="loadingPermissions"/>
    <v-list v-else>
      <template v-for="user in users">
        <v-list-item
          :href="$route.hash"
          @click.native="selectedUser = user; $refs.userManage.dialog = true;"
          :key="'list-item' + user.id">
          <v-list-item-avatar>
            <v-avatar size="36">
              <v-img :src="userById(user.id).photoURL"/>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ userById(user.id).email }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.role | capitalizeFirstLetter }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="'list-divider' + user.id"/>
      </template>
    </v-list>

    <v-subheader>
      Invited Users
    </v-subheader>
    <list-skeleton v-if="loadingInvites"/>
    <v-list v-else-if="invites.length">
      <template v-for="user in invites">
        <v-list-item
          :href="$route.hash"
          @click.native="selectedInvite = user; $refs.cancelInvite.dialog = true;"
          :key="'list-item' + user.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ user.email }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.role | capitalizeFirstLetter }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="'list-divider' + user.id"/>
      </template>
    </v-list>
    <v-list v-else>
      <v-subheader>
        No outstanding invitations.
      </v-subheader>
    </v-list>

    <v-fab-transition>
      <user-invite/>
    </v-fab-transition>
    <user-invite-cancel ref="cancelInvite" :invite="selectedInvite"/>
    <user-manage ref="userManage" :user="selectedUser"/>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  components: {
    ListSkeleton: () => import('@/components/Project/ListSkeleton'),
    UserManage: () => import('@/components/Project/UserManage'),
    UserInvite: () => import('@/components/Project/UserInvite'),
    UserInviteCancel: () => import('@/components/Project/UserInviteCancel')
  },
  data: () => ({
    loadingInvites: false,
    loadingPermissions: false,
    loadingUser: false,
    selectedUser: undefined,
    selectedInvite: undefined
  }),
  created () {
    this.fetchInvites()
    this.fetchPermissions()
  },
  computed: {
    activeProject () {
      return this.$store.state.projects.activeId
    },
    users () {
      return this.$store.state.permissions.data
    },
    invites () {
      return this.$store.state.invites.data
    }
  },
  methods: {
    userById (id) {
      if (this.$store.getters['users/getById'](id)) {
        return this.$store.getters['users/getById'](id)
      }
      return { email: '', photoURL: '' }
    },
    async fetchInvites () {
      this.loadingInvites = true
      await this.$store.dispatch('invites/fetch', this.$store.state.projects.activeId)
      this.loadingInvites = false
    },
    async fetchPermissions () {
      this.loadingPermissions = true
      await this.$store.dispatch('permissions/fetch', this.$store.state.projects.activeId)
      this.$store.state.permissions.data.forEach((perm) => {
        this.$store.dispatch('users/fetchById', perm.id)
      })
      this.loadingPermissions = false
    }
  }
}
</script>
