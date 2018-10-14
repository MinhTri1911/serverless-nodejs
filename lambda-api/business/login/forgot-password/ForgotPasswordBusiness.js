/**
 * File ForgotPasswordBussiness.js
 * Check email and phone then send URL to user
 *
 * @class ForgotPasswordBussiness
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import jwt from "jsonwebtoken";
import _ from 'lodash';
import Timeout from "../../../config/Timeout";
import { Helper } from '..../../../common/Helper';

const JWT_EXPIRATION_TIME = Timeout.JWT_EXPIRATION_TIME;
const URL= process.env.URL_CLIENT;
const URL_RESET_PASSWORD = '/login/setting-password/';
class ForgotPasswordBusiness {
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
   * Function check email and phone of client
   *
   * @param {*} data
   * @param {*}
   * @returns {result query}
   */
  checkEmailAndPhone(data) {
    let { email, phone, client_id } = data;
    return new Promise((resolve, reject) => {
      let sql = `
        select
          member_id
        from
          m_member
        where
          client_id = $clientid
          and LOWER(mail_address) = LOWER($email)
          and (
        replace (tel_no, '-', '') = replace ($phone, '-', '')
        or replace (mobile_no, '-', '') = replace ($phone, '-', '')
        )`;
      this.db.query(sql, { bind: { clientid: client_id, phone: phone, email: email }, type: this.db.QueryTypes.SELECT })
        .then(result => {

          // Successful we create a key and send it to client
          if (result!='') {
            let sql = `
              update m_member
              set
                password_ninsyou_key = $ninsyoukey
                ,password_reset_dtime = now()
              where
                client_id = $clientid
                and member_id = $memberid`;
            let token = jwt.sign({
              "memberid": result[0].member_id,
              "email": email },
              process.env.JWT_SECRET,
              { expiresIn: JWT_EXPIRATION_TIME });
            this.db.query(sql, { bind: {
              clientid: client_id,
              ninsyoukey: token,
              memberid: result[0].member_id },
              type: this.db.QueryTypes.UPDATE })
                .then(result => {
                  let url = URL + client_id + URL_RESET_PASSWORD + token;

                  // Send key to client
                  let helper = new Helper();
                  let html = 'Please click <a href=' + url + '>here</a> to reset your password';
                  return helper.sendEmail('ducvn@rikkeisoft.com', email, 'Reset your password', '', html)
                    .catch(err => {
                    console.log(err);
                    reject(new Error(`Something Went Wrong ${err}`));
                    });
                })
				        .catch(err => {
                  console.log(err);
                  reject(new Error(`Something Went Wrong ${err}`));
                });
          }

        resolve(result);
        })
        .catch(err => {
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
	}
}

export { ForgotPasswordBusiness }
