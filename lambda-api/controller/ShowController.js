import {ShowBusiness} from "../business/ShowBusiness";
import ServiceModel from "../models/ServiceModel";
import Config from "../config/Constant";
import HttpCode from "../config/HttpCode";

const getListShow = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let show = new ShowBusiness(service.getDb());
  try {
    return show.getShows(event)
      .then(res => {
          return service.createSuccessCallback(HttpCode.SUCCESS, res.result );
      })
      .catch(err => {
        return service.createErrorCallback(HttpCode.ERROR, err + "Internal Server Error!!!");
      });
  } catch (err) {
    return service.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

const getScheduleShow = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let show = new ShowBusiness(service.getDb());
  try {
    return show.getScheduleShow(event)
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

export {getListShow, getScheduleShow}