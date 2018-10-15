import * as types from './mutation-type'
import Config from "@/constant/config"
export default {
  /**
   * delete ticket duplicate and add new ticket data
   * @param state
   * @param data
   * @returns {boolean}
   */
  [types.ADD_TICKET](state, data) {
    // let show_no = data.show_no;
    // let seat_type_no = data.seat_type_no;
    // let ticket_type_no = data.ticket_type_no;
    // let seat_no = data.seat_no ;

    // filter array replace new array with old element and add new data
    state.bookingTickets = [
      ...state.bookingTickets.filter(function(elementTicket) {
        if(
          elementTicket.show_no === data.show_no
          && elementTicket.show_group_id === data.show_group_id
          && elementTicket.client_id === data.client_id
          && elementTicket.seat_type_no === data.seat_type_no
          && elementTicket.ticket_type_no === data.ticket_type_no
          && elementTicket.seat_no === data.seat_no
        ){

          // if element edit data delete it and add new later

          return false ;
        }else {

          return true ;
        }
      })  ,
      data
    ];

  return true;
  },
  /**
   * choose ticket type in booking ticket
   * @param state
   * @param data
   * @returns {boolean}
   */
  [types.CHOOSE_TICKET_TYPE](state, data) {
    let bookingTicketsTemp = state.bookingTickets;
    console.log(data);
    let objIndex =0 ;
    objIndex = bookingTicketsTemp.findIndex((seat => seat.seat_no == data.seat_no));
    bookingTicketsTemp[objIndex].ticket_price = data.ticket_price;
    bookingTicketsTemp[objIndex].ticket_type_no = data.ticket_type_no;
    bookingTicketsTemp[objIndex].ticket_type_nm = data.ticket_type_nm;
    state.bookingTickets = bookingTicketsTemp;
    return true;
  },

  /**
   * delete ticket free seat when number ticket  =0
   * @param state
   * @param data
   * @returns {boolean}
   */
  [types.DELETE_TICKET](state, data) {
    let show_no = data.show_no;
    let seat_type_no = data.seat_type_no;
    let ticket_type_no = data.ticket_type_no;
    // filter array delete ticket equal with data
    state.bookingTickets =
      state.bookingTickets.filter(function(elementTicket) {
        if(elementTicket.show_no === show_no
          && elementTicket.seat_type_no === seat_type_no
          && elementTicket.ticket_type_no === ticket_type_no  ){

          // if element edit data delete it and add new later

          return false ;
        }else {

          return true ;
        }
      });

    return true;
  },

  /**
   * delete all ticket designated seat
   * @param state
   * @param data
   * @returns {boolean}
   */
  [types.DELETE_TICKET_DESIGNATED](state, data) {
    let show_no = data.show_no;
    let seat_type_no = data.seat_type_no;
    let ticket_type_no = data.ticket_type_no;
    // filter array delete ticket equal with data
    state.bookingTickets =
      state.bookingTickets.filter(function(elementTicket) {
        if(
          elementTicket.show_no === data.show_no
          && elementTicket.show_group_id === data.show_group_id
          && elementTicket.client_id === data.client_id
          && elementTicket.seat_type_kb === data.seat_type_kb ){

          // if element edit data delete it and add new later

          return false ;
        }else {

          return true ;
        }
      });

    return true;
  },

}