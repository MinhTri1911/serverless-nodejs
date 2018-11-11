/**
 * File LoginBusiness.js
 * Check email and password to Login
 *
 * @class LoginBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { Helper } from "../../common/Helper";
import crypto from "crypto";

const secretKey = process.env.SECRET_KEY;
class LoginBusiness {
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
   * Function will get data client by email and password update table h_login
   *
   * @param {*} data
   * @param {*} ip
   * @returns {result query}
   */
  getUserByEmail(data, client_ip) {
    let { mail, password, client_id, web_permission_kb } = data;
    let ip = client_ip;
    let result_kb = "";
    let login_kb = "";
    let member_id = "";
    password = crypto
      .createHash("sha256")
      .update(secretKey + password)
      .digest("hex");
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql("SQL012.sql");
      this.db
        .query(sql, {
          bind: {
            client_id: client_id,
            mail_address: mail,
            member_pass: password
          },
          type: this.db.QueryTypes.SELECT
        })
        .then(result => {
          //Check web_permission_kb for mode Admin
          if (result != "" && web_permission_kb == "1") {
            if (result[0].web_permission_kb != "1") {
              result_kb = "2";
              login_kb = "1";
              member_id = result[0].member_id;
              result = "";
            }
          }

          if (
            result != "" &&
            result[0].black_cd != "1" &&
            result[0].web_permission_kb == "1"
          ) {
            result_kb = "1";
            login_kb = "1";
            member_id = result[0].member_id;
          }

          if (result != "" && result[0].black_cd == "1") {
            result_kb = "2";
            login_kb = "1";
            member_id = result[0].member_id;
            result = "";
          }

          if (result == "") {
            result_kb = "2";
            login_kb = "1";
            result = "";
          }
          let sqlInsert = this.helper.loadSql("SQL023.sql");
          this.db
            .query(sqlInsert, {
              bind: {
                result_kb: result_kb,
                login_kb: login_kb,
                client_id: client_id,
                member_id: member_id,
                ip_address: ip
              },
              type: this.db.QueryTypes.INSERT
            })
            .catch(function(err) {
              console.error(err);
              reject(new Error(`Something Went Wrong ${err}`));
            });
          resolve(result);
        })
        .catch(err => {
          console.error(err);
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
  }

  /**
   * Function to check data user by token
   *
   * @param {token} data
   * @returns {result query} result
   */
  getUserByToken(data) {
    let { client_id, member_pass, mail_address } = data;
    let { account_id, account_password, web_permission_kb } = data;
    console.log(data);
    return new Promise((resolve, reject) => {
      // Check token Admin
      if (web_permission_kb) {
        let sql = this.helper.loadSql("SQLCheckTokenAdmin.sql");
        this.db
          .query(sql, {
            bind: {
              client_id: client_id,
              account_id: account_id,
              account_password: account_password
            },
            type: this.db.QueryTypes.SELECT
          })
          .then(resultAdmin => {
            if (resultAdmin) {
              resolve(resultAdmin);
            } else {
              resultAdmin = "";
              resolve({ resultAdmin });
            }
          })
          .catch(err => {
            resultAdmin = "";
            resolve({ resultAdmin });
          });

        // Check token user normal
      } else {
        let sql = this.helper.loadSql("SQLCheckToken.sql");
        this.db
          .query(sql, {
            bind: {
              client_id: client_id,
              mail_address: mail_address,
              password: member_pass
            },
            type: this.db.QueryTypes.SELECT
          })
          .then(result => {
            if (result) {
              resolve(result);
            } else {
              result = "";
              resolve(result);
            }
          })
          .catch(err => {
            let result = "";
            resolve(result);
          });
      }
    });
  }
}

export { LoginBusiness };
