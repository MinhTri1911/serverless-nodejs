/**
 * File exists_login_id.js
 * Check login id is exists in database when update
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
    return get(constant.api.CHECK_EXISTS_LOGIN_ID, { client_id: clientId, member_id: memberId, login_id: value })
      .then(res => {
        let data = res.data.data.exists_login_id;

        return data.dup_flg == NOT_EXISTS;
      })
      .catch(err => {
        return false;
      });
  }
}
