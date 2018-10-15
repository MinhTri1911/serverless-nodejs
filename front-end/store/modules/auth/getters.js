import state from './state'
export default {
  isLogin: (state) => {
    return state.authenticated;
  },
  getName: (state) => {
    return state.user.name;
  }
}
