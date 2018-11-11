import {ShowDetailBusiness} from "../business/ShowDetailBusiness";
import ServiceModel from "../models/ServiceModel";
import Config from "../config/Constant";
import HttpCode from "../config/HttpCode";

/**
 * Api get data shows detail
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @return {Object}
*/
const getDetail = async (event, context, callback) => {
  
  let service = new ServiceModel(Config.DatabaseConfig);
  let show = new ShowDetailBusiness(service.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;

    return show.getShowsDetail(req.client_id, req.show_group_id ,req.admin_time)
      .then(data => {
        let infoShowDetail = data;
        return service.createSuccessCallback(HttpCode.SUCCESS, infoShowDetail);
      })
      .catch(err => {
        console.log(err);
        return service.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
      
  } catch (err) {
    return service.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
};

export {getDetail}