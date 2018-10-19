/**
 * File BookingController.js
 * Define api request and response
 *
 * @author Rikkei.ThienNB
 * @date 2018-10-16
 */

import {BookingBusiness} from "../business/BookingBusiness";
import ServiceModel from "../models/ServiceModel";
import Config from "../config/Constant";
import jwt from "jsonwebtoken";
import HttpCode from "../config/HttpCode";
import Timeout from "../config/Timeout";
import {Helper} from '../common/Helper';

const JWT_EXPIRATION_TIME = Timeout.JWT_SECRET;

const getShowInfo = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;
    // console.log(req);
    return bookingBusiness.getInfo(req.clientId, req.showGroupId, req.showNo, req.salesNo)
      .then(data => {

        let showInfo = data;

        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, showInfo);
      })
      .catch(err => {
        console.log(err);
        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    console.log(err);
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

const getSeatDetail = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;
    // console.log(req);
    return bookingBusiness.getSeatDetail(req.clientId, req.showGroupId, req.showNo, req.salesNo)
      .then(data => {

        let seatDetail = data;

        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, seatDetail);
      })
      .catch(err => {
        console.log(err);
        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    console.log(err);
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

const getTicketType = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;
    // console.log(req);
    return bookingBusiness.getTicketType(req.clientId, req.showGroupId, req.showNo, req.salesNo)
      .then(data => {

        let ticketType = {seats : data};
        console.log(ticketType);
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS,  ticketType);
      })
      .catch(err => {
        console.log(err);
        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    console.log(err);
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}


export {getShowInfo,getSeatDetail,getTicketType};
