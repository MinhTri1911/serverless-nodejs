import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import post from './modules/post'
import show from './modules/show'
import register from './modules/register'
import booking from './modules/booking'


Vue.use(Vuex)

const createStore = () => {
	return new Vuex.Store({
		// Assign the modules to the store
		modules: {
			auth,
			post,
			register,
      show,
      booking
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
