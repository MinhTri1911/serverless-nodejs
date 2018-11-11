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
    return true;
  },

  [types.SET_USER](state, data) {
    // Reset state in local
    state.authenticated = true;
    state.user = data;
  },

  [types.SET_ADMIN](state, data) {
    // Set admin data
    state.admin = data.info;
    state.admin_flag = 1;
    state.admin_time = data.admin_time;
  },

  [types.LOGOUT_ADMIN](state) {
    // Setting admin data is logout
    state.admin = '';
    state.admin_flag='';
    state.admin_time = '';

    // Remove header common
    axios.defaults.headers.common['Authorization'];
  },

  [types.SET_URL](state, data) {

    // Reset state in local
    state.redirectURL = data.redirectURL;
    state.id = data.id;
    state.query = data.query;
  },

  [types.SET_URL_BLACKCD](state, data) {

    // Set state for blackcd
    state.redirect_URL_BLACKCD = data;
  },

  [types.SET_ERROR](state, data) {

    // Reset state in local
    state.error = data;
  },

  [types.REMOVE_URL](state) {

    // Remove state in local
    state.redirectURL = '';
    state.id = '';
    state.redirect_URL_BLACKCD = '';
    state.query = '';
  }
}
