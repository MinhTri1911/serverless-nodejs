/**
 * File ForgotPasswordBussiness.js
 * Check email and phone then send URL to user
 *
 * @class ForgotPasswordBussiness
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import jwt from "jsonwebtoken";
import _ from "lodash";
import Timeout from "../../../config/Timeout";
import { Helper } from "../../../common/Helper";
import config from "../../../config/Constant";

const JWT_EXPIRATION_TIME = Timeout.JWT_EXPIRATION_TIME;
const URL = process.env.URL_CLIENT;
const URL_RESET_PASSWORD = "/login/setting-password/";

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
    let memberIdInsert = null;
    let sendNm = null;
    let sendAddress = null;
    let mailTitle = null;
    let mailContents = null;
    let contentSendMail = null;
    let nameFlg = null;

    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL013.sql');
      this.db.query(sql, {
        bind: { client_id: client_id, phone: phone, email: email },
        type: this.db.QueryTypes.SELECT
      }).then(result => {
        if (result.length) {
          let token = jwt.sign(
            {
              member_id: result[0].member_id,
              email: email
            },
            process.env.JWT_SECRET,
            {
              expiresIn: JWT_EXPIRATION_TIME
            }
          );
          let url = URL + client_id + URL_RESET_PASSWORD + token;
          let sqlUpdate = this.helper.loadSql('SQL014.sql');

          this.db.query(sqlUpdate, {
            bind: {
              client_id: client_id,
              ninsyoukey: token,
              member_id: result[0].member_id
            },
            type: this.db.QueryTypes.UPDATE
          }).then(data => {
            return this.helper.setApiKey(this.db)
              .then(data => {
                // Load content mail from database
                let sqlLoadContentTemplate = this.helper.loadSql('SQL101.sql');

                return this.db.query(sqlLoadContentTemplate, {
                  bind: {
                    client_id: client_id,
                    template_type_cd: config.CodeTemplate.RESET_PASSWORD
                  },
                  type: this.db.QueryTypes.SELECT
                }).then(record => {
                  nameFlg = record[0].name_flg;

                  return record[0];
                });
              }).then(data => {
                // Get infomation send name, send address
                contentSendMail = data;
                let sql060 = this.helper.loadSql('SQL060.sql');

                return this.db.query(sql060, {
                  bind: { client_id: client_id },
                  type: this.db.QueryTypes.SELECT
                }).then(record => {
                  contentSendMail.send_nm = record[0].send_nm;
                  contentSendMail.send_mail_address = record[0].send_mail_address;
                  sendNm = record[0].send_nm;
                  sendAddress = record[0].send_mail_address;
                  mailTitle = contentSendMail.mail_title;

                  return contentSendMail;
                });
              }).then(data => {
                // Bind data to template mail
                return this.helper.loadTemplate('ForgotPassword', {
                  url: url,
                  contents: this.helper.replaceTextToEndLine(data.mail_contents),
                  signature: this.helper.replaceTextToEndLine(data.signature),
                  mail: email
                });
              }).then(html => {
                // Send mail to alert forgot password
                mailContents = html;
                let name = contentSendMail.send_nm;

                return this.helper.sendMailByApiV3(
                  contentSendMail.send_mail_address,
                  [email],
                  contentSendMail.mail_title,
                  '',
                  html,
                  name
                );
              }).then(responseSendMail => {
                return this.helper.getBounce(email)
                  .then(bounce => {
                    return this.setBounce(bounce, responseSendMail.response);
                  });
              }).then(data => {
                let sendResult = data;

                let sql106 = this.helper.loadSql('SQL106.sql');
                return this.db
                  .query(sql106, {
                    bind: {
                      client_id: client_id,
                      member_id: result[0].member_id
                    },
                    type: this.db.QueryTypes.SELECT
                  }).then(result106 => {
                    // Insert result after send mail success
                    let sqlResultSendMail = this.helper.loadSql('SQL102.sql');

                    return this.db.query(sqlResultSendMail, {
                      bind: {
                        client_id: client_id,
                        template_type_cd: config.CodeTemplate.RESET_PASSWORD,
                        from_nm: sendNm,
                        from_mail_address: sendAddress,
                        to_nm: result106[0].member_nm,
                        to_mail_address: result106[0].mail_address,
                        mail_title: mailTitle,
                        mail_contents: mailContents,
                        member_id: result[0].member_id,
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
                    resolve(result);
                  }).catch(err => {
                    reject(new Error(`Error function forgotPasswordBusiness: ${err}`));
                  });
              });
          }).catch(err => {
            reject(new Error(`Something Went Wrong ${err}`));
          });
        }

        if (!result.length) {
          resolve(result);
        }
      }).catch(err => {
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

export { ForgotPasswordBusiness };
