import Config from "../config/Constant";
import {SendMailBusiness} from "../business/SendMailBusiness";
import HttpCode from "../config/HttpCode";
import ServiceModel from "../models/ServiceModel";

const sendMailBookingComplete = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let mailBusiness = new SendMailBusiness(service.getDb());
  try {
    return mailBusiness.sendMailBookingComplete(event)
      .then(res => {
        return service.createSuccessCallback(HttpCode.SUCCESS, res);
      })
      .catch(err => {
        return service.createErrorCallback(HttpCode.ERROR, err + "Internal Server Error!!!");
      });
  } catch (err) {
    return service.createErrorCallback(HttpCode.ERROR, err + "Internal Server Error!!!");
  }
}

export {sendMailBookingComplete}
