/**
 * File exists_order.js
 * Check order exists in database when update
 *
 * @author Rikkei.TriHNM
 * @date 2018-11-06
 */

import { get } from '../../plugins/api';
import constant from '../../constant';

const NOT_EXISTS = 0;

export default {
  getMessage(field, args) {
    return '';
  },
  validate(value, args) {
    let [clientId, memberId] = args;

    // Call api check exists mail
    return get(constant.api.CHECK_EXISTS_ORDER, { client_id: clientId, member_id: memberId })
      .then(res => {
        // let data = res.data.data.exists_login_id;

        // return data.dup_flg == NOT_EXISTS;
        return false;
      })
      .catch(err => {
        return false;
      });
  }
}
