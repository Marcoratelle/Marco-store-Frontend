import userApi from "../../../src/api/user";
import { storeActionCommit } from "../../../utils/common-utils";

export default {
  retrieveProducts(payload) {
    return userApi.retrieveProducts(payload).then(result => {
      return result;
    });
  },
  setDefaultUser({ commit }) {
    return storeActionCommit(commit, "resetState");
  },

  fetchUser({ commit }) {
    return userApi.fetchUsers().then(storeActionCommit(commit, "setUser"));
  },
  registerUser({ commit }, payload) {
    return userApi
      .registerUser(payload)
      .then(result => {
        commit("modules/messages/setMessage", result, { root: true });
      })
      .catch(error => {
        commit("modules/messages/setErrorMessage", error, { root: true });
      });
  },
  loginUser({ commit }, payload) {
    return userApi
      .loginUser(payload)
      .then(result => {
        commit("modules/user/saveToken", result.data.token, { root: true });
        commit("modules/user/setUser", result.data.user, { root: true });
        if (result.status == 200) {
          commit("modules/user/isLoggedIn", null, { root: true });
        }
        this.$router.push("/");
      })
      .catch(error => {
        commit("modules/messages/setErrorMessage", error, { root: true });
      });
  },
  logOut({ commit }) {
    commit("modules/user/logOut", null, { root: true });
    commit("modules/cart/logOut", null, { root: true });
  }
};
