import * as types from './mutation-type';
import Axios from 'axios';
import { get, post } from '@/plugins/api';
import constant from '@/constant';

const HTTP_SUCCESS = 200;

export const check = ({ commit }) => {
  commit(types.CHECK);
}

//This is login function
export const login = ({ commit }, data) => {
	commit('SET_LOADING', true, { root: true })

  return new Promise ((resolve, reject) => {

    // Post data to API by Axios
    return post(constant.api.LOGIN_API, {
      mail: data.mail,
      password: data.password,
      client_id: data.client_id,
      returnSecureToken: true
    })
    .then(result => {
      // Redirect when Black_CD=1
      if(result.data.data.black_cd.black_cd =='1') {
        commit(types.SET_URL_BLACKCD, constant.router.ERROR);
        commit(types.LOGOUT);
        resolve(HTTP_SUCCESS);
      }

      // Set localstorage
      if(result.data.data.token) {
        localStorage.setItem("token", result.data.data.token);

        // Reset state after login
        commit(types.SET_USER, result.data.data.userInf);
        commit('SET_LOADING', false, { root: true });
        resolve(HTTP_SUCCESS);
      }
    })
    .catch(e => {

      // Error then logout
      commit(types.LOGOUT);
      localStorage.removeItem('token');
      commit('SET_LOADING', false, { root: true });
      reject(e);
    });
  });
}

// This is logout function
export const logout = ({ commit }, data) => {
	return new Promise((resolve, reject) => {

		// Remove localstorage
		localStorage.removeItem('token');

    // Call action logout
		commit(types.LOGOUT);

    resolve(HTTP_SUCCESS);
    return post(constant.api.LOGOUT_API, {
      client_id: data.client_id,
      member_id: data.member_id
    })
	})
}

export const setUser = ({ commit }, data) => {
	commit(types.SET_USER, data);
}

// This is function to check token valid every user request
export const initAuth = ({ commit }) => {
  var token = '';
  token = localStorage.getItem("token");
	var user = {
    client_id: null,
    email: null,
    member_id: null,
    member_kb_nm: null,
    name: null,
    member_start_date: null,
    member_end_date: null,
    member_kb_no: null,
    member_type_no: null
  }

	//send token to server and received data from server
  return get('user/info',{"token": token})
    .then(res=>{
      if (res.data.data.code == "Not Authentication") {
        localStorage.removeItem('token');
        commit(types.LOGOUT);
      }
    });
}

export const setUrl = ({ commit }, data) => {
  commit(types.SET_URL, data);
}

export const setUrlBlackCd = ({ commit }, data) => {
  commit(types.SET_URL_BLACKCD, data);
}

export const setError = ({ commit }, data) => {
  commit(types.SET_ERROR, data);
}

export const removeUrl = ({ commit }) => {
  commit(types.REMOVE_URL);
}

export default {
	check,
	login,
	logout,
	setUser,
  initAuth,
  setUrl,
  setUrlBlackCd,
  removeUrl,
  setError,
}
