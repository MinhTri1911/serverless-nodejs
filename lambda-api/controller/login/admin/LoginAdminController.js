/**
 * File LoginControler.js
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { LoginAdminBusiness } from "../../../business/login/admin/LoginAdminBusiness";
import ServiceModel from "../../../models/ServiceModel";
import Constant from "../../../config/Constant";
import jwt from "jsonwebtoken";
import _ from "lodash";
import HttpCode from "../../../config/HttpCode";
import Timeout from "../../../config/Timeout";

const requestIp = require("request-ip");
const JWT_EXPIRATION_TIME = Timeout.JWT_EXPIRATION_TIME;

/**
 * Function handler login
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const loginAdmin = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new LoginAdminBusiness(serviceModel.getDb());

  // Get request parameter
  let req = JSON.parse(event.body);
  let client_id = req.client_id;
  const clientIp = requestIp.getClientIp(event);

  try {
    return account
      .getAdminByEmail(req, clientIp)
      .then(data => {
        if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(
            HttpCode.NOT_FOUND,
            "Login Fail"
          );
        } else {
          let infoAdmin = {
            client_id: data[0].client_id,
            account_id: data[0].account_id,
            account_password: data[0].account_password,
            account_nm: data[0].account_nm,
            account_kn: data[0].account_kn,
            mail_address: data[0].mail_address,
            apply_start_date: data[0].apply_start_date,
            apply_end_date: data[0].apply_end_date,
            enable_kb: data[0].enable_kb,
            web_permission_kb: data[0].web_permission_kb
          };

          let userAdmin = {
            client_id: infoAdmin.client_id,
            account_id: infoAdmin.account_id,
            account_nm: infoAdmin.account_nm,
            account_kn: infoAdmin.account_kn,
            mail_address: infoAdmin.mail_address,
            apply_start_date: infoAdmin.apply_start_date,
            apply_end_date: infoAdmin.apply_end_date,
            enable_kb: infoAdmin.enable_kb,
            web_permission_kb: infoAdmin.web_permission_kb
          };

          let token = jwt.sign(infoAdmin, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME
          });
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {
            token: token,
            adminInf: userAdmin
          });
        }
      })
      .catch(err => {
        console.error(err);
        return serviceModel.createErrorCallback(
          HttpCode.ERROR,
          "Internal Server Error!!!"
        );
      });
  } catch (err) {
    console.error(err);
    return serviceModel.createErrorCallback(
      HttpCode.ERROR,
      "Internal Server Error!!!"
    );
  }
};

export { loginAdmin };
