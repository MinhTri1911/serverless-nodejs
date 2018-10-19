/**
 * File LoginControler.js
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { LoginBusiness } from "../../business/login/LoginBusiness";
import ServiceModel from "../../models/ServiceModel";
import  Constant  from "../../config/Constant";
import jwt from "jsonwebtoken";
import _ from 'lodash';
import HttpCode from "../../config/HttpCode";
import Timeout from "../../config/Timeout";

const requestIp = require('request-ip');
const JWT_EXPIRATION_TIME = Timeout.JWT_EXPIRATION_TIME;

/**
 * Function handler login
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const login = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new LoginBusiness(serviceModel.getDb());

  // Get request parameter
  let req = JSON.parse(event.body);

  const clientIp = requestIp.getClientIp(event);

  try {
    return account.getUserByEmail(req, clientIp)
      .then(data => {
        if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Internal Server Error!!!");
        }

        //check black_cd value
        if (data[0].black_cd == '1') {
          let black_cd = {"black_cd": data[0].black_cd};
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS,{black_cd});
        } else {
          let infoUser = {
            "client_id": data[0].client_id,
            "member_id": data[0].member_id,
            "member_pass": data[0].member_pass,
            "mail_address": data[0].mail_address,
            "name": data[0].member_nm,
            "member_kb_nm": data[0].member_kb_nm,
            "member_start_date": data[0].member_start_date,
            "member_end_date": data[0].member_end_date,
            "member_kb_no": data[0].member_kb_no,
            "member_type_no": data[0].member_type_no
          };
          let black_cd = {"black_cd": data[0].black_cd};
          let user = {
            client_id: infoUser.client_id,
            member_id: infoUser.member_id,
            mail_address: infoUser.mail_address,
            name: infoUser.name,
            member_kb_nm: infoUser.member_kb_nm,
            member_start_date: infoUser.member_start_date,
            member_end_date: infoUser.member_end_date,
            member_kb_no: infoUser.member_kb_no,
            member_type_no: infoUser.member_type_no
          }
          let token = jwt.sign(infoUser, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS,{ token: token, userInf: user, black_cd });
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
 * Function get detech token get user infomation.
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 */
const getInfUserByToken = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new LoginBusiness(serviceModel.getDb());

  try {
    let token = event.queryStringParameters.token;
    let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    return account.getUserByToken(decodeToken)
      .then(data => {
        if (_.isEmpty(data)) {
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {code: "Not Authentication"});
        } else {
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {code: "Authentication"});
        }
      });
  } catch (err) {
    console.error(err);
    return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {code: "Not Authentication"});
  }
}

export { login, getInfUserByToken }
