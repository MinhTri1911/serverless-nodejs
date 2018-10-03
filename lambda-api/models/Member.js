
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
      "member",
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
        }
      },
      {
        schema: 'ticket2',
        paranoid: true,
        tableName: "m_member",
        timestamps: false,
      }
    );

    return model;
  }
}

export { Member }

// member_kb_no
// member_type_no
// member_nm
// 100
// member_kn
// 100
// post_no
// 20
// prefecture
// 100
// municipality
// 200
// address1
// 400
// address2
// 400
// tel_no
// 20
// mobile_no
// 20
// fax_no
// 20
// mail_address
// 200
// mail_send_flg
// 1
// post_send_flg
// 1
// black_cd
// 3
// sex_type
// 1
// birthday
// 8
// admission_kb
// 2
// admission_date
// 8
// withdraw_kb
// 3
// withdraw_date
// 8
// withdraw_note
// 400
// auto_continue_kb
// 1
// apply_start_date
// 8
// apply_end_date
// 8
// management_cd
// 50
// comment
// ninsyou_key
// 256
// gmo_card_seq
// ins_pg_id
// 20
// ins_client_id
// 10
// ins_employee_cd
// 20
// ins_dtime
// upd_pg_id
// 20
// upd_client_id
// 10
// upd_employee_cd
// 20
// upd_dtime
// temp_regist_dtime
