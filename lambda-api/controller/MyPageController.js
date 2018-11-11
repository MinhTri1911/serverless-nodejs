/**
 * File MyPageController.js
 * Define api request and response
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-23
 */

import { MyPageBusiness } from "../business/MyPageBusiness";
import ServiceModel from "../models/ServiceModel";
import Config from "../config/Constant";
import HttpCode from "../config/HttpCode";

/**
 * Api init my page
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const myPageIndex = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let myPageBusiness = new MyPageBusiness(service.getDb());

  try {
    let param = event.queryStringParameters;

    return myPageBusiness.getInfoMember(param.client_id, param.member_id)
      .then(res => {
        return service.createSuccessCallback(HttpCode.SUCCESS, res);
      }).catch(err => {
        console.error(err);

        return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api get history order
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const historyOrder = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let myPageBusiness = new MyPageBusiness(service.getDb());

  try {
    let param = event.queryStringParameters;

    return myPageBusiness.getHistoryOrder(param.client_id, param.member_id, param.page)
      .then(res => {
        return service.createSuccessCallback(HttpCode.SUCCESS, { paginate: res });
      }).catch(err => {
        console.error(err);

        return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api get detail order
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const detailOrder = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let myPageBusiness = new MyPageBusiness(service.getDb());

  try {
    let param = event.queryStringParameters;

    return myPageBusiness.getDetailOrder(param.client_id, param.member_id, param.reserve_no)
      .then(res => {
        return service.createSuccessCallback(HttpCode.SUCCESS, { detail: res });
      }).catch(err => {
        console.error(err);

        return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api init page update infomation
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const initUpdateProfile = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let myPageBusiness = new MyPageBusiness(service.getDb());

  try {
    let param = event.queryStringParameters;

    return myPageBusiness.initPageUpdateInfomation(param.client_id, param.member_id)
      .then(data => {
        return service.createSuccessCallback(HttpCode.SUCCESS, data);
      }).catch(err => {
        console.error(err);

        return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api check exists mail when update infomation
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const checkExistsMailUpdate = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let myPageBusiness = new MyPageBusiness(service.getDb());

  try {
    let param = event.queryStringParameters;

    return myPageBusiness.checkExistsMailUpdate(param.client_id, param.member_id, param.mail_address)
      .then(data => {
        return service.createSuccessCallback(HttpCode.SUCCESS, { exists_mail: data });
      }).catch(err => {
        console.error(err);

        return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api check exists login when update infomation
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const checkExistsLoginId = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let myPageBusiness = new MyPageBusiness(service.getDb());

  try {
    let param = event.queryStringParameters;

    return myPageBusiness.checkExistsLoginId(param.client_id, param.member_id, param.login_id)
      .then(data => {
        return service.createSuccessCallback(HttpCode.SUCCESS, { exists_login_id: data });
      }).catch(err => {
        console.error(err);

        return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api check exists order when update infomation
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const checkExistsOrder = async (event, context, callback) => {
  let service = new ServiceModel(Config.DatabaseConfig);
  let myPageBusiness = new MyPageBusiness(service.getDb());

  try {
    let param = event.queryStringParameters;

    return myPageBusiness.checkExistsOrder(param.client_id, param.member_id)
    .then(data => {
      return service.createSuccessCallback(HttpCode.SUCCESS, { exists_order: data });
    }).catch(err => {
      console.error(err);

      return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
    });
  } catch (err) {
    console.error(err);

    return service.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

export {
  myPageIndex,
  historyOrder,
  detailOrder,
  initUpdateProfile,
  checkExistsMailUpdate,
  checkExistsLoginId,
  checkExistsOrder
}
