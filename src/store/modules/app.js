const state = {
  // Theme
  dark: JSON.parse(localStorage.getItem('dark')),

  // Apple Install Prompt
  showAppleInstallPrompt: false,

  // Service worker
  newContentAvailable: null,
  refreshingApp: false,
  updateDismissed: false
}

const actions = {
  closeAddToHomeScreenModalForApple: async ({ commit }) => {
    localStorage.setItem('addToHomeIosPromptLastDate', Date.now())
    commit('SHOW_APPLE_INSTALL_PROMPT', false)
  },

  /**
   * Trigger service worker skipWating so the new service worker can take over.
   * This will also trigger a window refresh (see /src/misc/register-service-worker.js)
   */
  serviceWorkerSkipWaiting ({ state, commit }) {
    if (state.newContentAvailable == null) return

    commit('SET_REFRESHING_APP', true)
    state.newContentAvailable.waiting.postMessage('skipWaiting')
  }
}

const mutations = {
  SET_DARK (state, value) {
    state.dark = value
    localStorage.setItem('dark', value)
  },
  SHOW_APPLE_INSTALL_PROMPT (state, value) {
    state.showAppleInstallPrompt = value
  },
  SET_NEW_CONTENT_AVAILABLE (state, value) {
    state.newContentAvailable = value
  },
  SET_REFRESHING_APP (state, value) {
    state.refreshingApp = value
  },
  DISMISS_UPDATE (state, value) {
    state.updateDismissed = value
  }
}

export default {
  state,
  mutations,
  actions
}
