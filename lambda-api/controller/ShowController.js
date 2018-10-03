import {ShowBusiness} from "../business/ShowBusiness";
import ServiceModel from "../models/ServiceModel";
import {DatabaseConfig} from "../config/Constant";
import HttpCode from "../config/HttpCode";
import _ from "lodash"

const getListShow = async (event, context, callback) => {
  let service = new ServiceModel(DatabaseConfig);
  let show = new ShowBusiness(service.getDb());
  let page = !_.isNil(event.queryStringParameters) && !_.isNil(event.queryStringParameters.page)
                                            ? event.queryStringParameters.page
                                            : 1;
  try {
    return show.getShows(page)
      .then(res => {
        return service.createSuccessCallback(HttpCode.SUCCESS, res.result);
      })
      .catch(err => {
        return service.createErrorCallback(HttpCode.ERROR, err + "Internal Server Error!!!");
      });
  } catch (err) {
    return service.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

export {getListShow}