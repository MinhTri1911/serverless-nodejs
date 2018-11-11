import types from './mutation-type'
import {post, get} from '@/plugins/api'
import _api from '@/constant/api'
import Config from "@/constant/config"

export default {
  listShow: ({commit, state}, data) => {
    /**
     * When refresh or clear page, reset list shows
     * When scroll or paginate, add shows from response API to list shows
     */
    if (state.paginate.page && state.paginate.page <= 1) {
      commit(types.UPDATE_PAGE, {page: 1, limit: Config.RECORD_PER_PAGE})
      commit(types.CLEAR_SHOW)
    }

    var startPosition = (((state.paginate.page - 1) * state.paginate.limit) + 1) || 1;
    var endPosition = (state.paginate.page * state.paginate.limit) || Config.RECORD_PER_PAGE;

    /**
     * When user scroll to bottom, get more show, else only get 10 show record
     * With param is offset and limit to get page
     */
    var params = {
      client_id: data.client_id,
      start_position: startPosition,
      end_position: endPosition
    }

    if (data.admin_time) {
      params.admin_time = data.admin_time
    }
    if (state.searching) {
      Object.assign(params, state.searchInfo)
    }

    var tmpShow = state.shows
    /**
     * Call API get shows and set list show for state shows
     * When success, set list shows to shows of state
     * When error stop loading and show error
     */
    return post(_api.SHOW_LIST, {params: params})
      .then(result => {
        if (result.data.data.record_num > 0) {
          result.data.data.show_list.forEach(function (el, i) {
            tmpShow.push(el)
          })
          commit(types.SET_TOTAL_RECORD, result.data.data.record_num)
          //
        } else {
          if (state.paginate.page <= 1) {
            commit(types.SET_TOTAL_RECORD, result.data.data.record_num)
          }
        }
        commit(types.LIST_SHOWS, tmpShow)
        // resolve(tmpShow)
      })
      // When error, show error
      .catch(err => {
        // reject(err)
        console.log('No data from response' + err);
      })
  },

  changeStatusSearch({commit}, bool) {
    commit(types.SEARCHING, bool);
  },

  reloadHomePage: ({commit}) => {
    commit(types.UPDATE_PAGE, {page: 1})
    commit(types.REFRESH_HOME_PAGE, false)
    commit(types.RESET_SEARCH);
    setTimeout(() => {
      commit(types.SEARCHING, false)
      commit(types.RESET_SEARCH);
      commit(types.CLEAR_SHOW);
      commit(types.REFRESH_HOME_PAGE, true)
    }, 10)
  },

  updatePage({commit}, page) {
    commit(types.UPDATE_PAGE, {page: page})
  },

  /**
   * Add data to search state
   * @param commit
   * @param state
   * @param data
   */
  addFormSearch({commit, state}, data) {
    if (data.key_search || data.genre_no || data.from_show_date
      || data.to_show_date || data.from_sales_date || data.to_sales_date) {
      commit(types.SEARCHING, true)
    } else {
      commit(types.SEARCHING, false)

    }

    commit(types.ADD_SEARCH_FORM, data);
  },

  /**
   * When user refresh or reload page, reset and inti data search
   * @param commit
   * @param state
   * @param route
   */
  initReloadSearch({commit, state}, route) {
    var data = null;
    if (route) {
      data = route.query;
    }

    if (data.key_search || data.genre_no || data.from_show_date
      || data.to_show_date || data.from_sales_date || data.to_sales_date) {
      commit(types.SEARCHING, true)
    } else {
      commit(types.SEARCHING, false)
    }

    commit(types.ADD_SEARCH_FORM, data)
  },

  /**
   * Clean search data and reset search
   * @param commit
   * @param state
   */
  resetSearch({commit, state}) {
    commit(types.SEARCHING, false)
    commit(types.RESET_SEARCH);
    commit(types.CLEAR_SHOW);
  },

  updateClickBtnSearch({commit, state}, bool) {
    commit(types.UPDATE_CLICK_SEARCH, false);
    setTimeout(function () {
      commit(types.UPDATE_CLICK_SEARCH, bool);
    }, 10)
  }
}
