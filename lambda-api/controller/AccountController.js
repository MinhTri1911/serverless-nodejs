import { AccountBussiness } from "../business/AccountBussiness";
import ServiceModel from "../models/ServiceModel";
import ServiceModelConfig from "../config/Constant";
import jwt from "jsonwebtoken";
import _ from 'lodash';
import HttpCode from "../config/HttpCode";
import Timeout from "../config/Timeout";

const getListAccount = async (event, context, callback) => {
  let service = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(service.getDb());

  try {
    return account.getAccounts()
      .then(res => {
        return service.createSuccessCallback(HttpCode.SUCCESS, res.result);
      })
      .catch(err => {
        return service.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    return service.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

const getInfUserByToken = async (event, context, callback) => {
  let serviceModel = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(serviceModel.getDb());

  try {
    let token = event.headers.Authorization;
    let decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    return account.getUserByToken(decodeToken)
      .then(data => {
          if (_.isEmpty(data)) {
          return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, { code: HttpCode.NOT_FOUND });
        }

        let infoUser = {"member_id": data[0].member_id,"mail_address": data[0].mail_address };

        // Create token


        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {infoUser});
      });
  } catch (err) {
    return serviceModel.createErrorCallback(HttpCode.SUCCESS,  { code: HttpCode.ERROR });
  }
}
export { getListAccount, getInfUserByToken }
