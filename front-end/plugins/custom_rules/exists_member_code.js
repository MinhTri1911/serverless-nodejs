/**
 * File exists_member_code.js
 * Check membercode is exists in database
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-05
 */

import { get } from '../../plugins/api';
import constant from '../../constant';

const EXISTS = 1;

export default {
  getMessage(field, args) {
    return '';
  },
  validate(value, args) {
    let [clientId, memberNm, memberKn, mobileNo, telNo] = args;

    // Call api check exists member code
    return get(constant.api.CHECK_EXISTS_MEMBER_CODE, {
      client_id: clientId,
      code: value,
      member_nm: memberNm,
      member_kn: memberKn,
      mobile_no: mobileNo,
      tel_no: telNo
    }).then(res => {
        let data = res.data.data.exists_code;
        let isValid = data.macth_flg == EXISTS || Object.keys(data).length !== 0;

        if (isValid) {
          localStorage.setItem('member_inf', JSON.stringify(data));
        }

        return isValid;
      })
      .catch(err => {
        return false;
      });
  }
}
