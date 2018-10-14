import {Show} from "../models/Show"
import Config from "../config/Constant";
import _ from "lodash"

class ShowBusiness {
  /**
   *
   * @param db
   * @returns {ShowBusiness}
   */
  constructor(db) {
    this.db = db;
    let show = new Show();
    this.showModel = show.defineShowSchema(this.db)
    this.config = Config.ShowConfig;

    return this;
  }

  /**
   * Convert request user to data search show
   *
   * @param req
   * @return {Object}
   */
  convertRequestToCondition(req) {
    let condition = {
      limit: req && req.limit ? Number(req.limit) : this.config.RECORD_SHOW_PER_PAGE,
      offset: req && req.offset ? Number(req.offset) : 0
    };

    if (this.hasSearchClientId(req)) {
      condition.clientId = req.client_id;
    }

    if (this.hasSearchKey(req)) {
      condition.key = req.q ? req.q.trim().replace(/\s+/g, ' ') : '';
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

    return condition;
  }

  /**
   * Get Shows base on reuqest from user
   *
   * @param {XMLHttpRequest} req
   * @return {Promise}
   */
  getShows(req) {
    // console.log(req);
    let params = this.retrieveParams(req)
    let condition = this.convertRequestToCondition(params)
    let queryCondition = this.addSubQueryBaseOnRequest(params)
    let bindValueQuery = this.bindValueToQuery(condition)
    return new Promise((resolve, reject) => {
      let where = `${queryCondition.clientId}
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

      this.db.query(`
                    SELECT a.client_id,
                           l.number,
                           max(ll.number) over() AS total,
                           a.show_group_id,
                           b.sales_no,
                           b.show_no,
                           a.show_group_main_title,
                           c.koen_kikan AS show_term,
                           d.genre_nm,
                           e.message AS show_group_sales_status,
                           j.code_nm,
                           a.list_explanation,
                           CASE
                               WHEN a.show_group_disp_kb = '1' THEN f.hall_nm
                               ELSE ''
                           END AS hall_nm,
                           g.info AS show_sales_status,
                           h.sales_nm,
                           h.sales_explanation,
                           CASE
                               WHEN i.reserve_start = ''
                                    OR i.reserve_limit = '' THEN ''
                               ELSE to_char(to_date(i.reserve_start, 'YYYYMMDDHH24MI'), 'yyyy/FMMM/FMdd') || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(i.reserve_start,'YYYYMMDDHH24MI')) + 1] || ')' || to_char(to_timestamp(i.reserve_start, 'YYYYMMDDHH24MI'), 'HH24:MI') || '　～　' || to_char(to_date(i.reserve_limit, 'YYYYMMDDHH24MI'), 'yyyy/FMMM/FMdd') || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(i.reserve_limit,'YYYYMMDDHH24MI')) + 1] || ')' || to_char(to_timestamp(i.reserve_limit, 'YYYYMMDDHH24MI'), 'HH24:MI')
                           END AS sales_term,
                           c.min_show AS disp_sort,
                           CASE
                               WHEN a.show_group_disp_kb = '1'
                                    AND e.group_sales_kbn IN ('0',
                                                              '1') THEN '1'
                               WHEN a.show_group_disp_kb = '2'
                                    AND g.yusen_kbn IN ('0',
                                                        '1') THEN '1'
                               ELSE '0'
                           END AS select_button_disp_flg,
                           count(a.client_id) OVER () AS show_cnt,
                                                   a.show_group_disp_kb,
                                                   CASE
                                                       WHEN f.hall_view_flg = '0'
                                                            AND k.min_seat_type_kb = '1'
                                                            AND h.internet_seat_kb = '1' THEN '1'
                                                       ELSE '0'
                                                   END AS seat_selection_flg
                    FROM t_show_group a
                    INNER JOIN t_sales_show b ON a.client_id = b.client_id
                    AND a.show_group_id = b.show_group_id
                    INNER JOIN v_show_group_koen_kikan c ON a.client_id = c.client_id
                    AND a.show_group_id = c.show_group_id
                    INNER JOIN m_genre d ON a.client_id = d.client_id
                    AND a.genre_no = d.genre_no
                    INNER JOIN v_show_group_sales_status e ON a.client_id = e.client_id
                    AND a.show_group_id = e.show_group_id
                    INNER JOIN t_show f ON a.client_id = f.client_id
                    AND a.show_group_id = f.show_group_id
                    AND b.show_no = f.show_no
                    INNER JOIN v_show_sales_status g ON a.client_id = g.client_id
                    AND a.show_group_id = g.show_group_id
                    AND b.sales_no = g.sales_no
                    AND b.show_no = g.show_no
                    INNER JOIN t_sales h ON a.client_id = h.client_id
                    AND a.show_group_id = h.show_group_id
                    AND b.sales_no = h.sales_no
                    INNER JOIN v_sales_handle_time i ON b.client_id = i.client_id
                    AND b.show_group_id = i.show_group_id
                    AND b.sales_no = i.sales_no
                    AND b.show_no = i.show_no
                    AND i.client_handle_kb = '2'
                    LEFT OUTER JOIN
                      (SELECT code_no,
                              code_nm
                       FROM m_code
                       WHERE code_type_cd = '0043' ) j ON a.list_image_kb = j.code_no
                    INNER JOIN
                      (SELECT client_id,
                              show_group_id,
                              min(seat_type_kb) AS min_seat_type_kb
                       FROM t_seat_type
                       GROUP BY client_id,
                                show_group_id) k ON a.client_id = k.client_id
                    AND a.show_group_id = k.show_group_id
                    
                    /* To get show group */
                    INNER JOIN
                      (SELECT row_number() OVER () AS number,
                                                a.client_id,
                                                a.show_group_id,
                                                c.min_show AS disp_sort
                       FROM t_show_group a
                       INNER JOIN t_sales_show b ON a.client_id = b.client_id
                       AND a.show_group_id = b.show_group_id
                       INNER JOIN v_show_group_koen_kikan c ON a.client_id = c.client_id
                       AND a.show_group_id = c.show_group_id
                       INNER JOIN m_genre d ON a.client_id = d.client_id
                       AND a.genre_no = d.genre_no
                       INNER JOIN v_show_group_sales_status e ON a.client_id = e.client_id
                       AND a.show_group_id = e.show_group_id
                       INNER JOIN t_show f ON a.client_id = f.client_id
                       AND a.show_group_id = f.show_group_id
                       AND b.show_no = f.show_no
                       INNER JOIN v_show_sales_status g ON a.client_id = g.client_id
                       AND a.show_group_id = g.show_group_id
                       AND b.sales_no = g.sales_no
                       AND b.show_no = g.show_no
                       INNER JOIN t_sales h ON a.client_id = h.client_id
                       AND a.show_group_id = h.show_group_id
                       AND b.sales_no = h.sales_no
                       INNER JOIN v_sales_handle_time i ON b.client_id = i.client_id
                       AND b.show_group_id = i.show_group_id
                       AND b.sales_no = i.sales_no
                       AND b.show_no = i.show_no
                       AND i.client_handle_kb = '2'
                       LEFT OUTER JOIN
                         (SELECT code_no,
                                 code_nm
                          FROM m_code
                          WHERE code_type_cd = '0043' ) j ON a.list_image_kb = j.code_no
                       INNER JOIN
                         (SELECT client_id,
                                 show_group_id,
                                 min(seat_type_kb) AS min_seat_type_kb
                          FROM t_seat_type
                          GROUP BY client_id,
                                   show_group_id) k ON a.client_id = k.client_id
                       AND a.show_group_id = k.show_group_id
                       WHERE
                       ${where}
                       GROUP BY a.client_id,
                                a.show_group_id,
                                c.min_show
                       ORDER BY a.client_id,
                                c.min_show,
                                a.show_group_id) l ON a.client_id = l.client_id
                    AND a.show_group_id = l.show_group_id
                    AND l.number >= $minNoShowGroup
                    AND l.number < $maxNoShowGroup
                    
                    /*To get max num of number row to get total paginate*/
                    INNER JOIN
                      (SELECT row_number() OVER (
                                                 ORDER BY a.show_group_id DESC) AS number,
                                                a.client_id ,
                                                a.show_group_id,
                                                c.min_show AS disp_sort
                       FROM t_show_group a
                       INNER JOIN t_sales_show b ON a.client_id = b.client_id
                       AND a.show_group_id = b.show_group_id
                       INNER JOIN v_show_group_koen_kikan c ON a.client_id = c.client_id
                       AND a.show_group_id = c.show_group_id
                       INNER JOIN m_genre d ON a.client_id = d.client_id
                       AND a.genre_no = d.genre_no
                       INNER JOIN v_show_group_sales_status e ON a.client_id = e.client_id
                       AND a.show_group_id = e.show_group_id
                       INNER JOIN t_show f ON a.client_id = f.client_id
                       AND a.show_group_id = f.show_group_id
                       AND b.show_no = f.show_no
                       INNER JOIN v_show_sales_status g ON a.client_id = g.client_id
                       AND a.show_group_id = g.show_group_id
                       AND b.sales_no = g.sales_no
                       AND b.show_no = g.show_no
                       INNER JOIN t_sales h ON a.client_id = h.client_id
                       AND a.show_group_id = h.show_group_id
                       AND b.sales_no = h.sales_no
                       INNER JOIN v_sales_handle_time i ON b.client_id = i.client_id
                       AND b.show_group_id = i.show_group_id
                       AND b.sales_no = i.sales_no
                       AND b.show_no = i.show_no
                       AND i.client_handle_kb = '2'
                       LEFT OUTER JOIN
                         (SELECT code_no,
                                 code_nm
                          FROM m_code
                          WHERE code_type_cd = '0043' ) j ON a.list_image_kb = j.code_no
                       INNER JOIN
                         (SELECT client_id,
                                 show_group_id,
                                 min(seat_type_kb) AS min_seat_type_kb
                          FROM t_seat_type
                          GROUP BY client_id,
                                   show_group_id) k ON a.client_id = k.client_id
                       AND a.show_group_id = k.show_group_id
                       WHERE 
                        ${where}
                       GROUP BY a.client_id,
                                a.show_group_id,
                                c.min_show
                       ORDER BY a.client_id,
                                c.min_show,
                                a.show_group_id) ll ON a.client_id = ll.client_id
                    AND a.show_group_id = ll.show_group_id
                    WHERE
                      ${where}
                    ORDER BY a.client_id,
                             disp_sort,
                             a.show_group_id,
                             b.sales_no,
                             b.show_no`,
        {
          bind: bindValueQuery,
          type: this.db.QueryTypes.SELECT
        })
        .then(data => {
          let response = {
            result: {
              record_num: data && data.length > 0 ? data[0].total : 0,
              show_list: data
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
      keySearch: this.addQueryKeySearch(req)
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
   * Check operate search when user input title show and search
   * @param req
   * @returns {boolean}
   */
  hasSearchKey(req) {
    if (req && req.q && !_.isEmpty(req.q)) {
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

  addQueryClientId(req) {
    if (this.hasSearchClientId(req)) {
      return ' a.client_id = $clientId';
    }
    return '';
  }

  /**
   *
   * @param req
   * @returns {String}
   */
  addQueryGenreNo(req) {
    if (this.hasSearchGenreNo(req)) {
      return ' AND a.genre_no = ANY($genreNo)';
    }
    return '';
  }

  /**
   *
   * @param req
   * @returns {String}
   */
  addQueryShowDate(req) {
    let query = '';
    if (this.hasSearchShowDate(req) && req.from_show_date) {
      query += ' AND f.show_date >= $fromShowDate';
    }

    if (this.hasSearchShowDate(req) && req.to_show_date) {
      query += ' AND f.show_date <= $toShowDate';
    }

    return query;
  }

  /**
   *
   * @param req
   * @returns {String}
   */
  addQuerySalesDate(req) {
    let query = '';
    if (this.hasSearchSalesDate(req) && req.from_sales_date) {
      query += " AND to_char(to_date(h.salesinfo_start_dtime,'YYYYMMDDHH24MI'),'YYYYMMDD') >= $fromSalesDate"
        + " AND to_char(to_date(h.salesinfo_end_dtime,'YYYYMMDDHH24MI'),'YYYYMMDD') <= $fromSalesDate";
    }

    if (this.hasSearchSalesDate(req) && req.to_sales_date) {
      query += " AND to_char(to_date(h.salesinfo_start_dtime,'YYYYMMDDHH24MI'),'YYYYMMDD') >= $toSalesDate"
        + " AND to_char(to_date(h.salesinfo_end_dtime,'YYYYMMDDHH24MI'),'YYYYMMDD') <= $toSalesDate";
    }

    return query;
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
      let key = req.q.trim().replace(/\s+/g, ' ')

      if (key.indexOf(' ') >= 0) {
        for (var i = 0; i < key.split(' ').length; i++) {
          keyWhere.push('LOWER($keySearch)')
        }
      } else {
        // When user input key search not include space fullsize, halfsize, ...
        keyWhere = ['LOWER($keySearch)'];
      }

      return ' AND LOWER(a.show_group_main_title || a.show_group_sub_title || a.list_explanation || a.detail_explanation)'
        + ' LIKE ALL(ARRAY[' + keyWhere.join(',') + '])';
    }
    return '';
  }

  /**
   * Setting bind pẩm with condition was setting
   *
   * @param conditionFromReq
   * @return void
   */
  bindValueToQuery(conditionFromReq) {
    let bindParam = {};
    // When user search with genre no
    if (!_.isNil(conditionFromReq.clientId) && !_.isNull(conditionFromReq.clientId)
      && !_.isEmpty(conditionFromReq.clientId)) {
      bindParam.clientId = conditionFromReq.clientId;
    }

    // When user search with genre no
    if (!_.isNil(conditionFromReq.genreNo) && !_.isNull(conditionFromReq.genreNo)
      && !_.isEmpty(conditionFromReq.genreNo)) {
      bindParam.genreNo = conditionFromReq.genreNo;
    }

    // When user input from show date
    if (!_.isNil(conditionFromReq.fromShowDate) && !_.isNull(conditionFromReq.fromShowDate)
      && !_.isEmpty(conditionFromReq.fromShowDate)) {
      bindParam.fromShowDate = conditionFromReq.fromShowDate;
    }

    // When user input to show date
    if (!_.isNil(conditionFromReq.toShowDate) && !_.isNull(conditionFromReq.toShowDate)
      && !_.isEmpty(conditionFromReq.toShowDate)) {
      bindParam.toShowDate = conditionFromReq.toShowDate;
    }

    // When user input from sales date
    if (!_.isNil(conditionFromReq.fromSalesDate) && !_.isNull(conditionFromReq.fromSalesDate)
      && !_.isEmpty(conditionFromReq.fromSalesDate)) {
      bindParam.fromSalesDate = conditionFromReq.fromSalesDate;
    }

    // When user input to sales date
    if (!_.isNil(conditionFromReq.toSalesDate) && !_.isNull(conditionFromReq.toSalesDate)
      && !_.isEmpty(conditionFromReq.toSalesDate)) {
      bindParam.toSalesDate = conditionFromReq.toSalesDate;
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
      bindParam.keySearch = keyBind
    }

    if (!_.isNil(conditionFromReq.offset) && !_.isNull(conditionFromReq.offset)) {
      bindParam.minNoShowGroup = Number(conditionFromReq.offset) + 1;
    }

    if (!_.isNil(conditionFromReq.limit) && !_.isNull(conditionFromReq.limit)
      && _.isNumber(conditionFromReq.limit) && conditionFromReq.limit > 0) {
      bindParam.maxNoShowGroup =  Number(conditionFromReq.offset) + Number(conditionFromReq.limit) + 1;
    }
console.log(bindParam)
    // When user search with key word
    return bindParam;
  }
}

export {ShowBusiness}