import types from './mutation-type'

export default {
  setClientInfo({commit}, client){
    if (client) {
      commit(types.CLIENT_SET, client);
    }
  },
  clearClientInfo({commit}) {
    commit(types.CLIENT_CLEAR);
  },
}
