import * as types from "./mutation-type";
import Axios from "axios";
import { get, post } from "@/plugins/api";
import constant from "@/constant";

const HTTP_SUCCESS = 200;

export const check = ({ commit }) => {
  commit(types.CHECK);
};

//This is login function
export const login = ({ commit }, data) => {
  commit("SET_LOADING", true, { root: true });

  return new Promise((resolve, reject) => {
    // Post data to API by Axios
    return post(constant.api.LOGIN_API, {
      mail: data.mail,
      password: data.password,
      client_id: data.client_id,
      web_permission_kb: data.web_permission_kb,
      returnSecureToken: true
    })
      .then(result => {
        // Redirect when Black_CD=1
        if (result.data.data.black_cd.black_cd == "1") {
          commit(types.SET_URL_BLACKCD, constant.router.ERROR);
          commit(types.LOGOUT);
          resolve(HTTP_SUCCESS);
        }

        // Set localstorage
        if (result.data.data.token) {
          localStorage.setItem("token", result.data.data.token);

          // Reset state after login
          commit(types.SET_USER, result.data.data.userInf);
          commit("SET_LOADING", false, { root: true });
          resolve(HTTP_SUCCESS);
        }
      })
      .catch(e => {
        commit(types.LOGOUT);
        localStorage.removeItem("token");
        commit("SET_LOADING", false, { root: true });
        reject(e);
      });
  });
};

//This is login Admin function
export const loginAdmin = ({ commit }, data) => {
  commit("SET_LOADING", true, { root: true });

  return new Promise((resolve, reject) => {
    // Post data to API by Axios
    return post(constant.api.LOGIN_ADMIN_API, {
      account_id: data.account_id,
      password: data.password,
      client_id: data.client_id,
      returnSecureToken: true
    })
      .then(result => {
        // Set localstorage
        if (result.data.data.token) {
          localStorage.setItem("tokenAdmin", result.data.data.token);
          localStorage.setItem("token", result.data.data.token);

          // Reset state after login
          commit(types.LOGOUT);
          commit(types.SET_ADMIN, { info: result.data.data.adminInf, admin_time: data.admin_time });
          commit("SET_LOADING", false, { root: true });
          resolve(HTTP_SUCCESS);
        }
      })
      .catch(e => {
        commit("SET_LOADING", false, { root: true });
        reject(e);
      });
  });
};


// This is logout function
export const logout = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    // Remove localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("vuex");

    // Call action logout
    commit(types.LOGOUT);
    if (!localStorage.getItem("token") && localStorage.getItem("tokenAdmin")) {
      let token = localStorage.getItem("tokenAdmin");
      localStorage.setItem("token", token);
    }
    resolve(HTTP_SUCCESS);
    return post(constant.api.LOGOUT_API, {
      client_id: data.client_id,
      member_id: data.member_id
    });
  });
};

// This is logoutAdmin function
export const logoutAdmin = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    // Remove localstorage
    localStorage.removeItem("tokenAdmin");
    localStorage.removeItem("vuex");

    // Call action logout
    commit(types.LOGOUT_ADMIN);

    resolve(HTTP_SUCCESS);
    return post(constant.api.LOGOUT_API, {
      client_id: data.client_id,
      member_id: data.member_id
    });
  });
};

export const setUser = ({ commit }, data) => {
  commit(types.SET_USER, data);
};

// This is function to check token valid every user request
export const initAuth = ({ commit }) => {
  var token = "";
  token = localStorage.getItem("token");

  if (!token) {
    commit(types.LOGOUT);
  }
  //send token to server and received data from server
  return get("user/info").then(res => {
    if (res.data.data.code == "Token not valid") {
      // Remove localstorage
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");

      // Call action logout
      commit(types.LOGOUT);
      $nuxt.$router.push({ name: "client_id" });
    }
  });
};

// This is function to check token valid every user request
export const initAuthAdmin = ({ commit }) => {
  var tokenAdmin = "";
  tokenAdmin = localStorage.getItem("tokenAdmin");
  if (!tokenAdmin) {
    commit(types.LOGOUT_ADMIN);
  } else {
  //send token to server and received data from server
  return Axios.get(process.env.baseUrl + "/user/info", { headers: { Authorization: tokenAdmin } })
    .then(res => {
      if (res.data.data.code == "Token not valid") {
        // Remove localstorage
        localStorage.removeItem("tokenAdmin");
        // Call action logout
        commit(types.LOGOUT_ADMIN);
        $nuxt.$router.push({ name: "client_id" });
      }
    });
  }
};

export const setUrl = ({ commit }, data) => {
  commit(types.SET_URL, data);
};

export const setUrlBlackCd = ({ commit }, data) => {
  commit(types.SET_URL_BLACKCD, data);
};

export const setError = ({ commit }, data) => {
  commit(types.SET_ERROR, data);
};

export const removeUrl = ({ commit }) => {
  commit(types.REMOVE_URL);
};

export default {
  check,
  login,
  logout,
  logoutAdmin,
  setUser,
  initAuth,
  setUrl,
  setUrlBlackCd,
  removeUrl,
  setError,
  loginAdmin,
  initAuthAdmin,
};
