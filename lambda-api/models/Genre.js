import Sequelize from "sequelize";

class Genre {
  /**
   * Function define schema struct
   *
   * @returns {object} model of the table
   * @memberof Genre
   */
  // defineGenreSchema(db) {
    // const model = db.define(
    //   "t_show",
    //   {
    //     client_id: {
    //       allowNull: false,
    //       type: Sequelize.STRING(10),
    //       primaryKey: true
    //     },
    //     show_group_id: {
    //       allowNull: false,
    //       type: Sequelize.STRING(10),
    //       primaryKey: true
    //     },
    //     show_no: {
    //       allowNull: false,
    //       type: Sequelize.BIGINT,
    //       primaryKey: true
    //     },
    //     show_nm: {
    //       allowNull: false,
    //       type: Sequelize.STRING(1000)
    //     },
    //     hall_no: {
    //       allowNull: true,
    //       type: Sequelize.BIGINT
    //     },
    //     hall_nm: {
    //       allowNull: false,
    //       type: Sequelize.STRING(200)
    //     },
    //     hall_rk: {
    //       allowNull: false,
    //       type: Sequelize.STRING(50)
    //     },
    //     show_date: {
    //       allowNull: false,
    //       type: Sequelize.STRING(8)
    //     },
    //     hall_open_time: {
    //       allowNull: false,
    //       type: Sequelize.STRING(4)
    //     },
    //     show_start_time: {
    //       allowNull: false,
    //       type: Sequelize.STRING(4)
    //     },
    //     show_end_time: {
    //       allowNull: false,
    //       type: Sequelize.STRING(4)
    //     },
    //     show_date_disp_kb: {
    //       allowNull: false,
    //       type: Sequelize.STRING(1)
    //     },
    //     show_date_disp_char: {
    //       allowNull: false,
    //       type: Sequelize.STRING(200)
    //     },
    //     hall_view_flg: {
    //       allowNull: false,
    //       type: Sequelize.STRING(1)
    //     },
    //     hall_layout_no: {
    //       allowNull: true,
    //       type: Sequelize.BIGINT
    //     },
    //     priority_no: {
    //       allowNull: true,
    //       type: Sequelize.BIGINT
    //     },
    //     organizer_no: {
    //       allowNull: true,
    //       type: Sequelize.STRING(100)
    //     },
    //     show_memo: {
    //       allowNull: true,
    //       type: Sequelize.TEXT
    //     },
    //     ins_pg_id: {
    //       allowNull: false,
    //       type: Sequelize.STRING(20)
    //     },
    //     ins_client_id: {
    //       allowNull: false,
    //       type: Sequelize.STRING(10)
    //     },
    //     ins_employee_cd: {
    //       allowNull: false,
    //       type: Sequelize.STRING(10)
    //     },
    //     ins_dtime: {
    //       allowNull: true,
    //       type: Sequelize.DATE
    //     },
    //     upd_pg_id: {
    //       allowNull: false,
    //       type: Sequelize.STRING(20)
    //     },
    //     upd_client_id: {
    //       allowNull: false,
    //       type: Sequelize.STRING(10)
    //     },
    //     upd_employee_cd: {
    //       allowNull: false,
    //       type: Sequelize.STRING(20)
    //     },
    //     upd_dtime: {
    //       allowNull: true,
    //       type: Sequelize.DATE
    //     },
    //     recepterm_disp_kb: {
    //       allowNull: false,
    //       type: Sequelize.STRING(1)
    //     },
    //     show_stop_kb: {
    //       allowNull: false,
    //       type: Sequelize.STRING(1)
    //     },
    //     pay_off_start: {
    //       allowNull: false,
    //       type: Sequelize.STRING(8)
    //     },
    //     pay_off_end: {
    //       allowNull: false,
    //       type: Sequelize.STRING(8)
    //     },
    //     show_perform: {
    //       allowNull: true,
    //       type: Sequelize.TEXT
    //     },
    //     show_caution: {
    //       allowNull: true,
    //       type: Sequelize.TEXT
    //     },
    //     show_sales: {
    //       allowNull: true,
    //       type: Sequelize.TEXT
    //     },
    //     show_text: {
    //       allowNull: true,
    //       type: Sequelize.TEXT
    //     },
    //     notes: {
    //       allowNull: false,
    //       type: Sequelize.STRING(400)
    //     },
    //     liquidate_date: {
    //       allowNull: false,
    //       type: Sequelize.STRING(8)
    //     },
    //     refund_start_date: {
    //       allowNull: false,
    //       type: Sequelize.STRING(8)
    //     },
    //     refund_end_date: {
    //       allowNull: false,
    //       type: Sequelize.STRING(8)
    //     },
    //     reurn_ticket_end_date: {
    //       allowNull: false,
    //       type: Sequelize.STRING(8)
    //     }
    //   }, {
    //     schema: 'ticket2',
    //     timestamps: false,
    //     paranoid: true,
    //     tableName: "t_show",
    //   });

    // model.associate = function(models) {
    //   // associations can be defined here
    // };

    // return model;
  // }
}

export { Genre }
