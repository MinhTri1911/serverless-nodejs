import * as types from './mutation-type'
import axios from 'axios'

export const setPosts = ({commit}, posts) => {
  commit(types.SET_TICKET, posts)
}

export const addTicket = ({commit}, addTicket) => {
  commit(types.ADD_TICKET, addTicket);
  return true;
}

export const deleteTicket = ({commit}, delTicket) => {
  commit(types.DELETE_TICKET, delTicket)
}


export default {
  setPosts,
  addTicket,
  deleteTicket

}
