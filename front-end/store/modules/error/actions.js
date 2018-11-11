import types from './mutation-type'

export default {
  setError({commit}, error){
    if (error) {
      commit(types.UPDATE_ERROR, error);
    }
  },
  resetError({commit, state}) {
    commit(types.RESET_ERROR);
  },
}
