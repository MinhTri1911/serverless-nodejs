/**
 * File ClientController.jss
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import { ClientBusiness } from "../../../business/login/client-business/ClientBusiness"
import ServiceModel from "../../../models/ServiceModel"
import Constant from "../../../config/Constant"
import HttpCode from "../../../config/HttpCode"

/**
 * Function get client info
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const getClientInfo = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new ClientBusiness(serviceModel.getDb());

  // Get request parameter
  let req = JSON.parse(event.body);

  try {
    return account.getClient(req)
      .then(data => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, data);
      })
      .catch(err => {
        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    console.error(err);
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

export { getClientInfo }
