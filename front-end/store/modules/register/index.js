/**
 * File index.js
 * Define all store in register
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-08
 */

import actions from './actions';
import mutations from './mutations';
import state from './state';

export default {
  namespaced: true,
  actions,
  mutations,
  state,
}
