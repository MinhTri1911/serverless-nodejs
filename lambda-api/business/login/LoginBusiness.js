/**
 * File LoginBusiness.js
 * Check email and password to Login
 *
 * @class LoginBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { Helper } from '../../common/Helper';
import crypto from 'crypto';

const secretKey = process.env.SECRET_KEY;
class LoginBusiness {
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
   * Function will get data client by email and password and update table h_login
   *
   * @param {*} data
   * @param {*} ip
   * @returns {result query}
   */
  getUserByEmail(data, clientIp ) {
    let { mail, password, client_id } = data;
    let ip = clientIp;
    password = crypto.createHash('sha256').update(secretKey + password).digest('hex')
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL012.sql');
      this.db.query(sql, {bind: { clientid: client_id, idlogin: mail, password: password }, type: this.db.QueryTypes.SELECT})
        .then(result => {

          // Select successful we insert to h_login
          if (result!='' && result[0].black_cd!='1') {
            let sqlInsert = this.helper.loadSql('SQL023.sql');
            this.db.query(sqlInsert, {
              bind: {
                result_kb: '1',
                loginkb: '1',
                clientid: client_id,
                memberid: result[0].member_id,
                ip_address: ip
              },
              type: this.db.QueryTypes.INSERT
            })
            .catch(function(err) {
              console.error(err);
              reject(new Error(`Something Went Wrong ${err}`));
            });
          }

        // Case for black_cd ==1
        if (result!='' && result[0].black_cd=='1') {
			    let sqlInsert = this.helper.loadSql('SQL023.sql');
  				this.db.query(sqlInsert, {
            bind: {
              result_kb: '2',
              loginkb: '1',
              clientid: client_id,
              memberid: result[0].member_id,
              ip_address: ip
            },
						type: this.db.QueryTypes.INSERT
					})
					.catch(function(err) {
            console.error(err);
            reject(new Error(`Something Went Wrong ${err}`));
          });
        }

        // Select fail we insert to h_login
        if (result=='') {
		      let sqlInsert = this.helper.loadSql('SQL023.sql');
          this.db.query(sqlInsert, {
            bind: {
              result_kb: '2',
              loginkb: '1',
              clientid: client_id,
              memberid: '',
              ip_address: ip
            },
            type: this.db.QueryTypes.INSERT
          })
          .catch(function(err) {
            console.error(err);
            reject(new Error(`Something Went Wrong ${err}`));
          });
        }

        resolve(result);
      })
      .catch(err => {
        console.error(err);
        reject(new Error(`Something Went Wrong ${err}`));
      });
    });
	}

	/**
	 * Function to check data user by token
	 *
	 * @param {token} data
	 * @returns {result query} result
	 */
  getUserByToken(data) {
		let { client_id, member_id, member_pass, mail_address, iat, exp } = data;
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQLCheckToken.sql');
      this.db.query(sql, {
        bind: {
          idlogin: mail_address,
          password: member_pass,
          clientid: client_id ,
          memberid: member_id
        }, type: this.db.QueryTypes.SELECT
      })
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

export { LoginBusiness }
