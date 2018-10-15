/**
 * File RegisterControler.js
 * Define api request and response
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-02
 */

import { AccountBussiness } from "../business/AccountBussiness";
import { RegisterBusiness } from "../business/RegisterBusiness";
import ServiceModel from "../models/ServiceModel";
import config from "../config/Constant";
import jwt from "jsonwebtoken";
import HttpCode from "../config/HttpCode";
import Timeout from "../config/Timeout";
import Validator  from'validatorjs';
import rules from '../validations/SearchPostCode';
import { Helper } from '../common/Helper';

const JWT_EXPIRATION_TIME = Timeout.JWT_SECRET;

const register = async (event, context, callback) => {
	let serviceModel = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(serviceModel.getDb());

  try {
    // Get request parameter
    let req = JSON.parse(event.body);

    return account.createAccount({
        client_id: req.clientId,
        account_id: req.accountId,
        account_password: req.password,
        account_nm: 'テスト太郎',
        account_kn: 'テストタロウ',
        mail_address: req.mail,
        apply_start_date: '20180921',
        apply_end_date: '20180921',
        enable_kb: 1,
        notes: '',
        permission_group_no: 4,
        ins_pg_id: 'copy',
        ins_client_id: 'test',
        ins_employee_cd: 'copy',
        ins_dtime: '2018-09-21 08:01:00.595215',
        upd_pg_id: 'copy',
        upd_client_id: 'TriHNM_1',
        upd_employee_cd: 'copy',
        upd_dtime: '2018-09-21 08:01:00.595215'
      })
      .then(data => {
        let infoUser = data.result;

        // Create token after create account
        const token = jwt.sign({ infoUser }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });

        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, token);
      })
      .catch(err => {
        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

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

  let clientId = event.queryStringParameters.clientId;

  try {
    return registerBusiness.initPageRegister(clientId)
      .then(data => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, data);
      })
      .catch(err => {
        // Logg error
        console.error(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
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
      return serviceModel.createSuccessCallback(HttpCode.ERROR, validation.errors);
    }

    return registerBusiness.searchPostCode(param.post_code_1, param.post_code_2)
      .then(result => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { listAddress: result });
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
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
    return registerBusiness.checkExistsMail(param.mail, param.clientId)
      .then(result => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { existsMail: result });
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
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
        console.log(result);
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { existsCode: result });
      })
      .catch(err => {
        // Logg error
        console.error(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    // Logg error
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

const createUser = async (event, context, callback) => {
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  let registerBusiness = new RegisterBusiness(serviceModel.getDb());

  try {
    let parameter = JSON.parse(event.body);

    return registerBusiness.createUser(parameter)
      .then(data => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { code: HttpCode.SUCCESS });
      })
      .catch(err => {
        console.error(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    console.error(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

const demoSendMail = async (event, context, callback) => {
  let serviceModel = new ServiceModel(config.DatabaseConfig);
  try {
    let helper = new Helper();
    let html = null;
    let mails = ['minhtri191195@gmail.com', 'trihnm@rikkeisoft.com', 'thiennb@rikkeisoft.com', 'dunglv@rikkeisoft.com'];

    await helper.loadTemplate('example', { head: 'Successfull send mail', content: 'Hello everyone' })
      .then(data => {
        html = data;
      })
      .catch(err => {
        console.log(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });

    return helper.sendEmail('ducvn@rikkeisoft.com', mails, 'Example send mail', 'Content if not have template', html)
      .then(res => {
        return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { status: HttpCode.SUCCESS });
      })
      .catch(err => {
        // Log error
        console.log(err);

        return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
      });
  } catch (err) {
    console.log(err);

    return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
  }
}

export { register, initPage, searchPostCode, existsEmail, exsistsMemberCode, demoSendMail, createUser };
