import * as types from './mutation-type'

export default {
    [types.ADD_POST](state, data) {
        state.loadedPosts.push(data)
    },
    
    [types.SET_POST](state, data) {
        state.loadedPosts = data
    },

    [types.EDIT_POST](state, data) {
        const postIndex = state.loadedPosts.findIndex(
            post => post.id === data.id
          )

        state.loadedPosts[postIndex] = data
    },
  [types.increment](state) {
    state.counter++;
  },
  [types.decrement](state) {
    state.counter--;
  }

}