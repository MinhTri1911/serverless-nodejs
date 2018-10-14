import types from "./mutation-type"
import axios from 'axios'

export default {
  [types.SHOWS](state, shows) {
    // state.shows = shows
  },
  [types.LIST_SHOWS](state, shows){
    state.shows = shows
  },
  [types.CLEAR_SHOW](state) {
    state.shows = []
  },
  [types.SEARCHING] (state, bool) {
    state.searching = bool
  },
  [types.RESET_SEARCH](state) {
    state.searchInfo = {}
  },
  [types.ADD_SEARCH_FORM](state, payload) {
    if (payload.$route.query.q) {
      state.searchInfo.q = payload.$route.query.q
    }

    if (payload.$route.query.genre_no) {
      state.searchInfo.genre_no = payload.$route.query.genre_no
    }

    if (payload.$route.query.from_show_date) {
      state.searchInfo.from_show_date = payload.$route.query.from_show_date
    }

    if (payload.$route.query.to_show_date) {
      state.searchInfo.to_show_date = payload.$route.query.to_show_date
    }

    if (payload.$route.query.from_sales_date) {
      state.searchInfo.from_sales_date = payload.$route.query.from_sales_date
    }

    if (payload.$route.query.to_sales_date) {
      state.searchInfo.to_sales_date = payload.$route.query.to_sales_date
    }
  },
  [types.START_SEARCH](state, bool) {
    state.searching = bool
  }
  ,
  [types.SET_TOTAL_RECORD](state, recordNum){
    state.totalRecord = recordNum
  }
}
