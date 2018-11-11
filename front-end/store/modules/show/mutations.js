import types from "./mutation-type"
import Config from "@/constant/config"
export default {
  // Append to list show
  [types.LIST_SHOWS](state, shows){
    state.shows = shows
  },
  // Clear list show
  [types.CLEAR_SHOW](state) {
    state.shows = []
  },
  // Set status search
  [types.SEARCHING] (state, bool) {
    state.searching = bool
  },
  // Clear condition search
  [types.RESET_SEARCH](state) {
    state.searchInfo = {}
  },
  // Add condition to search
  [types.ADD_SEARCH_FORM](state, data) {
    // When user input key search
    if (data.key_search) {
      state.searchInfo.key_search = data.key_search;
    } else {
      if (state.searchInfo.hasOwnProperty('key_search')) {
        delete state.searchInfo['key_search'];
      }
    }
    // When user select genre of show
    if (data.genre_no) {
      state.searchInfo.genre_no = data.genre_no;
    } else {
      if (state.searchInfo.hasOwnProperty('genre_no')) {
        delete state.searchInfo['genre_no'];
      }
    }

    if (data.from_show_date) {
      state.searchInfo.from_show_date = data.from_show_date;
    } else {
      if (state.searchInfo.hasOwnProperty('from_show_date')) {
        delete state.searchInfo['from_show_date'];
      }
    }

    if (data.to_show_date) {
      state.searchInfo.to_show_date = data.to_show_date;
    } else {
      if (state.searchInfo.hasOwnProperty('to_show_date')) {
        delete state.searchInfo['to_show_date'];
      }
    }

    if (data.from_sales_date) {
      state.searchInfo.from_sales_date = data.from_sales_date;
    } else {
      if (state.searchInfo.hasOwnProperty('from_sales_date')) {
        delete state.searchInfo['from_sales_date'];
      }
    }

    if (data.to_sales_date) {
      state.searchInfo.to_sales_date = data.to_sales_date;
    } else {
      if (state.searchInfo.hasOwnProperty('to_sales_date')) {
        delete state.searchInfo['to_sales_date'];
      }
    }

    if (data.start_position) {
      state.searchInfo.start_position = data.start_position;
    }

    if (data.end_position) {
      state.searchInfo.end_position = data.end_position;
    }
  },
  // Set total record
  [types.SET_TOTAL_RECORD](state, recordNum){
    state.totalRecord = recordNum;
  },
  // Set is refresh page
  [types.REFRESH_HOME_PAGE](state, isRefresh){
    state.refresh = isRefresh;
  },
  // Update page show
  [types.UPDATE_PAGE](state, paginate){
    state.paginate.page = paginate.page || 1;
    state.paginate.limit = paginate.limit || Config.RECORD_PER_PAGE;
  },

  [types.UPDATE_CLICK_SEARCH](state, bool){
    state.isClickBtnSearch = bool;
  }
}
