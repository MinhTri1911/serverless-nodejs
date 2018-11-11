/**
 * File Helper.js
 * Common function using
 *
 * @class Helper
 * @author Rikkei.TriHNM
 * @date 2018-10-10
 */

import _ from 'lodash';
import Constant from "../config/Constant";

const ejs = require('ejs');
const path = require('path');
const fs = require('mz/fs');
const iconv = require('iconv-lite');
const nodemailer = require('nodemailer/lib/nodemailer');
const request = require('request');

class Helper {
  /**
   * Creates an instance of Helper.
   *
   * @returns {void}
   * @memberof Helper
   */
  constructor() {
    this.apiKey = null;
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
      let emailPassword = this.apiKey ? this.apiKey : process.env.MAIL_PASS;

      if (!emailPassword) {
        reject(new Error('Api key sendgrid is empty'));
      }

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: { user: process.env.MAIL_USER, pass: emailPassword },
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

          resolve({status: true});
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
  loadSql(sqlFile, pathFolder = 'sql', jpEncode = false) {
    // Add config path of file SQL
    if (pathFolder == null || typeof pathFolder === "undefined") {
      pathFolder = Constant.FolderSql.PATH;
    }

    // Add encode file to jis-shift
    if (jpEncode) {
      const file = fs.readFileSync(pathFolder + '/' + sqlFile);
      var content = iconv.decode(Buffer.from(file), "Shift_JIS")
    } else {
      var content = fs.readFileSync(pathFolder + '/' + sqlFile).toString();
    }
    return content;
  }

  /**
   * Function set api key for sendgrid
   *
   * @param {Object} db
   * @returns {String}
   * @throws {Error}
   * @memberof Helper
   */
  async setApiKey(db) {
    let sql = this.loadSql('SQLGetKeySendGrid.sql');

    return await db.query(sql, { type: db.QueryTypes.SELECT})
      .then(result => {
        if (!result[0].sendgrid_apikey) {
          throw new Error('Api key sendgrid not found');
        }

        this.apiKey = result[0].sendgrid_apikey;

        return result[0].sendgrid_apikey;
      })
      .catch(err => {
        throw new Error(err);
      });
  }

   /**
   * Function replace text
   *
   * @param {String} str
   * @returns {String}
   * @memberof Helper
   */
  replaceTextToEndLine(str) {
    if (str == null || str == '') return str;

    let arr = str.split(/(\r\n|\n|\r)/g);
    let content = '';

    arr.forEach(el => {
      if (el != '') {
        content += '<p>' + el + '</p>';
      }
    })

    return content == '' ? str : content;
  }

  /**
   * Function get bounce by mail
   *
   * @param {String} mail
   * @returns {Boolean|Error}
   * @memberof Helper
   */
  getBounce(mail) {
    let secrectKey = this.apiKey ? this.apiKey : process.env.MAIL_PASS;

    // Config proxy
    let proxyUrl = process.env.PROXY_URL;
    let proxiedRequest = process.env.PROXY_URL
      ? request.defaults({ 'proxy' : proxyUrl })
      : request;

    return new Promise((reslove, reject) => {
      let options = {
        method: 'GET',
        uri: process.env.URI_SENDGRID_GETBOUNCE + mail,
        port: 443,
        headers: {
          'User-Agent': 'request',
          'authorization': `Bearer ${secrectKey}`
        }
      }

      // Call api get bounce
      proxiedRequest(options, function (error, response, body) {
        if (error) {
          reject(new Error(`Error function getBounce ${error}`));
        }

        let dataBody = JSON.parse(body);

        let listBounces = dataBody.length > 0;

        let status = listBounces && Object.keys(dataBody[0]).length > 0;

        reslove(status);
      });
    });
  }

  /**
   * Function send mail via api v3 sendgrid
   *
   * @param {String} fromEmail
   * @param {Array} toEmails
   * @param {String} subject
   * @param {String} textContent
   * @param {String} htmlContent
   * @param {string} [fromName = '']
   * @returns {Object}
   * @memberof Helper
   */
  sendMailByApiV3(fromEmail, toEmails, subject, textContent, htmlContent, fromName = '') {
    let secrectKey = this.apiKey ? this.apiKey : process.env.MAIL_PASS;

    let to = [];

    toEmails.forEach(email => {
      to.push({ email: email });
    });

    // Setting data send mail
    let postData = {
      personalizations: [{ to: to, subject: subject }],
      from: {
        email: fromEmail,
        name: fromName
      },
      content: [{ type: " text/html", value: htmlContent != '' ? htmlContent : textContent }]
    }

    // Config proxy
    let proxyUrl = process.env.PROXY_URL;
      let proxiedRequest = process.env.PROXY_URL
        ? request.defaults({ 'proxy' : proxyUrl })
        : request;

    return new Promise((reslove, reject) => {
      let options = {
        method: "POST",
        uri: process.env.URI_SENDGRID_SENDMAIL,
        port: 443,
        headers: {
          'User-Agent': 'request',
          'authorization': `Bearer ${secrectKey}`,
          'content-type': 'application/json'
        },
        json: postData
      }

      // Call api post send mail
      proxiedRequest(options, function (error, response, body) {
        if (error) {
          reject(new Error(`Error function sendMailByApiV3 ${error}`));
        }

        reslove({ response: response.statusCode });
      });
    });
  }
}

export {Helper}
