/**
 * File SettingPasswordBusiness.js
 * Setting new password to user
 *
 * @class SettingPasswordBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import crypto from 'crypto';
import jwt from "jsonwebtoken";
import _ from 'lodash';
import { Helper } from '..../../../common/Helper';

const secretKey = process.env.SECRET_KEY;

class SettingPasswordBusiness {
  /**
   * Constructor set instance sequelize
   *
   * @param {*} db
   * @returns { Object } - Returns the current object.
   */
  constructor(db) {
    this.db = db;
    return this;
	}

  /**
   * Function setting new password to client data
   *
   * @param {*} data
   * @param {*}
   * @returns {result query}
   */
  settingPassword(data) {
    let { key, password, clientId } = data;
	  password = crypto.createHash('sha256').update(secretKey + password).digest('hex');
    return new Promise((resolve, reject) => {
      let sql = `
        update m_member
        set
          member_pass = $newPassword
          , password_ninsyou_key = ''
          , password_reset_dtime = null
        where
          client_id = $clientId
          and password_ninsyou_key = $key`;
      this.db.query(sql, {bind: { clientId: clientId, newPassword: password, key: key }, type: this.db.QueryTypes.UPDATE })
        .spread((results, metadata) =>{
          resolve(metadata);
          if (metadata) {
          let decodeToken = jwt.verify(key, process.env.JWT_SECRET);
          var myJSONObject = {
          "received": decodeToken.email,
          "subject": "complete setting password",
          "content": 'successfull'
          };

          // Call API to send email to client
          let helper = new Helper();
          return helper.sendEmail('ducvn@rikkeisoft.com', myJSONObject.received, 'complete setting password', '', 'successfull')
            .catch(err => {
            console.log(err);
            reject(new Error(`Something Went Wrong ${err}`));
            });
          }
        })

        .catch(err => {
          console.error(err);
          reject(new Error(`Something Went Wrong ${err}`));
        });

    });
	}

  /**
   * Function check key reset password of client
   *
   * @param {*} data
   * @param {*}
   * @returns {result query}
   */
	checkKey(data) {
    let { key, clientId } = data;
	  return new Promise((resolve, reject) => {
      let sql = `
        select
        case
        when count(*) = 1
          then '1'
        else '0'
        end as valid_flg
        from
          m_member
        where
          client_id = $clientId
          and password_ninsyou_key = $key
          and now() between password_reset_dtime and password_reset_dtime + interval '1day'
          and admission_kb = '1'
          and (black_cd = '' or black_cd = '0')`;
      this.db.query(sql, { bind: { clientId: clientId, key: key }, type: this.db.QueryTypes.SELECT })
        .then(results =>{
          resolve(results);
        })
        .catch(err => {
          console.error(err);
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
  }
}

export { SettingPasswordBusiness }
