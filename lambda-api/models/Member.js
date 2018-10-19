
import Sequelize from "sequelize";

class Member {
  /**
   * Function define schema struct
   *
   * @returns {object} model of the table
   * @memberof Member
   */
  defineMemberSchema(db) {
    const model = db.define(
      "m_member",
      {
        client_id: {
          allowNull: false,
          type: Sequelize.STRING(10),
          primaryKey: true
        },
        member_id: {
          allowNull: false,
          type: Sequelize.STRING(16),
          primaryKey: true
        },
        member_pass: {
          allowNull: false,
          type: Sequelize.STRING(64)
        },
        member_nm: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        member_kn: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        post_no: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        prefecture: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        municipality: {
          allowNull: false,
          type: Sequelize.STRING(200)
        },
        address1: {
          allowNull: false,
          type: Sequelize.STRING(400)
        },
        address2: {
          allowNull: false,
          type: Sequelize.STRING(400)
        },
        tel_no: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        mobile_no: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        mail_address: {
          allowNull: false,
          type: Sequelize.STRING(200)
        },
        mail_send_flg: {
          allowNull: false,
          type: Sequelize.STRING(1)
        },
        post_send_flg: {
          allowNull: false,
          type: Sequelize.STRING(1)
        },
        black_cd: {
          allowNull: false,
          type: Sequelize.STRING(1)
        },
        sex_type: {
          allowNull: false,
          type: Sequelize.STRING(1)
        },
        birthday: {
          allowNull: false,
          type: Sequelize.STRING(8)
        },
        admission_kb: {
          allowNull: false,
          type: Sequelize.STRING(2)
        },
        admission_date: {
          allowNull: false,
          type: Sequelize.STRING(8)
        },
        ninsyou_key: {
          allowNull: false,
          type: Sequelize.STRING(256)
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
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        ins_dtime: {
          allowNull: false,
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
          allowNull: false,
          type: Sequelize.DATE
        },
        temp_regist_dtime: {
          allowNull: true,
          type: Sequelize.DATE
        },
        combine_member_id: {
          allowNull: false,
          type: Sequelize.STRING(16)
        }
      },
      {
        schema: process.env.DB_SCHEMA,
        paranoid: true,
        tableName: "m_member",
        timestamps: false,
      }
    );

    return model;
  }

  demo() {
    return 123;
  }
}

export { Member }
