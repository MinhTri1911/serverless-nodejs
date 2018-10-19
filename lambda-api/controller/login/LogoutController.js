/**
 * File LogoutControler.js
 * Insert in table h_login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { LogoutBusiness } from "../../business/login/LogoutBusiness";
import ServiceModel from "../../models/ServiceModel";
import  Constant  from "../../config/Constant";
import _ from 'lodash';
import HttpCode from "../../config/HttpCode";

const requestIp = require('request-ip');

/**
 * Function Insert into table h_login
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const logout = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new LogoutBusiness(serviceModel.getDb());

  // Get request parameter
  let req = JSON.parse(event.body);
  const clientIp = requestIp.getClientIp(event);

  try {
    return account.logout(req, clientIp)
      .then(data => {
        console.log(data)
        if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Internal Server Error!!!");
        }
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS,{ messenger: "logout ok" });
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

export { logout }
