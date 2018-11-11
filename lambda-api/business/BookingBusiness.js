import Config from "../config/Constant";
import _ from "lodash"
import {Helper} from "../common/Helper";
import * as Promise from 'bluebird';

class BookingBusiness {
  /**
   *
   * @param db
   * @returns {BookingBusiness}
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
  getInfo(client_id, show_group_id ,show_no ,admin_time) {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL027.sql');
          sql = this.getSqlStringReplaceAdminTime(sql,admin_time);

      this.db.query(sql, {
        bind: {
          client_id: client_id,
          show_group_id: show_group_id,


        },
        type: this.db.QueryTypes.SELECT
      })
        .then(result => {
          for(let index =0; index <result.length ; index++) {
            if(result[index].show_no == show_no) {
              return result[index];
            }
          }
        })
        .then(result => {
          let showInfo = {};
          showInfo.show_nm = result.show_nm;
          showInfo.show_date_disp_char = result.show_date_disp_char;
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
   * Process replace string SQL admin time in sql027
   * @return {String}
   */
  getSqlStringReplaceAdminTime(slqString,admin_time ="") {
    // Load file SQL
    let queryDb = slqString;

    // If user search with show group id, replace sub query from query string in file
    if (admin_time != '') {
      queryDb = queryDb.replace('#replace_admin_time', "TIMESTAMP '"+admin_time+"'");
    } else {
      queryDb = queryDb.replace('#replace_admin_time', 'now()')
    }
    // Replace all sub query in query string from file

    return queryDb;
  }

  /**
   * get seat info for genarate seat map
   * @param client_id
   * @param show_group_id
   * @param show_no
   * @param sales_no
   * @returns {Promise<any>}
   */
  getSeatDetail(client_id, show_group_id, show_no, sales_no, member_kb_no) {

    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL028.sql');

      this.db.query(sql, {
        bind: {
          client_id: client_id,
          show_group_id: show_group_id,
          show_no: show_no,
          sales_no: sales_no,
          member_kb_no: member_kb_no,

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

  /**
   * get ticket type info
   * @param client_id
   * @param show_group_id
   * @param show_no
   * @param sales_no
   * @returns {Promise<any>}
   */
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
          let seatsData = result;
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

            if (typeof(seats[seat.seat_type_nm]) === 'undefined') {

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

  /**
   * validate sales term
   * @param client_id
   * @param show_group_id
   * @param show_no
   * @param sales_no
   * @returns {Promise<any>}
   */
  getCheckSalesTerm(client_id, show_group_id, show_no, sales_no) {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL037.sql');

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

  /**
   * validate limit number ticket
   * @param client_id
   * @param show_group_id
   * @param show_no
   * @param sales_no
   * @param seat_select_count
   * @param member_id
   * @returns {Promise<any>}
   */
  getCheckLimitTicket(client_id, show_group_id, show_no, sales_no, seat_select_count, member_id) {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL038.sql')
          sql = this.getSqlStringReplaceAdminTime(sql);

      this.db.query(sql, {
        replacements: {
          client_id: client_id,
          show_group_id: show_group_id,
          show_no: show_no,
          sales_no: sales_no,
          seat_select_count: seat_select_count,
          member_id: member_id

        },
        type: this.db.QueryTypes.SELECT
      })
        .then(result => {
          console.log(result);
          resolve(result);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  /**
   * get next Cart id
   * @returns {Promise<any>}
   */
  getCartId() {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL067.sql');

      this.db.query(sql, {
        bind: {},
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

  /**
   * validate designate seat and insert to cart
   * @param i
   * @param client_id
   * @param cart_id
   * @param show_group_id
   * @param sales_no
   * @param show_no
   * @param seats
   * @param ins_pg_id
   * @param upd_pg_id
   */
  insertCartDesignateSeat(i, client_id, cart_id, show_group_id, sales_no, show_no, seats, ins_pg_id, upd_pg_id) {
    let sql30 = this.helper.loadSql('SQL030.sql');
    let sql29 = this.helper.loadSql('SQL029.sql');
    let sqlSetSeatStatusBySeatNo = this.helper.loadSql('SQLSetSeatStatusBySeatNo.sql');
    return new Promise((resolve, reject) => {
      this.db.transaction(t => {
        return this.db.query(sql30, {
          replacements: {
            client_id: client_id,
            cart_id: cart_id,
            show_group_id: show_group_id,
            show_no: show_no,
            seat_no: seats[i].seat_no

          },
          type: this.db.QueryTypes.UPDATE
        })
          .then(result => {

            // validate if result 1 error message
            if (result[1] != 1) {
              // not valid seat return to fall
              throw new Error();
            }

            // excute sql 29
            return this.db.query(sql29, {
              replacements: {
                client_id: client_id,
                cart_id: cart_id,
                show_group_id: show_group_id,
                sales_no: sales_no,
                show_no: show_no,
                seat_no: seats[i].seat_no,
                seat_type_no: seats[i].seat_type_no,
                ticket_type_no: seats[i].ticket_type_no,
                standard_ticket_price: seats[i].ticket_price,
                ins_pg_id: ins_pg_id,
                upd_pg_id: upd_pg_id,

              },
              type: this.db.QueryTypes.INSERT
            })

          })
          .then(result => {
            return this.db.query(sqlSetSeatStatusBySeatNo, {
              bind: {
                client_id: client_id,
                show_group_id: show_group_id,
                show_no: show_no,
                seat_no: seats[i].seat_no

              },
              type: this.db.QueryTypes.SELECT
            })
          })
          .then(result => {
            return ({seat_no: seats[i].seat_no, status_code: 1, status: result});
          })
      }).then(function (reponse) {
        resolve(reponse);
      }).catch(function (err) {
        resolve({seat_no: seats[i].seat_no, status_code: 3, status: false});
      })


    });
  }

  /**
   * loop seats to validate
   * @param client_id
   * @param cart_id
   * @param show_group_id
   * @param sales_no
   * @param show_no
   * @param seats
   * @param ins_pg_id
   * @param upd_pg_id
   * @returns {Promise<T>}
   */
  async postCheckDesignateSeat(client_id, cart_id, show_group_id, sales_no, show_no, seats, ins_pg_id, upd_pg_id) {

    let promises = [];
    const SEAT_DESIGNATE = 1;
    const SEAT_FREE = 2;
    for (let i = 0; i < seats.length; i++) {


      promises.push(await this.insertCartDesignateSeat(i, client_id, cart_id, show_group_id, sales_no, show_no, seats, ins_pg_id, upd_pg_id))
    }

    return Promise.all(promises)
      .then((results) => {

        return results;
      })
      .catch((e) => {

        console.log(e);
        // Handle errors here
      });

  }

  /**
   * validate each free seat and update tcart
   * @param i
   * @param client_id
   * @param cart_id
   * @param show_group_id
   * @param sales_no
   * @param show_no
   * @param seats
   * @param member_kb_no
   * @param account_id
   * @param ins_pg_id
   * @param upd_pg_id
   */
  insertCartFreeSeat(i, client_id, cart_id, show_group_id, sales_no, show_no, seats, member_kb_no, membertype_no, member_id,account_id, ins_pg_id, upd_pg_id) {

    let sqlAutoAllocGetSeat = this.helper.loadSql('SQLAutoAllocGetSeat.sql');
    let sql099 = this.helper.loadSql('SQL099.sql');
    let sql100 = this.helper.loadSql('SQL100.sql');
    let status = '';
    let seatNo = 0;
    let reponse = {};
    const SEAT_DESIGNATE = 1;
    const SEAT_FREE = 2;
    return new Promise((resolve, reject) => {
      this.db.transaction(t => {
        return this.db.query(sqlAutoAllocGetSeat, {
          bind: {
            in_client_id: client_id,
            in_show_group_id: show_group_id,
            in_sales_no: sales_no,
            in_show_no: show_no,
            in_area_no: 0,
            in_block_no: 0,
            in_seat_type_no: seats[i].seat_type_no,
            in_memberkb_no: member_kb_no,
            in_membertype_no: membertype_no,
            in_member_id: member_id,
            in_seat_count: seats[i].number_ticket,
            in_reservetype: 2,
            in_cart_id: cart_id,
            in_pgid: ins_pg_id,
            in_accountid: account_id

          },
          type: this.db.QueryTypes.SELECT
        })
          .then(result => {

            let resultTmp = result[0];
            status = resultTmp[Object.keys(resultTmp)[0]];
            let checkCode = status.match(/[0-9]/)[0];
            seatNo = status.match(/[0-9]+(?!.*[0-9]+)/)[0];
            reponse = {
              status_code: checkCode,
              seat_type_no: seats[i].seat_type_no,
              seat_type_kb: seats[i].seat_type_kb,
              seat_no: seatNo,
              status: resultTmp
            }
            if (checkCode != 1) {

              throw new Error();
            }

            if (checkCode == 1) {
              return this.db.query(sql099, {
                replacements: {
                  client_id: client_id,
                  cart_id: cart_id,
                  show_group_id: show_group_id,
                  show_no: show_no,
                  seat_no: seatNo,
                  ticket_type_no: seats[i].ticket_type_no,
                  upd_employee_cd: 'NET',
                  upd_pg_id: upd_pg_id,
                },
                type: this.db.QueryTypes.UPDATE
              })
            }
          }).then(result => {
            return this.db.query(sql100, {
              replacements: {
                client_id: client_id,
                cart_id: cart_id,
                show_group_id: show_group_id,
                show_no: show_no,
                seat_no: seatNo,
                ticket_type_no: seats[i].ticket_type_no,
                upd_employee_cd: 'NET',
                upd_pg_id: upd_pg_id,

              },
              type: this.db.QueryTypes.UPDATE
            })
          }).then(result => {
            return reponse;
          })


      }).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        resolve(reponse);
        // reject(err);
      })

    });
  }

  /**
   * validate seats both free and designate
   * @param client_id
   * @param cart_id
   * @param show_group_id
   * @param sales_no
   * @param show_no
   * @param seats
   * @param member_kb_no
   * @param account_id
   * @param ins_pg_id
   * @param upd_pg_id
   * @returns {Promise<T>}
   */
  async postCheckFreeSeat(client_id, cart_id, show_group_id, sales_no, show_no, seats, member_kb_no, membertype_no, member_id, account_id, ins_pg_id, upd_pg_id) {

    let promises = [];
    let numberRecord = 0;
    let resultCode = 9;
    let message = null;
    let NG_flg = false;
    let reponse = {};
    const SEAT_DESIGNATE = 1;
    const SEAT_FREE = 2;
    for (let i = 0; i < seats.length; i++) {
      if (seats[i].seat_type_kb == SEAT_DESIGNATE && seats[i].auto_alloc == false) {
        let seatReponse = await this.insertCartDesignateSeat(i, client_id, cart_id, show_group_id, sales_no, show_no, seats, ins_pg_id, upd_pg_id);
        promises.push(seatReponse);
        if (seatReponse.status_code == 3) {
          break;
        }
      }

      if (seats[i].seat_type_kb == SEAT_FREE || seats[i].auto_alloc == true) {

        promises.push(await this.insertCartFreeSeat(i, client_id, cart_id, show_group_id, sales_no, show_no, seats, member_kb_no, membertype_no, member_id, account_id, ins_pg_id, upd_pg_id))
      }

    }

    return Promise.all(promises)
      .then((results) => {
        numberRecord = results.length;
        for (let i = 0; i < results.length; i++) {
          if (results[i].status_code == 1) {
            resultCode = 1;
            message = '';
          }
          if (results[i].status_code == 3) {
            resultCode = 3;
            message = '並び席でのご用意ができませんでした。\n' +
              'お申込み内容は次のカート画面で変更いただけます。';
            NG_flg = true;
          }
          if (results[i].status_code == 8) {
            resultCode = 8;
            message = '選択された枚数を確保できませんでした。';
            break;
          }
          if (results[i].status_code == 9) {
            resultCode = 9;
            message = '';
            break;
          }

        }

        reponse = {
          number_record: numberRecord,
          result_code: resultCode,
          message: message,
          NG_flg: NG_flg,
          detail: results
        }
        return reponse;
      })
      .catch((e) => {
        console.log(e);
        // Handle errors here
      });

  }

}

export {BookingBusiness}