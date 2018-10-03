import { AccountBussiness } from "../business/AccountBussiness";
import ServiceModel from "../models/ServiceModel";
import ServiceModelConfig from "../config/Constant";
import jwt from "jsonwebtoken";
import _ from 'lodash';
import HttpCode from "../config/HttpCode";
import Timeout from "../config/Timeout";

const JWT_EXPIRATION_TIME = Timeout.JWT_EXPIRATION_TIME;

const login = async (event, context, callback) => {
  let serviceModel = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(serviceModel.getDb());

  // Get request parameter
  let req = JSON.parse(event.body);

  try {
    return account.getUserByEmail(req)
      .then(data => {



        if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Login Fail!!!");
        }

         let infoUser = {
        "member_id":data[0].member_id,
        "member_pass":data[0].member_pass,
        "mail_address":data[0].mail_address,
        }
        // let infoUser = {};
        console.log(infoUser);
        // // Create token
        let token = jwt.sign(infoUser, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });

         return serviceModel.createSuccessCallback(HttpCode.SUCCESS,{ token,JWT_EXPIRATION_TIME });
      })
      .catch(err => {
        console.log(err)
        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

export { login }
