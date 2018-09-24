import Sequelize from "sequelize";
import { Account } from '../models/Account'

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
    // this.accountModel = this.defineAccountSchema();
    let account = new Account();
    this.accountModel = account.defineAccountSchema(this.db)

    return this;
  }

  // /**
  //  * Function define schema struct
  //  *
  //  * @returns {object} model of the table
  //  * @memberof Account
  //  */
  // defineAccountSchema() {
  //   const model = this.db.define(
  //     "m_account",
  //     {
  //       client_id: {
  //         allowNull: false,
  //         type: Sequelize.STRING(10),
  //         primaryKey: true
  //       },
  //       account_id: {
  //         allowNull: false,
  //         type: Sequelize.STRING(20),
  //         primaryKey: true
  //       },
  //       account_password: {
  //         allowNull: false,
  //         type: Sequelize.STRING(64)
  //       },
  //       account_nm: {
  //         allowNull: false,
  //         type: Sequelize.STRING(100)
  //       },
  //       account_kn: {
  //         allowNull: false,
  //         type: Sequelize.STRING(100)
  //       },
  //       mail_address: {
  //         allowNull: false,
  //         type: Sequelize.STRING(200)
  //       },
  //       apply_start_date: {
  //         allowNull: false,
  //         type: Sequelize.STRING(8)
  //       },
  //       apply_end_date: {
  //         allowNull: false,
  //         type: Sequelize.STRING(8)
  //       },
  //       enable_kb: {
  //         allowNull: false,
  //         type: Sequelize.STRING(1)
  //       },
  //       notes: {
  //         allowNull: true,
  //         type: Sequelize.STRING(400)
  //       },
  //       permission_group_no: {
  //         allowNull: false,
  //         type: Sequelize.BIGINT
  //       },
  //       ins_pg_id: {
  //         allowNull: false,
  //         type: Sequelize.STRING(20)
  //       },
  //       ins_client_id: {
  //         allowNull: false,
  //         type: Sequelize.STRING(10)
  //       },
  //       ins_employee_cd: {
  //         allowNull: true,
  //         type: Sequelize.STRING(20)
  //       },
  //       ins_dtime: {
  //         allowNull: true,
  //         type: Sequelize.DATE
  //       },
  //       upd_pg_id: {
  //         allowNull: false,
  //         type: Sequelize.STRING(20)
  //       },
  //       upd_client_id: {
  //         allowNull: false,
  //         type: Sequelize.STRING(10)
  //       },
  //       upd_employee_cd: {
  //         allowNull: false,
  //         type: Sequelize.STRING(20)
  //       },
  //       upd_dtime: {
  //         allowNull: true,
  //         type: Sequelize.DATE
  //       }
  //     }, {
  //       schema: 'ticket2',
  //       timestamps: false,
  //       paranoid: true,
  //       tableName: "m_account",
  //     });

  //   // model.associate = function(models) {
  //   //   // associations can be defined here
  //   // };

  //   return model;
  // }

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
            code: 200
          };
          console.log(response)
          resolve(response);
        })
        .catch(err => {
          console.log(err)
          reject(new Error(`Something Went Wrong ${err}`));
        });
    })
    .catch(err => {
      reject(new Error(`Something Went Wrong ${err}`));
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
          code: 200,
          result: {
            mail_address: mail_address,
            account_password: account_password,
            client_id: client_id,
            account_id: account_id
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
    let { mail, password, clientId, accountId } = data;

    return new Promise((resolve, reject) => {
      this.accountModel.findAll({
        attributes: ['client_id', 'account_id', 'account_password', 'mail_address'],
        where: {
          mail_address: mail,
          account_password: password,
          client_id: clientId,
          account_id: accountId
        }
      })
      .then(data => {
        let result = {
          code: 200,
          result: data
        }

        resolve(result);
      })
      .catch(err => {
        reject(new Error(`Something Went Wrong ${err}`));
      });
    });
  }
}

export { AccountBussiness }
