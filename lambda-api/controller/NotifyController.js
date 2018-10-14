import {NotifyBusiness} from "../business/NotifyBusiness";
import ServiceModel from "../models/ServiceModel";
import Constant from "../config/Constant";
import HttpCode from "../config/HttpCode";

const getListNotify = async (event, context, callback) => {
  let service = new ServiceModel(Constant.DatabaseConfig);
  let notify = new NotifyBusiness(service.getDb());
  try {
    return notify.getNotifies(event)
      .then(res => {
        return service.createSuccessCallback(HttpCode.SUCCESS, res);
      })
      .catch(err => {
        return service.createErrorCallback(HttpCode.ERROR, err + "Internal Server Error!!!");
      });
  } catch (err) {
    return service.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

export {getListNotify}