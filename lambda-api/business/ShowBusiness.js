import Config from "../config/Constant";
import _ from "lodash"
import CommonClientId from "../common/ClientId"
import {Helper} from "../common/Helper"

class ShowBusiness {
  /**
   *
   * @param db
   * @returns {ShowBusiness}
   */
  constructor(db) {
    this.db = db;
    this.config = Config.ShowConfig;
    this.helper = new Helper();

    return this;
  }

  /**
   * Convert request user to data search show
   *
   * @param req
   * @return {Object}
   */
  convertRequestToCondition(req) {
    let condition = [];

    if (req && req.start_position) {
      condition.startPosition = Number(req.start_position);
    }

    if (req && req.end_position) {
      condition.endPosition = Number(req.end_position);
    }

    if (this.hasSearchClientId(req)) {
      condition.clientId = req.client_id;
    }

    if (this.hasSearchShowGroupId(req)) {
      condition.showGroupId = req.show_group_id;
    }

    if (this.hasSearchKey(req)) {
      condition.key = req.key_search ? req.key_search.trim().replace(/\s+/g, ' ') : '';
    }

    if (this.hasSearchShowDate(req) && req.from_show_date) {
      condition.fromShowDate = req.from_show_date;
    }

    if (this.hasSearchShowDate(req) && req.to_show_date) {
      condition.toShowDate = req.to_show_date;
    }

    if (this.hasSearchSalesDate(req) && req.from_sales_date) {
      condition.fromSalesDate = req.from_sales_date;
    }

    if (this.hasSearchSalesDate(req) && req.to_sales_date) {
      condition.toSalesDate = req.to_sales_date;
    }

    if (this.hasSearchGenreNo(req) && req.genre_no) {
      condition.genreNo = req.genre_no;
    }

    if (this.hasSearchAdminTime(req) && req.admin_time) {
      condition.adminTime = req.admin_time;
    }

    return condition;
  }

  /**
   * Get Shows base on reuqest from user
   *
   * @param {XMLHttpRequest} req
   * @return {Promise}
   */
  getShows(req) {
    let params = this.retrieveParams(req);
    let condition = this.convertRequestToCondition(params);
    let queryCondition = this.addSubQueryBaseOnRequest(params);
    let bindValueQuery = this.bindValueToQuery(condition);

    return new Promise((resolve, reject) => {
      let whereCondition = `${queryCondition.clientId}
               ${queryCondition.adminTime}
               /*%if form.genre_no != "" */
               ${queryCondition.genreNo}
               /*%end*/ 
               /*%if form.from_koen_date != "" */
               ${queryCondition.showDate}
               /*%end*/
               /*%if form.from_sales_date != "" */
               ${queryCondition.salesDate}
               /*%end*/
               /*%if form.free_word != "" */
               ${queryCondition.keySearch}`;

      let wherePaginate = ' where number >= $min_no_show_group AND number <= $max_no_show_group';
      var queryDb = this.helper.loadSql(this.config.SQL_LIST_SHOW)

      if (!CommonClientId.checkExistsClientIdInRequest(req)) {
        reject(Config.Common.MSG_REQUIRE_CLIENT_ID);
      }
      // If user search client id, replace string client id from client id in file
      if (whereCondition && !_.isEmpty(whereCondition)) {
        queryDb = queryDb.replace(/#where_condition+/g, whereCondition);
      }

      // Check paginate
      if (condition.startPosition && condition.endPosition) {
        queryDb = queryDb.replace(/#where_paginate+/g, wherePaginate)
      }

      // Replace all sub query in query string from file
      queryDb = queryDb.replace('#where_paginate', '').replace('#where_condition', '')

      // Execute query string
      this.db.query(queryDb,
        {
          bind: bindValueQuery,
          type: this.db.QueryTypes.SELECT
        })
        .then(data => {
          var response = {
              record_num: data && data.length > 0 ? data[0].show_cnt : 0,
              show_list: data
          };
          response.show_list = this.addSubSalesToShowGroup(response);
          resolve(response);
        })
        .catch(error => {
          reject(new Error(`Something Went Wrong ${error}`));
        });

    });
  }

  /**
   * Merge same show to group show to a record
   * @param {object} show
   * @return {object}
   */
  addSubSalesToShowGroup(show){
    if (show.record_num > 0) {
      var tmpShow = [];
      show.show_list.forEach(function (el, i) {
        var tex = Object.assign({}, el);
        delete tex['show_cnt'];
        delete tex['number'];
        el.sales_list = [tex]

        let indexExistsShow = tmpShow.findIndex(function (te) {
          return te.show_group_id == el.show_group_id
        })

        tmpShow.push(el)
        if (indexExistsShow >= 0) {
          if (!tmpShow[indexExistsShow].sales_list) {
            tmpShow[indexExistsShow].sales_list = [tex]
          } else {
            tmpShow[indexExistsShow].sales_list.push(tex)
          }
          tmpShow.splice(tmpShow.length - 1, 1);
        }
      });

      return tmpShow;
    }
    return show.show_list;
  }

  /**
   * Retrieve params from request of user
   *
   * @param {XMLHttpRequest} req
   * @return {object}
   */
  retrieveParams(req) {
    if (req.body && !_.isNil(req.body)) {
      let body = JSON.parse(req.body);
      if (body.params) {
        return body.params
      } else if (body) {
        return body
      }
    }
    return {}
  }

  /**
   * Add sub query base on request from user
   *
   * @param conditionFromReq
   * @return {object}
   */
  addSubQueryBaseOnRequest(req) {
    return {
      clientId: this.addQueryClientId(req),
      genreNo: this.addQueryGenreNo(req),
      showDate: this.addQueryShowDate(req),
      salesDate: this.addQuerySalesDate(req),
      keySearch: this.addQueryKeySearch(req),
      showGroupId: this.addQueryShowGroupId(req),
      adminTime: this.addQueryAdminTime(req)
    }
  }

  /**
   * Check operate search when user input title show and search
   *
   * @param req
   * @returns {boolean}
   */
  hasSearchClientId(req) {
    if (req && req.client_id && !_.isEmpty(req.client_id)) {
      return true;
    }
    return false;
  }

  /**
   * Check if user input show group id
   * @param req
   * @returns {boolean}
   */
  hasSearchShowGroupId(req) {
    if (req && req.show_group_id && !_.isEmpty(req.show_group_id)) {
      return true;
    }
    return false;
  }

  /**
   * Check operate search when user input title show and search
   * @param req
   * @returns {boolean}
   */
  hasSearchKey(req) {
    if (req && req.key_search && !_.isEmpty(req.key_search)) {
      return true;
    }
    return false;
  }

  /**
   * Check when user search with genre no
   * @param req
   * @returns {boolean}
   */
  hasSearchGenreNo(req) {
    if (req && req.genre_no && !_.isEmpty(req.genre_no)) {
      return true;
    }

    return false;
  }

  /**
   * Check when user search with show date
   * @param req
   * @returns {boolean}
   */
  hasSearchShowDate(req) {
    if (req && (req.from_show_date || req.to_show_date)) {
      return true;
    }
    return false;
  }

  /**
   * Check when user search with sales date
   * @param req
   * @returns {boolean}
   */
  hasSearchSalesDate(req) {
    if (req && (req.from_sales_date || req.to_sales_date)) {
      return true;
    }
    return false;
  }

  /**
   * Check when user search with sales date
   * @param req
   * @returns {boolean}
   */
  hasSearchAdminTime(req) {
    if (req && req.admin_time) {
      return true;
    }
    return false;
  }

  addQueryClientId(req) {
    if (this.hasSearchClientId(req)) {
      return ` a.client_id = $client_id`;
    }
    return '';
  }

  /**
   * Add sub query to show group id
   * @param req
   * @return {string}
   */
  addQueryShowGroupId(req) {
    if (this.hasSearchShowGroupId(req)) {
      if (!this.hasSearchClientId(req)) {
        return ' a.show_group_id = $show_group_id';
      }
      return ' AND a.show_group_id = $show_group_id';
    }
    return '';
  }

  /**
   * Add query to filter genre no when user input genre no
   * @param req
   * @returns {String}
   */
  addQueryGenreNo(req) {
    if (this.hasSearchGenreNo(req)) {
      return ' AND a.genre_no = ANY($genre_no)';
    }
    return '';
  }

  /**
   * Add query to filer show date when user input show date
   * @param req
   * @returns {String}
   */
  addQueryShowDate(req) {
    let query = '';
    if (this.hasSearchShowDate(req) && req.from_show_date) {
      query += ' AND f.show_date >= $from_show_date';
    }

    if (this.hasSearchShowDate(req) && req.to_show_date) {
      query += ' AND f.show_date <= $to_show_date';
    }

    return query;
  }

  /**
   * Add query to filter with sales date when user input sales date
   * @param req
   * @returns {String}
   */
  addQuerySalesDate(req) {
    var query = '';

    if (this.hasSearchSalesDate(req) && req.from_sales_date) {
      query += ` /*%if form.from_sales_date != "" */
               AND to_char(to_date(i.reserve_start, 'YYYYMMDDHH24MI'), 'YYYYMMDD') >= /* form.from_sales_date */$from_sales_date
              /*%end*/`;
    }

    if (this.hasSearchSalesDate(req) && req.to_sales_date) {
      query += ` /*%if form.to_sales_date != "" */
                and to_char(to_date(i.reserve_limit, 'YYYYMMDDHH24MI'), 'YYYYMMDD') <= /* form.to_sales_date */$to_sales_date
                /*%end*/`;
    }

    return ` and a.show_group_id in (
                  select distinct i.show_group_id from v_sales_handle_time i
                  where i.client_handle_kb = '2'
                  and i.reserve_start != ''
                  and i.reserve_limit != ''
                  and i.client_id = /* client_id */$client_id
                  ${query} )`;
  }

  /**
   * Add sub query when user search key into SQL query with condition from user
   *
   * @param {object} req
   * @returns {*}
   */
  addQueryKeySearch(req) {
    if (this.hasSearchKey(req)) {
      // When user input search key with space halsize, full size,...
      // Join string search condition
      let keyWhere = [];
      let key = req.key_search.trim().replace(/\s+/g, ' ')

      if (key.indexOf(' ') >= 0) {
        for (var i = 0; i < key.split(' ').length; i++) {
          keyWhere.push('LOWER($key_search)')
        }
      } else {
        // When user input key search not include space fullsize, halfsize, ...
        keyWhere = ['LOWER($key_search)'];
      }

      return ' AND LOWER(a.show_group_main_title || a.show_group_sub_title || a.list_explanation || a.detail_explanation)'
        + ' LIKE ALL(ARRAY[' + keyWhere.join(',') + '])';
    }
    return '';
  }

  /**
   * Add sub query sql to filter admin time
   * @param req
   */
  addQueryAdminTime(req) {
    if (this.hasSearchAdminTime(req) && req.admin_time) {
      return ` AND to_char(to_date(h.salesinfo_start_dtime, 'YYYYMMDDHH24MI'), 'YYYYMMDD') <= to_char(to_timestamp($admin_time, 'YYYY/MM/DD HH24:MI'), 'YYYYMMDDHH24MI')
        AND to_char(to_date(h.salesinfo_end_dtime, 'YYYYMMDDHH24MI'), 'YYYYMMDD') >= to_char(to_timestamp($admin_time, 'YYYY/MM/DD HH24:MI'), 'YYYYMMDDHH24MI')`;
    } else {
      return ` AND to_char(to_date(h.salesinfo_start_dtime, 'YYYYMMDDHH24MI'), 'YYYYMMDD') <= to_char(/* admin_time */now(), 'YYYYMMDDHH24MI')
          AND to_char(to_date(h.salesinfo_end_dtime, 'YYYYMMDDHH24MI'), 'YYYYMMDD') >= to_char(/* admin_time */now(), 'YYYYMMDDHH24MI')`;
    }
  }

  /**
   * Setting bind param with condition was setting
   *
   * @param conditionFromReq
   * @return void
   */
  bindValueToQuery(conditionFromReq) {
    let bindParam = {};
    // When user search with genre no
    if (!_.isNil(conditionFromReq.clientId) && !_.isNull(conditionFromReq.clientId)
      && !_.isEmpty(conditionFromReq.clientId)) {
      bindParam.client_id = conditionFromReq.clientId;
    }

    // When user search with show group
    if (!_.isNil(conditionFromReq.showGroupId) && !_.isNull(conditionFromReq.showGroupId)
      && !_.isEmpty(conditionFromReq.showGroupId)) {
      bindParam.show_group_id = conditionFromReq.showGroupId;
    }

    // When user search with genre no
    if (!_.isNil(conditionFromReq.genreNo) && !_.isNull(conditionFromReq.genreNo)
      && !_.isEmpty(conditionFromReq.genreNo)) {
      bindParam.genre_no = conditionFromReq.genreNo;
    }

    // When user input from show date
    if (!_.isNil(conditionFromReq.fromShowDate) && !_.isNull(conditionFromReq.fromShowDate)
      && !_.isEmpty(conditionFromReq.fromShowDate)) {
      bindParam.from_show_date = conditionFromReq.fromShowDate;
    }

    // When user input to show date
    if (!_.isNil(conditionFromReq.toShowDate) && !_.isNull(conditionFromReq.toShowDate)
      && !_.isEmpty(conditionFromReq.toShowDate)) {
      bindParam.to_show_date = conditionFromReq.toShowDate;
    }

    // When user input from sales date
    if (!_.isNil(conditionFromReq.fromSalesDate) && !_.isNull(conditionFromReq.fromSalesDate)
      && !_.isEmpty(conditionFromReq.fromSalesDate)) {
      bindParam.from_sales_date = conditionFromReq.fromSalesDate;
    }

    // When user input to sales date
    if (!_.isNil(conditionFromReq.toSalesDate) && !_.isNull(conditionFromReq.toSalesDate)
      && !_.isEmpty(conditionFromReq.toSalesDate)) {
      bindParam.to_sales_date = conditionFromReq.toSalesDate;
    }

    // When user input key word then add condition with key word and bind param resposible
    if (!_.isNil(conditionFromReq.key) && !_.isNull(conditionFromReq.key) && !_.isEmpty(conditionFromReq.key)) {
      let keyBind = [];
      // When user input key search with space fullsize, halfsize, ...
      if (conditionFromReq.key.indexOf(' ') >= 0) {
        let splCondition = conditionFromReq.key.split(' ')
        for (var i = 0; i < splCondition.length; i++) {
          keyBind.push(`%${splCondition[i]}%`)
        }
      } else {
        // When user input key search not include space halfsize, fullsize, ...
        keyBind = `%${conditionFromReq.key}%`
      }
      // Bind param into key search
      bindParam.key_search = keyBind
    }

    if (!_.isNil(conditionFromReq.startPosition) && !_.isNull(conditionFromReq.startPosition)
      && _.isNumber(conditionFromReq.startPosition) && conditionFromReq.startPosition > 0) {
      bindParam.min_no_show_group = conditionFromReq.startPosition;
    }

    if (!_.isNil(conditionFromReq.endPosition) && !_.isNull(conditionFromReq.endPosition)
      && _.isNumber(conditionFromReq.endPosition) && conditionFromReq.endPosition > 0) {
      bindParam.max_no_show_group = conditionFromReq.endPosition;
    }

    if (!_.isNil(conditionFromReq.adminTime) && !_.isNull(conditionFromReq.adminTime)) {
      bindParam.admin_time = conditionFromReq.adminTime;
    }

    // When user search with key word
    return bindParam;
  }

  /**
   * Get list show schedule base on
   *
   * @param {event} request
   * @return {Promise}
   */
  getScheduleShow(request) {
    let params = this.retrieveParams(request)
    let condition = this.convertRequestToCondition(params)
    let queryCondition = this.addSubQueryBaseOnRequest(params)
    let bindValueQuery = this.bindValueToQuery(condition)
    return new Promise((resolve, reject) => {
      // Check exists client id from client
      if (!CommonClientId.checkExistsClientIdInRequest(request)) {
        reject(Config.Common.MSG_REQUIRE_CLIENT_ID)
      }
      let queryDb = this.getSqlStringScheduleShow(condition, queryCondition);

      // Execute query string
      this.db.query(queryDb, {
        type: this.db.QueryTypes.SELECT,
        bind: bindValueQuery
      })
        .then(data => {
          let res = {
            record_num: data ? data.length : 0,
            schedule_list: data
          }
          if (res && res.record_num > 0) {
            res = Object.assign(res, data[0])
            res.schedule_list = this.addSubSalesToSchedule(res)
          }
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    });
  }

  /**
   * Process load string SQL from file and replace condition where
   * @return {String}
   */
  getSqlStringScheduleShow(condition, queryCondition) {
    // Load file SQL
    var queryDb = this.helper.loadSql(this.config.SQL_LIST_SHOW_SCHEDULE);

    // If user search with show group id, replace sub query from query string in file
    if (condition.adminTime && !_.isNil(condition.adminTime)) {
      queryDb = queryDb.replace('#replace_admin_time', `to_timestamp($adminTime, 'YYYY/MM/DD HH24:MI')`);
    } else {
      queryDb = queryDb.replace('#replace_admin_time', `now()`)
    }
    // Replace all sub query in query string from file
    queryDb = queryDb.replace('#replace_admin_time', '')

    return queryDb;
  }

  /**
   * Convert data to format response
   * @param show
   * @return {Array}
   */
  addSubSalesToSchedule(show) {
    var tmpShow = []
    show.schedule_list.forEach(function (el, i) {
      var tex = Object.assign({}, el);
      el.sales_list = [tex]
      let indexExistsShow = tmpShow.findIndex(function (te) {
        return te.show_no == el.show_no
      })

      if (indexExistsShow >= 0) {
        if (!tmpShow[indexExistsShow].sales_list) {
          tmpShow[indexExistsShow].sales_list = [tex]
        } else {
          tmpShow[indexExistsShow].sales_list.push(tex)
        }
      } else {
        tmpShow.push(el)
      }
    })

    return tmpShow;
  }
}

export {
  ShowBusiness
}