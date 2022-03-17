import mutations from "./mutations";
import actions from "./actions";
// import getDefaultState from '../../../src/api/get-default-state';
import user from "./state";
export default {
  user,
  namespaced: true,
  mutations,
  actions
};
