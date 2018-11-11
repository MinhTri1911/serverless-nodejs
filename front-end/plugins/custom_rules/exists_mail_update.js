/**
 * File exists_mail_update.js
 * Check mail is exists in database when update
 *
 * @author Rikkei.TriHNM
 * @date 2018-11-05
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
    return get(constant.api.CHECK_EXISTS_MAIL_UPDATE, { client_id: clientId, member_id: memberId, mail_address: value })
      .then(res => {
        let data = res.data.data.exists_mail;

        return data.kbn == NOT_EXISTS;
      })
      .catch(err => {
        return false;
      });
  }
}
