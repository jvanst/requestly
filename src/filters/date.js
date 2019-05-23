import Vue from 'vue'

Vue.filter('formatSeconds', seconds => {
  const now = Math.trunc((new Date()).getTime() / 1000)
  const secondsAgo = now - seconds

  switch (true) {
    case secondsAgo < 60:
      return `${secondsAgo} seconds ago`
    case secondsAgo < 3600:
      return `${Math.trunc(secondsAgo / 60)} minutes ago`
    case secondsAgo < 86400:
      return `${Math.trunc(secondsAgo / 60 / 60)} hours ago`
    case secondsAgo < 2592000:
      return `${Math.trunc(secondsAgo / 60 / 60 / 24)} days ago`
    default:
      return 'invalid'
  }
})
