import * as types from './mutation-type';
import axios from 'axios';

export default {
  [types.CHECK](state) {
    // Check user is login
    state.authenticated = !!localStorage.getItem('token');
    let token =  localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = token;
  },

  [types.LOGIN](state, data) {
    // Set flag user is login
    state.authenticated = true;

    state.user = {
      email: data.email,
      name: data.name
    }

    localStorage.getItem("token");
  },

  [types.LOGOUT](state) {
    // Set flag user is logout
    state.authenticated = false;
    state.user = '';

    // Remove header common
    axios.defaults.headers.common['Authorization'];
  },

  [types.SET_USER](state, data) {
    // Reset state in local
    state.authenticated = true;
    state.user = data;
  },

  [types.SET_URL](state, data) {

    // Reset state in local
    state.redirectURL = data;
  },

  [types.REMOVE_URL](state) {

    // Remove state in local
    state.redirectURL = '';
  }
}
