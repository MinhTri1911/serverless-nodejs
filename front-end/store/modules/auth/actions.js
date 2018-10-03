import * as types from './mutation-type'
import axios from 'axios'
const publicIp = require('public-ip');
//to get client IP addresss
var myIP = null;
publicIp.v4().then(ip => {
    myIP = ip;
});
//define response
const HTTP_SUCCESS = 200;
const HTTP_ERROR = 500;

export const check = ({ commit }) => {
    commit(types.CHECK);
}
//this is login function
export const login = ({ commit }, data) => {
	commit('SET_LOADING', true, { root: true })

		return new Promise ((resolve, reject) => {
			//this is header content
			axios.defaults.headers.common = {
				'Content-Type': 'application/json',
				Authorization: "",
				//send IP to server
				IP: myIP
			}
			//set the API URL to connect Login
			let authUrl = "http://localhost:4000/login";
			//post data to API by Axios
		return axios
			.post(authUrl, {
			mail: data.mail,
			password: data.password,
			returnSecureToken: true
		})
		.then(result => {
			// Set localstorage
			localStorage.setItem("token", result.data.data.token);
			localStorage.setItem(
			"tokenExpiration",
				new Date().getTime() + Number.parseInt(result.data.data.JWT_EXPIRATION_TIME) * 1000*60
			);
			commit('SET_LOADING', false, { root: true });
			resolve(HTTP_SUCCESS);
		})
		.catch(e => {
			//if have error we logout
			commit(types.LOGOUT);
			localStorage.removeItem('token');
			localStorage.removeItem('tokenExpiration');
			commit('SET_LOADING', false, { root: true });
			reject(e);
		})
  })
}
//this is logout function
export const logout = ({ commit }) => {
	return new Promise((resolve, reject) => {
		// Call action logout
		commit(types.LOGOUT);

		// Remove localstorage
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('redirectTo');

		resolve(HTTP_SUCCESS);
	})
}

export const setUser = ({ commit }, data) => {
	commit(types.SET_USER, data);
}
//this is function to check token valid every user request
export const initAuth = ({ commit }) => {

	let token = null;
  let expirationDate = null;
  token = localStorage.getItem("token");
  expirationDate = localStorage.getItem("tokenExpiration");

	var user = {
	client_id:null,
	email: null,
	member_id: null,
	}
	//import token to  Header
	axios.defaults.headers.common['Authorization'] = token;
	//send token to server and received data from server
	axios.get("http://localhost:4000/User/info")
	.then(res => {
                //if server response code error messenger, we clear token on localstore
                if (res.data.data.code == "Not Authentication") {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
            }
                else{
                //if server response data, we set it to info user
                user.email=res.data.data.infoUser.mail_address;
                user.client_id=res.data.data.infoUser.client_id;
                user.member_id=res.data.data.infoUser.member_id;
                commit(types.SET_USER, user)
				}
    });
}

export default {
	check,
	login,
	logout,
	setUser,
	initAuth,
}
