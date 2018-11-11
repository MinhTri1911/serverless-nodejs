import {post} from '@/plugins/api'
import pathAPI from '@/constant/api'

const MSG_NOT_FOUND_CLIENT = "Not found client id";
const MSG_INVALID_CLIENT = "サービスは終了致しました。";

// Config cookie
let objCookie = {
  clearCookieClient: function(store){
    // Clear cookie if exists data client and error
    return store.dispatch('client/clearClientInfo');
  },
  setCookieClient: function(store, client){
    // Set data to cookie
    return store.dispatch('client/setClientInfo', client);
  }
}

export default async function ({store, redirect, route, error}) {
  if (route.params.client_id) {
    let clientId = route.params.client_id;
    await post(pathAPI.GET_CLIENT_INFO, {
      client_id: clientId
    }).then(res => {
      let clientInfo = res.data.data;
      // Check exists client id
      if (typeof clientInfo !== 'undefined' && clientInfo.length == 0) {
        objCookie.clearCookieClient(store);
        return error({statusCode: 404, message: MSG_NOT_FOUND_CLIENT})
      }
      // Check expired client id
      let today = new Date();
      let ymd = today.getFullYear() + '' + (today.getMonth()+1) + '' + today.getDate() ;
      if (ymd < clientInfo.apply_start_date || ymd > clientInfo.apply_end_date || !clientInfo.enable_kb) {
        // Clear cookie if exists data client and error
        objCookie.clearCookieClient(store);
        return error({statusCode: 412, message: MSG_INVALID_CLIENT})
      }
      // Set data to cookie
      objCookie.clearCookieClient(store);
      objCookie.setCookieClient(store, clientInfo);
    }).catch(err => {
      error({statusCode: 500, message: err.toString()})
    });
  } else {
    if (route.name != 'error') {
      objCookie.clearCookieClient(store);
      return error({statusCode: 404, message: MSG_NOT_FOUND_CLIENT})
    }
  }
}


