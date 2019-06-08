import store from '@/store/store'

const isIosOnBrowser =
  ['iPhone', 'iPad', 'iPod'].includes(navigator.platform) &&
  !window.navigator.standalone

if (isIosOnBrowser) {
  const now = Date.now()
  let limitDate = null
  const addToHomeIosPromptLastDate = localStorage.getItem(
    'addToHomeIosPromptLastDate'
  )

  if (addToHomeIosPromptLastDate != null) {
    limitDate = new Date(parseInt(addToHomeIosPromptLastDate))
    limitDate.setMonth(limitDate.getMonth() + 1)
  }

  if (limitDate != null || now >= limitDate.getTime()) {
    store.commit('SHOW_APPLE_INSTALL_PROMPT', true)
  }
}
