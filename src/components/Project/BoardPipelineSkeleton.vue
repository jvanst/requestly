<template>
  <v-container fill-height fluid class="pa-0">
    <v-layout
      row
      justify-start
      align-start
      fill-height
      ma-1
    >
      <v-flex
        v-for="(n, i) in 4"
        :key="'flex-'+i"
        grow
        pa-1
        fill-height
        style="max-width:300px"
      >
        <v-sheet
          :color="$store.state.ui.dark ? 'grey darken-4' : 'grey lighten-4'"
          elevation="1"
          height="100%"
        >
          <v-list dense class="transparent pipeline-header">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>
                  <v-card width="100px" height="20px" flat/>
                </v-list-item-subtitle>
                <v-list-item-title>
                  <v-card width="130px" height="20px" flat/>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon small disabled>mdi-dots-vertical</v-icon>
              </v-list-item-action>
            </v-list-item>
             <v-divider/>
          </v-list>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'BoardPipelineSkeleton'
}
</script>
