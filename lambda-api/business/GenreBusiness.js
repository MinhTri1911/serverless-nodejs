/**
 * GenreBusiness.js
 * Define handler business with genre
 * *********************************************************************
 * @class GenreBusiness
 * @author Rikkei.DungLV
 * @date 2018-10-01
 */

import Config from "../config/Constant";
import _ from "lodash"
import  ClientId from "../common/ClientId"
import {Helper} from "../common/Helper"

class GenreBusiness {
  /**
   * Construct a class
   * @param db
   * @returns {ShowBusiness}
   */
  constructor(db) {
    this.db = db;
    // let show = new Show();
    this.config = Config.GenreConfig;
    this.helper = new Helper();
    return this;
  }

  /**
   * Convert request user to data search show
   * @param req
   * @return {Object}
   */
  convertRequestToCondition(req) {
    let condition1 = {};
    if (this.hasSearchClientId(req)) {
      condition1.clientId = req.client_id;
    }

    return condition1;
  }

  /**
   * Get Shows base on reuqest from user
   * @param req
   * @return {Promise}
   */
  getListGenre(req) {
    let params = this.retrieveParams(req)
    let condition = this.convertRequestToCondition(params)
    return new Promise((resolve, reject) => {
      if (!ClientId.checkExistsClientIdInRequest(req)) {
        reject(new Error(Config.Common.MSG_REQUIRE_CLIENT_ID))
      }
      let queryDb = this.helper.loadSql(Config.GenreConfig.SQL_LIST_GENRE);
      this.db.query(queryDb,
        {
          bind: {
            client_id: condition.clientId
          },
          type: this.db.QueryTypes.SELECT
        })
        .then(data => {
          let response = {
            result: {
              record_num: data ? data.length : 0,
              genre_list: data
            }
          };
          resolve(response);
        })
        .catch(error => {
          reject(new Error(`Something Went Wrong ${error}`));
        });

    });
  }

  /**
   * Get param from request of user
   * @param req
   * @return {*}
   */
  retrieveParams(req) {
    if (req.queryStringParameters && !_.isNil(req.queryStringParameters)) {
        return req.queryStringParameters
    }
    return {}
  }

  /**
   * Check operate search when user input title show and search
   * @param req
   * @returns {boolean}
   */
  hasSearchClientId(req) {
    if (req && req.client_id && !_.isEmpty(req.client_id)) {
      return true;
    }
    return false;
  }
}

export {GenreBusiness}