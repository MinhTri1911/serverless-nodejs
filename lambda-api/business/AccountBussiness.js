import { Account, Member } from '../models/Account';
import { Helper } from '../common/Helper';
const secretKey = process.env.SECRET_KEY;
import crypto from 'crypto';
class AccountBussiness {

  /**
   * Creates an instance of Account.
   *
   * @param {*} db
   * @memberof Account
   * @returns { Object } - Returns the current object.
   */
  constructor(db) {
    this.db = db;
    let account = new Account();
    this.helper = new Helper();
    let member = new Member();
    this.accountModel = account.defineAccountSchema(this.db)


    return this;
  }

  /**
   * Function get all account
   *
   * @returns {Array}
   * @memberof Account
   */
  getAccounts() {
    return new Promise((resolve, reject) => {
      this.accountModel.findAll({})
        .then(data => {
          let response = {
            result: data,
          };

          resolve(response);
        })
        .catch(err => {
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
  }

  /**
   * Function create account
   *
   * @param {*} body
   * @returns
   * @memberof Account
   */
  createAccount(body) {
    const {
      client_id,
      account_id,
      account_password,
      account_nm,
      account_kn,
      mail_address,
      apply_start_date,
      apply_end_date,
      enable_kb,
      notes,
      permission_group_no,
      ins_pg_id,
      ins_client_id,
      ins_employee_cd,
      ins_dtime,
      upd_pg_id,
      upd_client_id,
      upd_employee_cd,
      upd_dtime
    } = body;

    return new Promise((resolve, reject) => {
      this.db.transaction(t => {
        return this.accountModel.create({
          client_id,
          account_id,
          account_password,
          account_nm,
          account_kn,
          mail_address,
          apply_start_date,
          apply_end_date,
          enable_kb,
          notes,
          permission_group_no,
          ins_pg_id,
          ins_client_id,
          ins_employee_cd,
          ins_dtime,
          upd_pg_id,
          upd_client_id,
          upd_employee_cd,
          upd_dtime
        }, {transaction: t});
      })
      .then(data => {
        let result = {
          result: {
            mail: mail_address,
            password: account_password,
            clientId: client_id,
            accountId: account_id
          }
        }

        resolve(result);
      })
      .catch(err => {
        reject(new Error(`Something Went Wrong ${err}`));
      });
    });
  }

  getUserByEmail(data) {
    let { client_id, member_pass, mail_address } = data;
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQLCheckToken.sql');
      this.db.query(sql, {
        bind: {
          clientid: client_id, idlogin: mail_address, password: member_pass
        }, type: this.db.QueryTypes.SELECT
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
  }

  getUserByToken(data) {
    let { member_id, member_pass, mail_address, iat, exp } = data
    console.log({ member_id, member_pass, mail_address, iat, exp })
   return new Promise((resolve, reject) => {
    this.db.query(`

    `, {bind: { idlogin: mail_address, password: member_pass, memberid: member_id ,  }, type: this.db.QueryTypes.SELECT})
    .then(result => {
      //console.log(result);
      resolve(result);
    })
    .catch(err => {
      reject(new Error(`Something Went Wrong ${err}`));
    });
  });
  }





}





export { AccountBussiness }
