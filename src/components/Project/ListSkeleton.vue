<template>
  <v-list>
    <template v-for="(n, index) in 5">
      <v-list-item :key="'list-item' + index">
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-card
              :color="$store.state.app.dark ? 'grey darken-2' : 'grey lighten-4'"
              width="100%"
              height="20px"
              flat
            />
          </v-list-item-subtitle>
          <v-list-item-title>
            <v-card
              :color="$store.state.app.dark ? 'grey darken-2' : 'grey lighten-4'"
              width="50%"
              height="20px"
              flat
            />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="'list-divider' + index"/>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'ListSkeleton'
}
</script>
