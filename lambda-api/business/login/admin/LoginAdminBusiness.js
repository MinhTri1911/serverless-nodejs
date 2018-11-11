/**
 * File LoginBusiness.js
 * Check email and password to Login
 *
 * @class LoginBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { Helper } from "../../../common/Helper";
import crypto from "crypto";

const secretKey = process.env.SECRET_KEY;
class LoginAdminBusiness {
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
   * Function will get data client by email and password and update table h_login
   *
   * @param {*} data
   * @param {*} ip
   * @returns {result query}
   */
  getAdminByEmail(data, clientIp) {
    let { account_id, password, client_id } = data;
    let ip = clientIp;
    password = crypto
      .createHash("sha256")
      .update(secretKey + password)
      .digest("hex");
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql("SQL047.sql");
      this.db
        .query(sql, {
          bind: {
            client_id: client_id,
            account_id: account_id,
            account_password: password
          },
          type: this.db.QueryTypes.SELECT
        })
        .then(result => {
          // Select successful we insert to h_login
          if (result != "") {
            let sqlInsert = this.helper.loadSql("SQL022.sql");
            this.db
              .query(sqlInsert, {
                bind: {
                  result_kb: "1",
                  login_kb: "1",
                  client_id: client_id,
                  account_id: account_id,
                  ip_address: ip
                },
                type: this.db.QueryTypes.INSERT
              })
              .catch(function(err) {
                console.error(err);
                reject(new Error(`Something Went Wrong ${err}`));
              });
          }

          // Select fail we insert to h_login
          if (result == "") {
            let sqlInsert = this.helper.loadSql("SQL022.sql");
            this.db
              .query(sqlInsert, {
                bind: {
                  result_kb: "2",
                  login_kb: "1",
                  client_id: client_id,
                  account_id: account_id,
                  ip_address: ip
                },
                type: this.db.QueryTypes.INSERT
              })
              .catch(function(err) {
                console.error(err);
                reject(new Error(`Something Went Wrong ${err}`));
              });
          }

          resolve(result);
        })
        .catch(err => {
          console.error(err);
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
  }
}

export { LoginAdminBusiness };
