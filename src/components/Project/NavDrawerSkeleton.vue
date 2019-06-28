<template>
  <div>
    <v-card color="primary" height="36px" width="163px" class="ma-3" flat/>
    <v-list
        dense
        nav
        shaped
      >
      <template v-for="n in 2">
        <v-list-item :key="n">
          <v-list-item-content>
            <v-list-item-title>
              <v-card
                width="100%"
                height="40px"
                flat
                :color="$store.state.app.dark ? 'grey darken-2' : 'grey lighten-4'"
              />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'NavDawerSkeleton'
}
</script>
