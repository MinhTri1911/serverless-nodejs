import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

let cookieStorage = {
  getItem: function(key) {
    return Cookies.getJSON(key);
  },
  setItem: function(key, value) {
    return Cookies.set(key, value, {expires: 0.5, secure: false});
  },
  removeItem: function(key) {
    return Cookies.remove(key);
  }
};
export default ({store}) => {
  createPersistedState({
    storage: cookieStorage,
    getState: cookieStorage.getItem,
    setState: cookieStorage.setItem

  })(store)
}