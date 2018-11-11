import types from "./mutation-type"
export default {
  [types.UPDATE_ERROR](state, error) {
    if (error) {
      state.hasError = true;
      state.statusCode = error.statusCode || null;
      state.message = error.message || null;
    }
  },
  [types.RESET_ERROR] (state) {
    state.statusCode = null;
    state.message = null;
    state.hasError = false;
  }
}
