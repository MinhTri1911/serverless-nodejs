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
const getCartDetail = async (event, context, callback) => {
  let serviceModel = new ServiceModel(Config.DatabaseConfig);

  let bookingBusiness = new BookingBusiness(serviceModel.getDb());
  let  detail =[{"client_id":"test1",
    "cart_id":"4204",
    "show_nm":"ぽーとくりすます",
    "show_date_disp_char":"2018/12/25(火) 18:30",
    "sales_nm":"一般",
    "sales_kb":"1",
    "seat_type_nm":"S席",
    "ticket_type_nm":"一般",
    "seat_nm":"自由席",
    "sales_price":1000,
    "standard_ticket_price":1000,
    "seat_type_kb":"2",
    "internet_seat_kb":"1",
    "internet_seat_notice":"",
    "ticket_count":2,
    "cart_seq":"1",
    "seat_no":"218",
    "unit_flg":"1",
    "show_group_disp_kb":"2"},
    {"client_id":"test1",
      "cart_id":"4204",
      "show_nm":"ぽーとくりすます",
      "show_date_disp_char":"2018/12/25(火) 18:30",
      "sales_nm":"一般",
      "sales_kb":"1",
      "seat_type_nm":"A席",
      "ticket_type_nm":"一般",
      "seat_nm":"10列 1版",
      "sales_price":900,
      "standard_ticket_price":1000,
      "seat_type_kb":"1",
      "internet_seat_kb":"2",
      "internet_seat_notice":"0",
      "ticket_count":1,
      "cart_seq":"2",
      "seat_no":"219",
      "unit_flg":"0",
      "show_group_disp_kb":"2"},
    {"client_id":"test1",
      "cart_id":"4204",
      "show_nm":"ぽーとくりすます",
      "show_date_disp_char":"2018/12/25(火) 18:30",
      "sales_nm":"一般",
      "sales_kb":"1",
      "seat_type_nm":"A席",
      "ticket_type_nm":"一般",
      "seat_nm":"10列 2版",
      "sales_price":1000,
      "standard_ticket_price":1000,
      "seat_type_kb":"1",
      "internet_seat_kb":"3",
      "internet_seat_notice":"1",
      "ticket_count":1,
      "cart_seq":"3",
      "seat_no":"220",
      "unit_flg":"0",
      "show_group_disp_kb":"2"},
    {"client_id":"test1",
      "cart_id":"4204",
      "show_nm":"ぽーとくりすます",
      "show_date_disp_char":"2018/12/25(火) 18:30",
      "sales_nm":"一般2",
      "sales_kb":"1",
      "seat_type_nm":"S席",
      "ticket_type_nm":"一般2",
      "seat_nm":"自由席",
      "sales_price":1000,
      "standard_ticket_price":1000,
      "seat_type_kb":"2",
      "internet_seat_kb":"1",
      "internet_seat_notice":"",
      "ticket_count":2,
      "cart_seq":"4",
      "seat_no":"221",
      "unit_flg":"0",
      "show_group_disp_kb":"2"}
      ];
  return serviceModel.createSuccessCallback(HttpCode.SUCCESS, detail);

  // try {
  //   // Get request parameter
  //   let req = event.queryStringParameters;
  //
  //   return bookingBusiness.getInfo(req.client_id, req.show_group_id,req.show_no , req.admin_time)
  //     .then(data => {
  //
  //       let showInfo = data;
  //
  //       return serviceModel.createSuccessCallback(HttpCode.SUCCESS, showInfo);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  //     });
  // } catch (err) {
  //   console.log(err);
  //   return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  // }
}




export {getCartDetail};
