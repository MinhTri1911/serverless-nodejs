import * as types from './mutation-type'
// import { post ,get } from '@@/helper/api'
// import * as routes from '../../../router/router'
import axios from 'axios'

const HTTP_SUCCESS = 200

export const check = ({ commit }) => {
	commit(types.CHECK);
}

export const login = ({ commit }, data) => {
	commit('SET_LOADING', true, { root: true })

	return new Promise ((resolve, reject) => {
		let authUrl = 'http://localhost:4000/login';

		return axios.post(authUrl, {
				mail: data.email,
				password: data.password,
				accountId: data.accountId,
				clientId: data.accountId
			})
			.then(result => {
				let res = result.data;

				// Fake data user info
				let userInf = {
					mail: res.data.infUser.mail_address,
					accountId: res.data.infUser.account_id,
					clientId: res.data.infUser.client_id,
				}

				// Set localstorage
				localStorage.setItem("token", res.data.token);

				// Call action login
				commit(types.LOGIN, userInf);

				commit('SET_LOADING', false, { root: true });

				resolve(HTTP_SUCCESS);
			})
			.catch(e => {
				commit(types.LOGOUT);
				localStorage.removeItem('token');

				commit('SET_LOADING', false, { root: true });

				reject(e);
			})
	})
}

export const logout = ({ commit }) => {
	return new Promise((resolve, reject) => {
		// Call action logout
		commit(types.LOGOUT)

		// Remove localstorage
		localStorage.removeItem('token')
		localStorage.removeItem('tokenExpiration')
		localStorage.removeItem('redirectTo')

		resolve(HTTP_SUCCESS)
	})
}

export const setUser = ({ commit }, data) => {
	commit(types.SET_USER, data)
}

export const initAuth = ({ commit }) => {
	let token = null
	let expirationDate = null

	if (!process.isClient && localStorage.getItem("token") != null) {
		// get token from server
		token = "token"
		expirationDate = "time"
	} else {
		token = localStorage.getItem("token");
		expirationDate = localStorage.getItem("tokenExpiration");
	}

	/**
	 * Call api after set token
	 * to authorization token and user
	 */

	// Fake user
	let user = {
		email: 'demo@gmail.com',
		name: 'Demo User'
	}

	commit(types.SET_USER, user)
}

export default {
	check,
	login,
	logout,
	setUser,
	initAuth,
}
