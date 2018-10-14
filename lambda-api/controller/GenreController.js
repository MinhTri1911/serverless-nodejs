import {GenreBusiness} from "../business/GenreBusiness";
import ServiceModel from "../models/ServiceModel";
import Config from "../config/Constant";
import HttpCode from "../config/HttpCode";

const getListGenre = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let genre = new GenreBusiness(service.getDb());
  try {
    return genre.getListGenre(event)
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

export {getListGenre}