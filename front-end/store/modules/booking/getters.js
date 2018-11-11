import state from './state'

export default {
  myTickets: (state) => {
    return state.bookingTickets;
  },
  cartId: (state) => {
    return state.cartId;
  }
}