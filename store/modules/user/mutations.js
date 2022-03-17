import getDefaultState from "../../../src/api/get-default-state.js";
export default {
  setUser(state, user) {
    state.user = user;
  },
  saveToken(state, token) {
    state.token = token;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  isLoggedIn(state) {
    state.isLoggedIn = true;
  },
  logOut(state) {
    state.isLoggedIn = false;
    state.token = null;
    state.user = null;
  }
};
