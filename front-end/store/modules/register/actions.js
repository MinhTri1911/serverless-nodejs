/**
 * File actions.js
 * Handler action call mutations in register
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-08
 */

import * as types from './mutation-type';

export const setModel = ({ commit }, data) => {
  commit(types.SET_MODEL, data);
}

export const removeModel = ({ commit }) => {
  commit(types.REMOVE_MODEL);
}

export const updateStepOne = ({ commit }, data) => {
  commit(types.UPDATE_FLAG_STEP_ONE, data);
}

export const updateStepTwo = ({ commit }, data) => {
  commit(types.UPDATE_FLAG_STEP_TWO, data);
}

export default {
  setModel,
  removeModel,
  updateStepOne,
  updateStepTwo
}
