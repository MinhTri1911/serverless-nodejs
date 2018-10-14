import {Genre} from "../models/Genre"
import Config from "../config/Constant";
import _ from "lodash"

class GenreBusiness {
  /**
   *
   * @param db
   * @returns {ShowBusiness}
   */
  constructor(db) {
    this.db = db;
    // let show = new Show();
    // this.showModel = show.defineShowSchema(this.db)
    this.config = Config.GenreConfig;
    return this;
  }

  /**
   * Convert request user to data search show
   *
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
   *
   * @param req
   */
  getListGenre(req) {
    // console.log(req);
    let params = this.retrieveParams(req)
    let condition = this.convertRequestToCondition(params)

    let queryCondition = this.addSubQueryBaseOnRequest(params)

    let bindValueQuery = this.bindValueToQuery(condition)
    return new Promise((resolve, reject) => {
      if (!this.hasSearchClientId(params)) {
        reject(new Error(`Vui lòng nhập client_id`))
      }

      this.db.query(`SELECT
                    client_id
                    , genre_no
                    , genre_nm
                    , genre_rk
                    , disp_seq 
                  FROM
                    ticket1.m_genre 
                  ${queryCondition.clientId}
                  ORDER BY
                    disp_seq`,
        {
          bind: bindValueQuery,
          type: this.db.QueryTypes.SELECT
        })
        .then(data => {
          let response = {
            result: {
              record_num: data.length,
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
   *
   * @param req
   * @return {*}
   */
  retrieveParams(req) {
    if (req.body && !_.isNil(req.body)) {
      let body = JSON.parse(req.body);
      if (body.params) {
        return body.params
      }
    }
    return {}
  }

  /**
   *
   * @param conditionFromReq
   */
  addSubQueryBaseOnRequest(req) {
    return {
      clientId: this.addQueryClientId(req)
    }
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

  addQueryClientId(req) {
    if (this.hasSearchClientId(req)) {
      return ' where client_id = $clientId';
    }
    return '';
  }

  /**
   *
   * @param conditionFromReq
   */
  bindValueToQuery(conditionFromReq) {
    let bindParam = {};
    // When user search with genre no
    if (!_.isNil(conditionFromReq.clientId) && !_.isNull(conditionFromReq.clientId)
      && !_.isEmpty(conditionFromReq.clientId)) {
      bindParam.clientId = conditionFromReq.clientId;
    }
    //
    // if (!_.isNil(conditionFromReq.offset) && !_.isNull(conditionFromReq.offset)) {
    //   bindParam.offset = conditionFromReq.offset;
    // }
    //
    // if (!_.isNil(conditionFromReq.limit) && !_.isNull(conditionFromReq.limit)
    //   && _.isNumber(conditionFromReq.limit) && conditionFromReq.limit > 0) {
    //   bindParam.limit = conditionFromReq.limit;
    // }

    // When user search with key word
    return bindParam;
  }
}

export {GenreBusiness}