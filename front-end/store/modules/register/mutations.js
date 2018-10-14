/**
 * File mutations.js
 * Handler update state in register
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-08
 */

import * as types from './mutation-type';

export default {
  [types.SET_MODEL](state, data) {
    state.model = data;
  },

  [types.REMOVE_MODEL](state) {
    state.model = '';
  },

  [types.UPDATE_FLAG_STEP_ONE](state, data) {
    state.validStepOne = data;
  }
}
