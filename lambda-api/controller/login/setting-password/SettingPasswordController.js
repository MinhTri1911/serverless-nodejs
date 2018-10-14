/**
 * File SettingPasswordController.js
 * Setting new password to user
 *
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import { SettingPasswordBusiness } from "../../../business/login/setting-password/SettingPasswordBusiness";
import ServiceModel from "../../../models/ServiceModel";
import Constant from "../../../config/Constant";
import _ from 'lodash';
import HttpCode from "../../../config/HttpCode";

/**
 * Function handler setting password
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const settingPassword = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new SettingPasswordBusiness(serviceModel.getDb());

  // Get request parameter
  let req = JSON.parse(event.body);

  try {
    return account.settingPassword(req)
      .then(data => {
        if (!data) {
          return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Incorrect Information!!!");
        } else {
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS,{ "result":"true" });
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

/**
 * Function check key reset password of client
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const checkKey = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new SettingPasswordBusiness(serviceModel.getDb());

  // Get request parameter
  let req = JSON.parse(event.body);

  if (req.key) {
    try {
      return account.checkKey(req)
        .then(data => {
          if (data[0].valid_flg === '0') {
            return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Incorrect Information!!!");
          } else {
            return serviceModel.createSuccessCallback(HttpCode.SUCCESS,{ "result":"true" });
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
  } else {
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

export { settingPassword, checkKey }
