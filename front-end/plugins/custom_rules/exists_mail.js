/**
 * File exists_mail.js
 * Check mail is exists in database
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-05
 */

import { get } from '../../plugins/api';
import constant from '../../constant';

const NOT_EXISTS = 0;

export default {
  getMessage(field, args) {
    return '';
  },
  validate(value, args) {
    let [clientId] = args;

    // Call api check exists mail
    return get(constant.api.CHECK_EXISTS_MAIL_REGISTER, { clientId: clientId, mail: value })
      .then(res => {
        let data = res.data.data.existsMail;

        return data.kbn == NOT_EXISTS;
      })
      .catch(err => {
        return false;
      });
  }
}
