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
import { Helper } from '../../../common/Helper';

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
	  this.helper = new Helper();
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
      let sql = this.helper.loadSql('SQL015.sql');
      this.db.query(sql, {bind: { clientId: clientId, newPassword: password, key: key }, type: this.db.QueryTypes.UPDATE })
        .spread((results, metadata) =>{
          if (metadata) {
            let decodeToken = jwt.verify(key, process.env.JWT_SECRET);
            var myJSONObject = {
              "received": decodeToken.email,
              "subject": "complete setting password",
              "content": 'successfull'
            };
		        resolve(myJSONObject);
		      } else {
            resolve(metadata);
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
      let sql = this.helper.loadSql('SQL024.sql');
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
