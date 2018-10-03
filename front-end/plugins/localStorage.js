import createPersistedState from 'vuex-persistedstate'
console.log('local');
export default ({store}) => {
  createPersistedState({
    key: 'vuex'

  })(store)
}