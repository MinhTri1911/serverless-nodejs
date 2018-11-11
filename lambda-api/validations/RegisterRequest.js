/**
 * File Register.js
 * Define rules for passes request
 *
 * @return {Object}
 * @author Rikkei.TriHNM
 * @date 2018-10-15
 */

import { RegisterBusiness } from "../business/RegisterBusiness";
import ServiceModel from "../models/ServiceModel";
import config from "../config/Constant";
import Validator  from'validatorjs';

// Register custome rule
import password_regex from './custom_rule/password_regex';
import phone_number from './custom_rule/phone_number';
import space_fullsize from './custom_rule/space_fullsize';
import fullsize from './custom_rule/fullsize';
import before_date from './custom_rule/before_date';
import after_date from './custom_rule/after_date';

const ENTER_SPACE = 1;
const REMOVE_SPACE = 2;
const IS_NOT_EXISTS = 0;

class RegisterRequest {
  /**
   * Creates an instance of RegisterRequest.
   *
   * @param {Object} data
   * @memberof RegisterRequest
   */
  constructor(data) {
    this.clientId = data.client_id;
    this.mail = data.mail;
    this.memberCode = data.member_code;
    this.memberNm = data.full_name;
    this.memberKn = data.furigana;
    this.telNo = data.tel_no;
    this.mobileNo = data.mobile_no;

    let serviceModel = new ServiceModel(config.DatabaseConfig);
    this.registerBusiness = new RegisterBusiness(serviceModel.getDb());
  }

  /**
   * Function make rule for request
   *
   * @returns {Object}
   * @memberof RegisterRequest
   */
  async makeRules() {
    await this.addRules();

    return await this.registerBusiness.handlerCommonInitPage(this.clientId)
      .then(res => {
        if (!Object.keys(res[0]).length) {
          throw new Error('Register request fail');
        }

        let data = res[0];
        let now = new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, '');

        return {
          mail: 'required|email|unique_mail|max:200',
          full_name: 'required|max:200|' + (data.member_nm_kb == ENTER_SPACE || data.member_nm_kb == REMOVE_SPACE
            ? `space_fullsize:${data.member_nm_kb}`
            : 'fullsize'),
          furigana: 'required|max:200|' + (data.member_nm_kb == ENTER_SPACE || data.member_nm_kb == REMOVE_SPACE
            ? `space_fullsize:${data.member_nm_kb}`
            : 'fullsize'),
          password: 'required|max:16|password_regex',
          post_no: "required|digits:7",
          prefecture: "required|max:100",
          municipality: "required|max:200|fullsize",
          address1: "required|max:400|fullsize",
          address2: "fullsize|max:400",
          tel_no: `required_without:mobile_no|max:20|phone_number:${data.tel_no_kb}`,
          mobile_no: `required_without:tel_no|max:20|phone_number:${data.tel_no_kb}`,
          mail_send_flg: "boolean",
          post_send_flg: "boolean",
          sex_type: "required|integer|between:1,2",
          birthday: `required|date|after_date:1900-01-01|before_date:${now}`,
          list_genre: "array|exists_genre",
          member_code: "max:16|regex:/^([a-zA-Z0-9])+$/g|exists_member_net"
        }
      }) .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Function adding custome rules
   *
   * @returns {void}
   * @memberof RegisterRequest
   */
  async addRules() {
    // Get list genre
    let listGener = await this.registerBusiness.getListGener(this.clientId)
      .then(res => {
        return res;
      }).catch(err => {
        throw new Error(err);
      });

    let existsMail = await this.registerBusiness.checkExistsMail(this.mail, this.clientId)
      .then(res => {
        return res;
      }).catch(err => {
        throw new Error(err);
      });

    // Add genre no to array
    let generNo = listGener.map(element => element.genre_no);

    let data = {
      code: this.memberCode,
      client_id: this.clientId,
      member_nm: this.memberNm,
      member_kn: this.memberKn,
      mobile_no: this.mobileNo,
      tel_no: this.telNo
    }

    let member = await this.registerBusiness.checkExistsMemberCode(data)
      .then(res => {
        return res != undefined;
      }).catch(err => {
        throw new Error(err);
      });

    // Register rule check exists genre
    await Validator.register('exists_genre', function(value, requirement, attribute) {
      let status = true;

      value.forEach(element => {
        if (!generNo.includes(element)) {
          status = false;
        }
      });

      return status;
    }, 'The :attribute is not exists');

    await Validator.register('unique_mail', function(value, requirement, attribute) {
      return existsMail.kbn == IS_NOT_EXISTS;
    }, 'The :attribute is exists');

    await Validator.register('exists_member_net', function(value, requirement, attribute) {
      if (value == '') {
        return true;
      }

      return member
    }, 'The :attribute is not exists');
  }

  /**
   * Function make messages for rule
   *
   * @return {Object}
   * @memberof RegisterRequest
   */
  makeMessages() {
    let now = new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, '');

    return {
      before_date: 'The birthday must be before ' + now,
      after_date: 'The birthday must be after 1900-01-01'
    }
  }
}

export { RegisterRequest }
