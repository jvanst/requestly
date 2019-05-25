<template>
  <div>
    <v-card-text class="pa-2">
      <v-textarea
        v-model="updatedComment"
        hide-details
        label="Edit Comment"
        filled
        :disabled="loading"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="$emit('edit', false)">
        Cancel
      </v-btn>
      <v-btn
        :loading="loading"
        class="primary"
        @click="update()"
      >
        Update
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: 'RequestTimelineCommentEdit',
  props: ['item'],
  data: () => ({
    updatedComment: '',
    loading: false
  }),
  created () {
    this.updatedComment = this.item.value
  },
  methods: {
    update () {
      this.loading = true
      this.$store.dispatch('timeline/put', {
        id: this.item.id,
        payload: {
          ...this.item,
          value: this.updatedComment,
          id: null
        }
      })
      this.loading = false
      this.$emit('edit', false)
    }
  }
}
</script>
