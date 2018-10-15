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
    console.log(args);
    // Call api check exists member code
    return get(constant.api.CHECK_EXISTS_MEMBER_CODE, {
      clientId: clientId,
      code: value,
      memberNm: memberNm,
      memberKn: memberKn,
      mobileNo: mobileNo,
      telNo: telNo
    }).then(res => {
        let data = res.data.data.existsCode;
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
