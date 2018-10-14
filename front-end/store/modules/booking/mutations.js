import * as types from './mutation-type'

export default {
  [types.ADD_TICKET](state, data) {
    let show_no = data.show_no;
    let seat_type_no = data.seat_type_no;
    let ticket_type_no = data.ticket_type_no;
    // filter array replace new array with old element and add new data
    state.bookingTickets = [
      ...state.bookingTickets.filter(function(elementTicket) {
        if(elementTicket.show_no === show_no
          && elementTicket.seat_type_no === seat_type_no
          && elementTicket.ticket_type_no === ticket_type_no  ){

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

  [types.SET_TICKET](state, data) {
    state.loadedPosts = data
  }



}