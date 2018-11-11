/**
 * NotifyBusiness.js
 * Define handler business with Notify
 * *********************************************************************
 * @class NotifyBusiness
 * @author Rikkei.DungLV
 * @date 2018-10-01
 */

import Config from "../config/Constant";
import Common from "../common/ClientId"
import {Helper} from "../common/Helper"

class NotifyBusiness {
  /**
   *
   * @param db
   * @returns {NotifyBusiness}
   */
  constructor(db) {
    this.db = db;
    this.helper = new Helper();
    return this;
  }

  /**
   * Check when user search with sales date
   * @param req
   * @returns {boolean}
   */
  hasSearchAdminTime(event) {
    let fmReg = new RegExp(/^(([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{1,2}))$/);
    if (event.queryStringParameters && event.queryStringParameters.admin_time && fmReg.test(event.queryStringParameters.admin_time)) {
      return true;
    }
    return false;
  }

  /**
   * Get list notify from database
   * @param {event} event
   * @return {Promise}
   */
  getNotifies(event) {
    return new Promise((resolve, reject) => {
      // Check exists client id from request user to API
      if (!Common.checkExistsClientIdInRequest(event)) {
        return reject(Config.Common.MSG_REQUIRE_CLIENT_ID);
      }
      // Get offset that get position of record
      let page = event.queryStringParameters && event.queryStringParameters.page ? event.queryStringParameters.page : 1;
      let offset = page > 1 ? (page - 1) * Config.NotifyConfig.RECORD_SHOW_PER_PAGE : Config.NotifyConfig.RECORD_SHOW_PER_PAGE;
      // Config data biding to query SQL base on event from client
      const objBindQuery = {
        page: page,
        offset: offset
      }
      // Binding client id of event from client request
      if (event.queryStringParameters.client_id) {
        objBindQuery.clientId = event.queryStringParameters.client_id;
      }
      // Load String query SQL from file SQL
      var queryDB = this.helper.loadSql(Config.NotifyConfig.SQL_LIST_NOTIFY);
      if (this.hasSearchAdminTime(event)) {
        objBindQuery.adminTime = event.queryStringParameters.admin_time;
        queryDB = queryDB.replace(/(#replace_admin_time)+/g, ` to_char(to_timestamp($adminTime, 'YYYY/MM/DD HH24:MI'), 'YYYYMMDDHH24MI') >= apply_start_dtime 
                                                            and to_char(to_timestamp($adminTime, 'YYYY/MM/DD HH24:MI'), 'YYYYMMDDHH24MI') <= apply_end_dtime`);
      } else {
        queryDB = queryDB.replace(/(#replace_admin_time)+/g, ` to_char(now(), 'YYYYMMDDHH24MI') >= apply_start_dtime 
                                                            and to_char(now(), 'YYYYMMDDHH24MI') <= apply_end_dtime`);
      }

      return this.db.query(queryDB,
        {
          type: this.db.QueryTypes.SELECT,
          bind: objBindQuery
        })
        .then(result => {
          let res = {
            record_num: result && result.length > 0 ? result[0].total : 0,
            notify_list: result
          }
          resolve(res);
        })
        .catch(error => {
          reject(new Error(`Something Went Wrong ${error}`));
        })
    })
  }
}

export {NotifyBusiness}