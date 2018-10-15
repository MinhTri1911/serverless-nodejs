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
import { Helper } from '../../../common/Helper';

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
    this.helper = new Helper();
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
      let sql = this.helper.loadSql('SQL013.sql');
        this.db.query(sql, { bind: { clientid: client_id, phone: phone, email: email }, type: this.db.QueryTypes.SELECT })
          .then(result => {
            if (result!='') {
              let token = jwt.sign({
                "member_id": result[0].member_id,
                "email": email },
                process.env.JWT_SECRET, {
                  expiresIn: JWT_EXPIRATION_TIME
                });
              let url = URL + client_id + URL_RESET_PASSWORD + token;
              let sqlUpdate = this.helper.loadSql('SQL014.sql');
              this.db.query(sqlUpdate, { bind: {
                clientid: client_id,
                ninsyoukey: token,
                member_id: result[0].member_id },
                type: this.db.QueryTypes.UPDATE })
              .then(data=>{
                resolve({"received": email, "url":url})
              })
              .catch(err => {
                reject(new Error(`Something Went Wrong ${err}`));
              });
            }
            if (result=='') {
              resolve(result);
            }
          })
          .catch(err => {
            reject(new Error(`Something Went Wrong ${err}`));
		      });
	  });
	}
}

export { ForgotPasswordBusiness }
