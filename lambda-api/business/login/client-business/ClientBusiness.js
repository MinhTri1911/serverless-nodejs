/**
 * File ClientBussiness.js
 * Get info by client_id
 *
 * @class ClientBussiness
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import { Helper } from '../../../common/Helper';
import _ from 'lodash';

class ClientBusiness {
  /**
   * Constructor set instance sequelize
   *
   * @param {*} db
   * @returns { Object } - Returns the current object.
   */
  constructor(db) {
    this.db = db;
	  this.helper = new Helper();
    return this;
	}

  /**
   * Function will get info of client
   *
   * @param {*} data
   * @param {*}
   * @returns {result query}
   */
  getClient(data) {
    let {client_id} = data;
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL060.sql');
      this.db.query(sql, {bind: { client_id: client_id }, type: this.db.QueryTypes.SELECT})
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          console.error(err);
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
	}
}

export { ClientBusiness }
