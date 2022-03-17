import userApi from "../../../src/api/user";

export default {
  addItem({ commit }, payload) {
    commit("modules/cart/addItem", { payload }, { root: true });
  },
  removeItem({ commit }, payload) {
    commit("modules/cart/removeCartItem", { payload }, { root: true });
  },
  updateQuant({ commit }, payload) {
    commit("modules/cart/updateQuant", { payload }, { root: true });
  },
  retrieveCart({ commit }, payload) {
    userApi.retrieveCart(payload.username).then(payload => {
      commit("modules/cart/retrieveCart", { payload }, { root: true });
    });
  }
};
