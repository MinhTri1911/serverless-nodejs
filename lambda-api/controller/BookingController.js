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



const JWT_EXPIRATION_TIME = Timeout.JWT_SECRET;

/**
 * action get show info
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const getShowInfo = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;

    return bookingBusiness.getInfo(req.client_id, req.show_group_id,req.show_no , req.admin_time)
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

/**
 * action get seat info map
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const getSeatDetail = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;

    return bookingBusiness.getSeatDetail(req.client_id, req.show_group_id, req.show_no, req.sales_no,req.member_kb_no)
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
/**
 * action get info ticket type
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const getTicketType = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;

    return bookingBusiness.getTicketType(req.client_id, req.show_group_id, req.show_no, req.sales_no)
      .then(data => {

        let ticketType = {seats : data};
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

/**
 * action validate term sale
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const getCheckSalesTerm = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;

    return bookingBusiness.getCheckSalesTerm(req.client_id, req.show_group_id, req.show_no, req.sales_no)
      .then(data => {

        let result =  data[0];

        return serviceModel.createSuccessCallback(HttpCode.SUCCESS,  result);
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

/**
 * action validate limit ticket number
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const getCheckLimitTicket = async (event, context, callback) => {

  let serviceModel = new ServiceModel(Config.DatabaseConfig);
  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;

    return bookingBusiness.getCheckLimitTicket(req.client_id, req.show_group_id, req.show_no, req.sales_no,req.seat_select_count ,req.member_id)
      .then(data => {

        let result =  data[0];

        return serviceModel.createSuccessCallback(HttpCode.SUCCESS,  result);
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

/**
 * action get next cart id
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const getCartId = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);
  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = event.queryStringParameters;
    // console.log(req);
    return bookingBusiness.getCartId()
      .then(data => {

        let result =  data[0];

        return serviceModel.createSuccessCallback(HttpCode.SUCCESS,  result);
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

/**
 * action validate designate seat
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const postCheckDesignateSeat = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);
  let bookingBusiness = new BookingBusiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = JSON.parse(event.body);
    return bookingBusiness.postCheckDesignateSeat(req.client_id,req.cart_id ,req.show_group_id,req.sales_no ,req.show_no ,req.seats ,req.ins_pg_id,req.upd_pg_id)
      .then(data => {

        let result =  data;
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS,  result);
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
/**
 * validate check seat booking
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<*>}
 */
const postCheckSeat = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);
  let bookingBusiness = new BookingBusiness(serviceModel.getDb());
  let account_id = 'NET';
  let  ins_pg_id = 'postCheckSeat';
  let  upd_pg_id = 'postCheckSeat';

  try {
    // Get request parameter
    let req = JSON.parse(event.body);
    return bookingBusiness.postCheckFreeSeat(req.client_id,req.cart_id ,req.show_group_id,req.sales_no ,req.show_no ,req.seats ,req.member_kb_no, req.membertype_no, req.member_id,account_id,ins_pg_id,upd_pg_id)
      .then(data => {

        let result =  data;
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS,  result);
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


export {getShowInfo,getSeatDetail,getTicketType,getCheckSalesTerm,getCheckLimitTicket,getCartId,postCheckDesignateSeat,postCheckSeat};
