import types from './mutation-type'
import {post, get} from '@/plugins/api'
import _api from '@/constant/api'

export default {
  listShow: ({commit, state}, payload) => {
    /**
     * When user click button search, commit this handle is search
     */
    commit(types.SEARCHING, false)
    commit(types.RESET_SEARCH)
    if (payload.$route.query.q || payload.$route.query.genre_no || payload.$route.query.from_show_date
       || payload.$route.query.to_show_date || payload.$route.query.from_sales_date || payload.$route.query.to_sales_date) {
      commit(types.SEARCHING, true)
      commit(types.ADD_SEARCH_FORM, payload)
    }

    /**
     * When refresh or clear page, reset list shows
     * When scroll or paginate, add shows from response API to list shows
     */
    // console.log(payload.page <= 1)
    if (payload.page <= 1) {
      // Commit clear shows list
      commit(types.CLEAR_SHOW)
      commit(types.SET_TOTAL_RECORD, 0)
    }
    payload.$nuxt.$loading.start()
    return new Promise((resolve, reject) => {
      /**
       * When user scroll to bottom, get more show, else only get 10 show record
       * With param is offset and limit to get page
       */
      var params = {
        client_id: payload.$route.params.client_id,
        offset: payload.offset,
        limit: payload.limit
      }
      Object.assign(params, state.searchInfo)
      var tmpShow = state.shows

      /**
       * Call API get shows and set list show for state shows
       * When success, set list shows to shows of state
       * When error stop loading and show error
       */
      return post(_api.SHOW_LIST, { params: params })
        .then(result => {
           if (result.data.data.record_num > 0) {
             let duplidateShow = []
             result.data.data.show_list.forEach(function (el, i) {
               if (el.show_group_disp_kb != 1) {
                 tmpShow.push(el)
               } else {
                 var tex = Object.assign({}, el);
                 el.list_sales = [tex]

                 let indexExistsShow = tmpShow.findIndex(function(te){
                   return te.show_group_id == el.show_group_id
                 })

                 if (indexExistsShow >= 0) {
                   if (!tmpShow[indexExistsShow].list_sales) {
                     tmpShow[indexExistsShow].list_sales = [tex]
                   } else {
                     tmpShow[indexExistsShow].list_sales.push(tex)
                   }
                 } else {
                   tmpShow.push(el)
                 }
               }
             })
             commit(types.SET_TOTAL_RECORD, result.data.data.record_num)

           } else {
             if (payload.page <= 1) {
               commit(types.SET_TOTAL_RECORD, result.data.data.record_num)
             }
           }
           // console.log(tmpShow)
          commit(types.LIST_SHOWS, tmpShow)
          payload.$nuxt.$loading.finish()
        })
        // When error, show error
        .catch(err => {
          console.log('No data from response' +err);
          // commit(types.SEARCHING, false)
          payload.$nuxt.$loading.finish()
        })
    })
  },
  changeIsSearch: ({commit}, payload) => {
    if (payload.$route.query.q || payload.$route.query.genre_no || payload.$route.query.from_show_date
      || payload.$route.query.to_show_date || payload.$route.query.from_sales_date || payload.$route.query.to_sales_date) {
      commit(types.SEARCHING, true)
    } else{
      commit(types.SEARCHING, false)
    }
  },

  startSearch({commit}, payload) {
    commit(types.SEARCHING, false)
    setTimeout(() => {
      commit(types.SEARCHING, true)
    }, 10)

  }
  // resetSearch: ({commit}, payload) => {
  //   commit(types.RESET_SEARCH, payload);
  // },
}
