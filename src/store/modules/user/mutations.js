const SET_USER = (state, value) => {
  state.data = value
}

const SET_LOGGEDIN = (state, value) => {
  state.isLoggedIn = value
}

export default {
  SET_USER,
  SET_LOGGEDIN
}
