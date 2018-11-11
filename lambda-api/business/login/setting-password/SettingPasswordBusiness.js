/**
 * File SettingPasswordBusiness.js
 * Setting new password to user
 *
 * @class SettingPasswordBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import crypto from "crypto";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { Helper } from "../../../common/Helper";
import config from "../../../config/Constant";

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
    let { key, password, client_id } = data;
    let memberIdInsert = null;
    let sendNm = null;
    let sendAddress = null;
    let mailTitle = null;
    let mailContents = null;
    let contentSendMail = null;
    password = crypto
      .createHash("sha256")
      .update(secretKey + password)
      .digest("hex");
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql("SQL015.sql");
      this.db.query(sql, {
        bind: { client_id: client_id, newPassword: password, key: key },
        type: this.db.QueryTypes.UPDATE
      }).spread((results, metadata) => {
        if (metadata) {
          let decodeToken = jwt.verify(key, process.env.JWT_SECRET);
          var myJSONObject = {
            received: decodeToken.email,
            subject: "complete setting password",
            content: "successfull"
          };

          return this.helper.setApiKey(this.db)
            .then(data => {
              // Load content mail from database
              let sqlLoadContentTemplate = this.helper.loadSql("SQL101.sql");
              return this.db.query(sqlLoadContentTemplate, {
                bind: {
                  client_id: client_id,
                  template_type_cd: config.CodeTemplate.COMPLETE_SETTING_PASSWORD
                },
                type: this.db.QueryTypes.SELECT
              }).then(record => {
                return record[0];
              });
            }).then(data => {
              // Get infmation send name, send address
              contentSendMail = data;
              let sql060 = this.helper.loadSql("SQL060.sql");

              return this.db.query(sql060, {
                bind: { client_id: client_id },
                type: this.db.QueryTypes.SELECT
              }).then(record => {
                contentSendMail.send_nm = record[0].send_nm;
                contentSendMail.send_mail_address =
                record[0].send_mail_address;
                sendNm = record[0].send_nm;
                sendAddress = record[0].send_mail_address;
                mailTitle = contentSendMail.mail_title;

                return contentSendMail;
              });
            }).then(data => {
              let now = new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, '');
              let time = new Date().getHours() + ':' + new Date().getMinutes();

              // Bind data to template mail
              return this.helper.loadTemplate("CompleteSettingPassword", {
                contents: this.helper.replaceTextToEndLine(data.mail_contents),
                signature: this.helper.replaceTextToEndLine(data.signature),
                mail: decodeToken.email,
                year: now.slice(0, 4),
                month: now.slice(4, 6),
                day: now.slice(6, 8),
                time: time
              });
            }).then(html => {
              // Send mail to register
              mailContents = html;
              let name = contentSendMail.send_nm;

              return this.helper.sendMailByApiV3(
                contentSendMail.send_mail_address,
                [decodeToken.email],
                contentSendMail.mail_title,
                "",
                html,
                name
              );
            }).then(responseSendMail => {
              return this.helper.getBounce(decodeToken.email)
                .then(bounce => {
                  return this.setBounce(bounce, responseSendMail.response);
                });
            }).then(data => {
              let sendResult = data;

              let sql106 = this.helper.loadSql("SQL106.sql");
              return this.db.query(sql106, {
                bind: {
                  client_id: client_id,
                  member_id: decodeToken.member_id
                },
                type: this.db.QueryTypes.SELECT
              }).then(result106 => {
                // Insert result after send mail success
                let sqlResultSendMail = this.helper.loadSql("SQL102.sql");
                return this.db.query(sqlResultSendMail, {
                  bind: {
                    client_id: client_id,
                    template_type_cd: config.CodeTemplate.COMPLETE_SETTING_PASSWORD,
                    from_nm: sendNm,
                    from_mail_address: sendAddress,
                    to_nm: result106[0].member_nm,
                    to_mail_address: result106[0].mail_address,
                    mail_title: mailTitle,
                    mail_contents: mailContents,
                    member_id: decodeToken.member_id,
                    send_result: sendResult.send_result,
                    send_bounce: sendResult.send_bounce,
                    send_code: sendResult.send_code,
                    ins_pg_id: process.env.INS_PG_ID,
                    ins_client_id: client_id,
                    ins_employee_cd: process.env.INS_EMPLOYEE_CD,
                    upd_pg_id: process.env.UPD_PG_ID,
                    upd_client_id: client_id,
                    upd_employee_cd: process.env.UPD_EMPLOYEE_CD
                  },
                  type: this.db.QueryTypes.INSERT
                });
            })
            .then(data => {
              // Commit transaction
              resolve(myJSONObject);
            })
            .catch(err => {
              // Rollback transaction
              reject(
                new Error(`Error function settinhPasswordBusiness: ${err}`)
              );
            })
            }).catch(err => {
              reject(new Error(`Something Went Wrong ${err}`));
            });
        } else {
          resolve(metadata);
        }
      }).catch(err => {
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
    let { key, client_id } = data;

    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql("SQL024.sql");

      this.db.query(sql, {
        bind: { client_id: client_id, key: key },
        type: this.db.QueryTypes.SELECT
      }).then(results => {
        resolve(results);
      }).catch(err => {
        console.error(err);

        reject(new Error(`Something Went Wrong ${err}`));
      });
    });
  }

  /**
   * Function setting send result after send mail
   *
   * @param {Boolean} status
   * @param {Integer} code
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  setBounce(status, code) {
    if (status) {
      return {
        send_result: config.MailResult.SEND_RESULT_FAIL,
        send_bounce: config.MailResult.SEND_BOUNCE_SUCCESS,
        send_code: ''
      }
    }

    if (code == config.MailResult.CODE_ACCEPT) {
      return {
        send_result: config.MailResult.SEND_BOUNCE_SUCCESS,
        send_bounce: config.MailResult.SEND_BOUNCE_FAIL,
        send_code: config.MailResult.CODE_ACCEPT,
      }
    }

    return {
      send_result: config.MailResult.SEND_RESULT_FAIL,
      send_bounce: config.MailResult.SEND_BOUNCE_FAIL,
      send_code: code
    }
  }
}

export { SettingPasswordBusiness };
