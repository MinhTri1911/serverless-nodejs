/**
 * File EmailBussiness.js
 * Common function using
 *
 * @class EmailBussiness
 * @author Rikkei.DucVN
 * @date 2018-10-14
 */

import HttpCode from "../../../config/HttpCode";
import ServiceModel from "../../../models/ServiceModel";
import Constant  from "../../../config/Constant";

const ejs = require('ejs');
const path = require('path');
const fs = require('mz/fs');
const nodemailer = require('nodemailer/lib/nodemailer');

class EmailBussiness {
  /**
   * Creates an instance of Helper.
   *
   * @returns {void}
   * @memberof Helper
   */
  constructor() {}

  /**
   * Function send mail via stmp protocol
   *
   * @param {String} fromEmail
   * @param {Array|String} toEmails
   * @param {String} subject
   * @param {String} textContent
   * @param {String} htmlContent
   * @returns {boolean}
   * @memberof Helper
   */
  sendEmail(fromEmail, toEmails, subject, textContent, htmlContent) {
    return new Promise((resolve, reject) => {
	  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
        logger: false,
        debug: false
      }, {
        // Sender info
        from: fromEmail,
        headers: {
          "X-Requested-With": '*',
          "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
        }
      });

      // Message content
      let message = {
        from: fromEmail,
        to: toEmails,
        subject: subject,
        text: textContent,
        html: htmlContent
      };

      // Asynchronous function send mail
      transporter.sendMail(message, (error, info) => {
        if (error) {
          // Close connection
          transporter.close();
          reject(serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Incorrect Information!!!"));
        } else {
          // Close connection
          transporter.close();
          resolve(serviceModel.createSuccessCallback(HttpCode.SUCCESS,{ "result":"true" }));
        }
      });
    });
  }

  /**
   * Function load view
   *
   * @param {String} name
   * @param {Object} data
   * @param {String} pathView
   * @returns {String}
   * @memberof Helper
   */
  loadTemplate(name, data, pathView = 'templates') {
    return new Promise((reslove, reject) => {
      fs.readFile(path.resolve(process.cwd() + '/' + pathView, name + '.ejs'), 'utf8')
        .then(res => {
          reslove(ejs.render(res, data));
        })
        .catch(err => {
          reject(new Error(`Load file error: ${err}`));
        });
    });
  }

  /**
   * Function load file sql
   *
   * @param {string} sqlFile
   * @param {string} [pathFolder='sql']
   * @returns {string}
   * @memberof Helper
   */
  loadSql(sqlFile, pathFolder = 'sql') {
    return fs.readFileSync(pathFolder + '/' + sqlFile).toString();
  }
}

export { EmailBussiness }
