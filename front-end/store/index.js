import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import show from './modules/show'
import register from './modules/register'
import booking from './modules/booking'
import error from './modules/error'
import client from './modules/client'

Vue.use(Vuex)

const createStore = () => {
	return new Vuex.Store({
		// Assign the modules to the store
		modules: {
			auth,
			register,
      show,
      booking,
      error,
      client
		},
		// #root state
		state: {
			loading: false,
		},
		// #root mutations
		mutations: {
			SET_LOADING(state, loading) {
        state.loading = loading
			},
		}
		// If strict mode should be enabled
		// strict: debug,
	})
}

export default createStore
