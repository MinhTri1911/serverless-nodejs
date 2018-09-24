import Sequelize from "sequelize";

class Account {
  /**
   * Function define schema struct
   *
   * @returns {object} model of the table
   * @memberof Account
   */
  defineAccountSchema(db) {
    const model = db.define(
      "m_account",
      {
        client_id: {
          allowNull: false,
          type: Sequelize.STRING(10),
          primaryKey: true
        },
        account_id: {
          allowNull: false,
          type: Sequelize.STRING(20),
          primaryKey: true
        },
        account_password: {
          allowNull: false,
          type: Sequelize.STRING(64)
        },
        account_nm: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        account_kn: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        mail_address: {
          allowNull: false,
          type: Sequelize.STRING(200)
        },
        apply_start_date: {
          allowNull: false,
          type: Sequelize.STRING(8)
        },
        apply_end_date: {
          allowNull: false,
          type: Sequelize.STRING(8)
        },
        enable_kb: {
          allowNull: false,
          type: Sequelize.STRING(1)
        },
        notes: {
          allowNull: true,
          type: Sequelize.STRING(400)
        },
        permission_group_no: {
          allowNull: false,
          type: Sequelize.BIGINT
        },
        ins_pg_id: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        ins_client_id: {
          allowNull: false,
          type: Sequelize.STRING(10)
        },
        ins_employee_cd: {
          allowNull: true,
          type: Sequelize.STRING(20)
        },
        ins_dtime: {
          allowNull: true,
          type: Sequelize.DATE
        },
        upd_pg_id: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        upd_client_id: {
          allowNull: false,
          type: Sequelize.STRING(10)
        },
        upd_employee_cd: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        upd_dtime: {
          allowNull: true,
          type: Sequelize.DATE
        }
      }, {
        schema: 'ticket2',
        timestamps: false,
        paranoid: true,
        tableName: "m_account",
      });

    // model.associate = function(models) {
    //   // associations can be defined here
    // };

    return model;
  }
}

export { Account }
