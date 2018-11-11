/**
 * File LoginControler.js
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { LoginBusiness } from "../../business/login/LoginBusiness";
import ServiceModel from "../../models/ServiceModel";
import Constant from "../../config/Constant";
import jwt from "jsonwebtoken";
import _ from "lodash";
import HttpCode from "../../config/HttpCode";
import Timeout from "../../config/Timeout";

const requestIp = require("request-ip");
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
  const client_ip = requestIp.getClientIp(event);

  try {
    return account
      .getUserByEmail(req, client_ip)
      .then(data => {
        if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(
            HttpCode.NOT_FOUND,
            "Login Fail"
          );
        }

        //check black_cd value
        if (data[0].black_cd == "1") {
          let black_cd = { black_cd: data[0].black_cd };
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {
            black_cd
          });
        } else {
          let infoUser = {
            client_id: data[0].client_id,
            member_id: data[0].member_id,
            member_pass: data[0].member_pass,
            mail_address: data[0].mail_address,
            member_nm: data[0].member_nm,
            member_kb_nm: data[0].member_kb_nm,
            member_start_date: data[0].member_start_date,
            member_end_date: data[0].member_end_date,
            member_kb_no: data[0].member_kb_no,
            member_type_no: data[0].member_type_no
          };

          let black_cd = { black_cd: data[0].black_cd };
          let user = {
            client_id: infoUser.client_id,
            member_id: infoUser.member_id,
            mail_address: infoUser.mail_address,
            member_nm: infoUser.member_nm,
            member_kn: data[0].member_kn,
            member_kb_nm: infoUser.member_kb_nm,
            member_start_date: infoUser.member_start_date,
            member_end_date: infoUser.member_end_date,
            member_kb_no: infoUser.member_kb_no,
            member_type_no: infoUser.member_type_no,
            post_no: data[0].post_no,
            prefecture: data[0].prefecture,
            municipality: data[0].municipality,
            address1: data[0].address1,
            address2: data[0].address2,
            tel_no: data[0].tel_no,
            mobile_no: data[0].mobile_no,
            mail_send_flg: data[0].mail_send_flg,
            post_send_flg: data[0].post_send_flg,
            sex_type: data[0].sex_type,
            birthday: data[0].birthday,
            login_id: data[0].login_id
          };

          let token = jwt.sign(infoUser, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME
          });
          return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {
            token: token,
            userInf: user,
            black_cd
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
    let decodeToken = "";
    let token_client = event.headers.Authorization;
    if (event.headers.Authorization) {
      decodeToken = jwt.verify(token_client, process.env.JWT_SECRET);
    }
    return account.getUserByToken(decodeToken).then(data => {
      if (_.isEmpty(data)) {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {
          code: "Token not valid"
        });
      } else {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {
          code: "Token valid"
        });
      }
    });
  } catch (err) {
    console.error(err);
    return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {
      code: "Token not valid"
    });
  }
};

export { login, getInfUserByToken };
