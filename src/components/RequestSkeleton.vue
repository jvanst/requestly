<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout wrap>
        <v-flex xs12 class="headline pb-0">
          <v-card width="150px" height="35px" flat/>
        </v-flex>
        <v-flex shrink class="body-2">
          <v-card width="80px" height="35px" flat/>
        </v-flex>
        <v-flex class="body-2">
          <v-card width="250px" height="35px" flat/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="pr-2">
      <v-divider/>
    </v-flex>
    <v-flex xs9>
      <v-layout>
        <v-flex shrink>
           <request-author-skeleton/>
        </v-flex>
        <v-flex>
          <v-card width="100%" height="300px" flat/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs3>
      <v-layout row wrap>
        <template v-for="(n, index) in 3">
          <v-flex xs12 :key="'flex1'+index">
            <div class="pl-2">
              <v-card width="80px" height="30px" class="mb-2" flat/>
              <v-card width="100%" height="35px" flat/>
            </div>
          </v-flex>
          <v-flex :key="'flex2'+index">
            <v-divider/>
          </v-flex>
        </template>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'RequestSkeleton',
  components: {
    RequestAuthorSkeleton: () => import('@/components/RequestAuthorSkeleton')
  }
}
</script>
