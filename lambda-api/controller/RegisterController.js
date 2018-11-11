/**
 * File RegisterControler.js
 * Define api request and response
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-02
 */

import { RegisterBusiness } from "../business/RegisterBusiness";
import ServiceModel from "../models/ServiceModel";
import config from "../config/Constant";
import HttpCode from "../config/HttpCode";
import Validator  from'validatorjs';
import rules from '../validations/SearchPostCode';
import { RegisterRequest } from '../validations/RegisterRequest';

/**
 * Api init page input infomation customer
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @return {Object}
 */
const initPage = async (event, context, callback) => {
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());

  let clientId = event.queryStringParameters.client_id;

  try {
    return registerBusiness.initPageRegister(clientId)
      .then(data => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, data);
      })
      .catch(err => {
        // Logg error
        console.error(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api search address by post code
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @return {Object}
 */
const searchPostCode = async (event, context, callback) => {
  let param = event.queryStringParameters;
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());

  try {
    let validation = new Validator(param, rules);

    // Request parameter not passed validator
    if (validation.fails()) {
      return serviceModel.createErrorCallback(HttpCode.VALIDATOR_ERROR, validation.errors);
    }

    return registerBusiness.searchPostCode(param.post_code_1, param.post_code_2)
      .then(result => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { list_address: result });
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api check exists mail when register
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @return {Object}
 */
const existsEmail = async (event, context, callback) => {
  let param = event.queryStringParameters;
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());

  try {
    return registerBusiness.checkExistsMail(param.mail, param.client_id)
      .then(result => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { exists_mail: result });
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api check exists member code when register
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const exsistsMemberCode = async (event, context, callback) => {
  let param = event.queryStringParameters;
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());

  try {
    return registerBusiness.checkExistsMemberCode(param)
      .then(result => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { exists_code: result });
      })
      .catch(err => {
        // Logg error
        console.error(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api create user
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @returns {Object}
 */
const createUser = async (event, context, callback) => {
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());

  // Reset env
  process.env.INS_PG_ID = context.functionName;
  process.env.UPD_PG_ID = context.functionName;

  try {
    let parameter = JSON.parse(event.body);

    let valid = new RegisterRequest(parameter);
    let ruleRegister = await valid.makeRules();

    let validation = new Validator(parameter, ruleRegister, valid.makeMessages());

    if (validation.fails()) {
      return serviceModel.createErrorCallback(HttpCode.VALIDATOR_ERROR, validation.errors);
    }

    return registerBusiness.createUser(parameter)
      .then(data => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { code: HttpCode.SUCCESS });
      })
      .catch(err => {
        console.error(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

/**
 * Api check url is expired
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @return {Object}
 */
const checkIsExpiredUrl = async (event, context, callback) => {
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());
  let param = event.queryStringParameters;

  try {
    return registerBusiness.checkAccountIsAvaliable(param.client_id, param.key)
      .then(data => {
        if (!data.status) {
          throw new Error('Url is Expired');
        }

        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, data);
      }).catch(err => {
        console.error(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}


/**
 * Api active account after register
 *
 * @param {*} event
 * @param {*} context
 * @param {*} callback
 * @return {Object}
 */
const activeAccount = async (event, context, callback) => {
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());

  // Reset env
  process.env.INS_PG_ID = context.functionName;
  process.env.UPD_PG_ID = context.functionName;

  try {
    let parameter = JSON.parse(event.body);
    return registerBusiness.acctiveAccount(parameter.client_id, parameter.key)
      .then(res => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { code: HttpCode.SUCCESS, client_inf: res });
      }).catch(err => {
        console.error(err);

        if (!err.status) {
          return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.NOT_FOUND });
        }

        return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
      });
  } catch (err) {
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, { code: HttpCode.ERROR, msg: 'Internal Server Error!!!' });
  }
}

export {
  initPage,
  searchPostCode,
  existsEmail,
  exsistsMemberCode,
  createUser,
  activeAccount,
  checkIsExpiredUrl
};
