import types from "./mutation-type"
export default {
  [types.CLIENT_SET](state, client) {
    if (client) {
      state.clientInfo = client;
    }
  },
  [types.CLIENT_CLEAR] (state) {
    state.clientInfo = null;
  }
}
