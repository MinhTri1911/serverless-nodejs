import * as types from './mutation-type'

import axios from 'axios'

export default {
    [types.CHECK](state) {
        // Check user is login
        state.authenticated = !!localStorage.getItem('token')


        let token = localStorage.getItem("token");

        // axios.defaults.headers.common['X-TOKEN'] = token
        axios.defaults.headers.common['Authorization'] = token

        // axios.defaults.headers.common['timeoutToken'] = expirationDate
    },

    [types.LOGIN](state, data) {
        // Set flag user is login
        state.authenticated = true

        state.user = {
            email: data.email,
            name: data.name
        }

        let token =  localStorage.getItem("token");
        let expirationDate = localStorage.getItem("tokenExpiration");

        // axios.defaults.headers.common['X-TOKEN'] = token
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // axios.defaults.headers.common['timeoutToken'] = expirationDate
    },

    [types.LOGOUT](state) {
        // Set flag user is logout
        state.authenticated = false
        state.user = ''

        // Remove header common
        axios.defaults.headers.common['X-TOKEN']
        axios.defaults.headers.common['Authorization']
        axios.defaults.headers.common['timeoutToken']
    },

    [types.SET_USER](state, data) {
        // Reset state in local
        state.authenticated = true
        state.user = data
    }
}
