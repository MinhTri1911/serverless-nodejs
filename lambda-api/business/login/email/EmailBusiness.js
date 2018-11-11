/**
 * File EmailBusiness.js
 * Check email and password to Login
 *
 * @class EmailBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-14
 */

import _ from 'lodash';
import HttpCode from "../../../config/HttpCode";

const nodemailer = require('nodemailer/lib/nodemailer');
const URL_RESET_PASSWORD = '/login/setting-password/';

class EmailBusiness {
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
   * Function will get data client by email and password and update table h_login
   *
   * @param {*} data
   * @param {*} ip
   * @returns {result query}
   */
  sendEmail(data) {
    try {
      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        },
        logger: false,
        debug: false
      },
        {
          // Sender info
          from: data.from,
          headers: {
            "X-Requested-With": '*',
            "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
          }
        });

      // Message content
      let message = {
        // Comma separated list of recipients
        to: data.received,
        // Subject of the message
        subject: data.subject,
        // Body
        html: data.content
      };

      // Function use when send link reset password
      if ((data.content).indexOf(URL_RESET_PASSWORD) > -1) {
        message = {
          // Name recipients
          to: data.received,
          // Subject of the message
          subject: data.subject,
          // Body
          html: 'Please click <a href=' + data.content + '>here</a> to reset you password'
        };
      }

      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.error(err);
          return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
        }
      });

      const response = {
        statusCode: 200,
        body: JSON.stringify('Send email successful'),
        headers: {
          "X-Requested-With": '*',
          "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
        },
      };
      callback(null, response);
    } catch (err) {
      console.error(err);
      return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
    }
  }
}

export { EmailBusiness }
