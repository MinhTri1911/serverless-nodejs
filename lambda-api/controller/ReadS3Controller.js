/**
 * File LogoutControler.js
 * Insert in table h_login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { ReadS3Business } from "../business/ReadS3Business";
import ServiceModel from "../models/ServiceModel";
import Constant from "../config/Constant";
import _ from 'lodash';
import HttpCode from "../config/HttpCode";

/**
 * Function Insert into table h_login
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const readS3 = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new ReadS3Business(serviceModel.getDb());

  let req = event.queryStringParameters;

  try {
    return account.readS3(req)
      .then(data => {
        if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Internal Server Error!!!");
        }
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, data );
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

export { readS3 }
