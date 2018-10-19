/**
 * File Helper.js
 * Common function using
 *
 * @class Helper
 * @author Rikkei.TriHNM
 * @date 2018-10-10
 */

import _ from 'lodash';

const ejs = require('ejs');
const path = require('path');
const fs = require('mz/fs');
const iconv = require('iconv-lite');
const nodemailer = require('nodemailer/lib/nodemailer');

class Helper {
  /**
   * Creates an instance of Helper.
   *
   * @returns {void}
   * @memberof Helper
   */
  constructor(db) {
    this.db = db;
    return this
  }

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
      let sql = this.loadSql('SQLGetKeySendGrid.sql')
      let passwordEmail = '';
      this.db.query(sql, { type: this.db.QueryTypes.SELECT})
        .then(result => {
          passwordEmail = result[0].sendgrid_apikey;

          // Create a SMTP transporter object
          let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: { user: process.env.MAIL_USER, pass: passwordEmail },
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

              reject(new Error(`Error send mail function: ${error}`));
            } else {
              // Close connection
              transporter.close();

              resolve({ status: true });
            }
          });
        })
        .catch(err => {
          console.error(err);
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
    const file  = fs.readFileSync(pathFolder + '/' + sqlFile).toString();
    // const content = iconv.decode(Buffer.from(file), "Shift_JIS");

    return file;
  }
}

export { Helper }
