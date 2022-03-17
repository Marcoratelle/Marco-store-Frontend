import { storeActionCommit } from "~/utils/common-utils";

export default {
  setNewMessage({ commit }, message) {
    return storeActionCommit(
      commit("modules/messages/setNewMessage", message, { root: true })
    );
  }
};
