/**
 * File ForgotPasswordController.js
 * Check email and phone user and send URL to user
 *
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import { ForgotPasswordBusiness } from "../../../business/login/forgot-password/ForgotPasswordBusiness";
import ServiceModel from "../../../models/ServiceModel";
import  Constant  from "../../../config/Constant";
import _ from 'lodash';
import HttpCode from "../../../config/HttpCode";
import { Helper } from '../../../common/Helper';

/**
 * Function handler check input email and phone
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const checkForgorPassword = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new ForgotPasswordBusiness(serviceModel.getDb());
  // Get request parameter
  let req = JSON.parse(event.body);

  try {
    return account.checkEmailAndPhone(req)
      .then(data => {
        if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Incorrect Information!!!");
        } else {
          let helper = new Helper();
          let html = 'Please click <a href=' + data.url +'>here</a> to reset you password'
          return helper.sendEmail('ducnhatvo@gmail.com', data.received, 'Reset your password', '', html)
            .then(res => {
              return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { status: HttpCode.SUCCESS });
            })
            .catch(err => {
              // Log error
              console.log(err);
              return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
            });
        }
      })
      .catch(err => {
        console.error(err);
        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    console.error(err);
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
}
}

export { checkForgorPassword }
