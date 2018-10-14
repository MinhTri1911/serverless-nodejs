import Config from "../config/Constant";
import _ from "lodash"
import Common from "../common/ClientId"

class NotifyBusiness {
  /**
   *
   * @param db
   * @returns {NotifyBusiness}
   */
  constructor(db) {
    this.db = db;
    return this;
  }

  /**
   * Get list notify from database
   * @param {event} event
   * @return {Promise}
   */
  getNotifies(event) {
    console.log(event)
    return new Promise((resolve, reject) => {
      // Check exists client id from request user to API
      if (!Common.checkExistsClientIdInRequest(event)) {
        return reject('Not found client Id from request');
      }

      let clientId = JSON.parse(event.body).client_id;
      let page = event.body && JSON.parse(event.body).page ? JSON.parse(event.body).page : 1;
      let offset = page > 1 ? (page - 1) * Config.NotifyConfig.RECORD_SHOW_PER_PAGE : 0;

      return this.db.query(`SELECT
          count(*) over() as total,
          client_id
          , to_char(to_date(apply_start_dtime, 'YYYYMMDDHH24MI'), 'yyyy/FMMM/FMdd' )
           || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(apply_start_dtime,'YYYYMMDDHH24MI')) + 1]
           || ')' as apply_start_dtime
          , information_title
          , information_contents 
        FROM
          m_information 
        WHERE
          client_id = $clientId
          AND to_char(now(), 'YYYYMMDDHH24MI') >= apply_start_dtime 
          AND to_char(now(), 'YYYYMMDDHH24MI') <= apply_end_dtime 
        ORDER BY
          apply_start_dtime DESC
          offset $offset limit $limit`,
        {
          type: this.db.QueryTypes.SELECT,
          bind: {
            clientId: clientId,
            offset: offset,
            limit: Config.NotifyConfig.RECORD_SHOW_PER_PAGE
          }
        })
        .then(result => {
          let res = {
            record_num: result ? result[0].total : 0,
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