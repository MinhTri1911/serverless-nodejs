import * as types from './mutation-type'
import axios from 'axios'

export const setPosts = ({commit}, posts) => {
  commit(types.SET_TICKET, posts)
}
/**
 * Add ticket to bookingTickets
 * @param commit
 * @param addTicket
 * @returns {boolean}
 */
export const addTicket = ({commit}, addTicket) => {
  commit(types.ADD_TICKET, addTicket);
  return true;
}

/**
 * choose ticket to bookingTickets
 * @param commit
 * @param addTicket
 * @returns {boolean}
 */
export const chooseTicketType = ({commit}, chooseTicket) => {
  commit(types.CHOOSE_TICKET_TYPE, chooseTicket);
  return true;
}


/**
 * delete ticket in bookingTickets
 * @param commit
 * @param delTicket
 */
export const deleteTicket = ({commit}, delTicket) => {
  commit(types.DELETE_TICKET, delTicket)
}
/**
 * delete ticket designated in bookingTickets
 * @param commit
 * @param delTicket
 */
export const deleteTicketDesignated = ({commit}, delTicket) => {
  commit(types.DELETE_TICKET_DESIGNATED, delTicket)
}


export default {
  setPosts,
  addTicket,
  deleteTicket,
  deleteTicketDesignated,
  chooseTicketType

}
