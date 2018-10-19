import Config from "../config/Constant";
import _ from "lodash"
import {Helper} from "../common/Helper";

class BookingBusiness {
  /**
   *
   * @param db
   * @returns {ShowBusiness}
   */
  constructor(db) {
    this.db = db;
    this.helper = new Helper();

    return this;
  }

  /**
   * Get info of show
   * @param client_id
   * @param show_group_id
   * @param show_no
   * @param sales_no
   * @returns {Promise<any>}
   */
  getInfo(client_id, show_group_id, show_no, sales_no) {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL028.sql');

      this.db.query(sql, {
        bind: {
          client_id: client_id,
          show_group_id: show_group_id,
          show_no: show_no,
          sales_no: sales_no

        },
        type: this.db.QueryTypes.SELECT
      })
        .then(result => {
          return result[0];
        })
        .then(result => {
          let showInfo = {};
          showInfo.show_nm = result.show_nm;
          showInfo.show_date = result.show_date;
          showInfo.hall_nm = result.hall_nm;
          showInfo.sales_nm = result.sales_nm;
          showInfo.sales_term = result.sales_term;
          showInfo.sales_explanation = result.sales_explanation;
          showInfo.detail_explanation = result.detail_explanation;
          showInfo.show_group_disp_kb = result.show_group_disp_kb;

          resolve(showInfo);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  /**
   * get seat info for genarate seat map
   * @param client_id
   * @param show_group_id
   * @param show_no
   * @param sales_no
   * @returns {Promise<any>}
   */
  getSeatDetail(client_id, show_group_id, show_no, sales_no) {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL028.sql');

      this.db.query(sql, {
        bind: {
          client_id: client_id,
          show_group_id: show_group_id,
          show_no: show_no,
          sales_no: sales_no

        },
        type: this.db.QueryTypes.SELECT
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  getTicketType(client_id, show_group_id, show_no, sales_no) {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL031.sql');

      this.db.query(sql, {
        bind: {
          client_id: client_id,
          show_group_id: show_group_id,
          show_no: show_no,
          sales_no: sales_no

        },
        type: this.db.QueryTypes.SELECT
      })
        .then(result => {
          let seatsData = result ;
          let seats = {};

          seatsData.forEach(function (seat) {

            let ticket = {};
            ticket.ticket_type_nm = seat.ticket_type_nm;
            ticket.ticket_type_no = seat.ticket_type_no;
            ticket.ticket_price = seat.ticket_price;
            ticket.net_zan_maisu = seat.net_zan_maisu;
            ticket.ticket_unit = seat.ticket_unit;
            ticket.number_specified_flg = seat.number_specified_flg;
            ticket.limit_count = seat.limit_count;

            if(typeof(seats[seat.seat_type_nm]) === 'undefined') {

              seats[seat.seat_type_nm] = {};
              seats[seat.seat_type_nm]['tickets'] = [];
            }

            seats[seat.seat_type_nm]['tickets'].push(ticket);
            seats[seat.seat_type_nm]['maisu_status'] = seat.maisu_status;
            seats[seat.seat_type_nm]['seat_type_color'] = seat.seat_type_color;
            seats[seat.seat_type_nm]['seat_type_no'] = seat.seat_type_no;
            seats[seat.seat_type_nm]['seat_type_nm'] = seat.seat_type_nm;
            seats[seat.seat_type_nm]['member_discount_flg'] = seat.member_discount_flg;
          });

          resolve(seats);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }


}

export {BookingBusiness}