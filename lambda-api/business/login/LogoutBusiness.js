/**
 * File LogoutBusiness.js
 * Save on database when user logout
 *
 * @class LogoutBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-12
 */

import { Helper } from '../../common/Helper';
 
class LogoutBusiness {
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
   * Function will insert table h_login
   *
   * @param {*} data
   * @param {*} ip
   * @returns {result query}
   */
  logout(data, clientIp ) {
    let { client_id, member_id } = data;
    let ip = clientIp;
    return new Promise((resolve, reject) => {
      let sqlInsert = this.helper.loadSql('SQL023.sql');
      this.db.query(sqlInsert, {
        bind: {
          result_kb: '1',
          loginkb: '2',
          clientid: client_id,
          memberid: member_id,
          ip_address: ip
        },
        type: this.db.QueryTypes.INSERT
      }).then(result =>{
          resolve(result);
        })
      .catch(function(err) {
        console.error(err);
        reject(new Error(`Something Went Wrong ${err}`));
      });
    })
    .catch(err => {
      console.error(err);
      reject(new Error(`Something Went Wrong ${err}`));
    });
	}
}

export { LogoutBusiness }
