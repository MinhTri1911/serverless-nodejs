/**
 * File EmailController.js
 * Send Email
 *
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */
import ServiceModel from "../../../models/ServiceModel";
import Constant from "../../../config/Constant";
import _ from 'lodash';
import HttpCode from "../../../config/HttpCode";

const nodemailer = require('nodemailer/lib/nodemailer');
const URL_RESET_PASSWORD = '/login/setting-password/';

/**
 * Function send email to client
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const sendEmail = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);

  // Get request parameter
  let req = JSON.parse(event.body);

  try {
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true,
      auth: {
        user: 'apikey',
        pass: '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'
      },
      logger: false,
      debug: false
    },
    {
      // Sender info
      from: 'ducvn@rikkeisoft.com',
      headers: {
        "X-Requested-With":	'*'	,
        "Access-Control-Allow-Headers":	'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with'	,
        "Access-Control-Allow-Origin":	'*'	,
        "Access-Control-Allow-Methods":	'POST,GET,OPTIONS'
      }
    });

    // Message content
    let message = {
      // Comma separated list of recipients
      to: req.received,
      // Subject of the message
      subject: req.subject,
      // Body
      html: req.content
    };

    // Function use when send link reset password
    if ((req.content).indexOf(URL_RESET_PASSWORD) > -1) {
      message = {
        // Name recipients
        to: req.received,
        // Subject of the message
        subject: req.subject,
        // Body
        html: 'Please click <a href=' + req.content +'>here</a> to reset you password'
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
        "X-Requested-With":	'*'	,
        "Access-Control-Allow-Headers":	'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with'	,
        "Access-Control-Allow-Origin":	'*'	,
        "Access-Control-Allow-Methods":	'POST,GET,OPTIONS'
      },
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

export { sendEmail }
