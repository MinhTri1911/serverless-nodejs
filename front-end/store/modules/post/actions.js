import * as types from './mutation-type'

import axios from 'axios'

export const setPosts = ({ commit }, posts) => {
    // commit(types.SET_POST, posts)
}

export const addPost = ({ commit }, addPost) => {
    commit(types.ADD_POST, addPost)
}

export const editPost = ({ commit }, editedPost) => {
    commit(types.EDIT_POST, editedPost)
}

export const nuxtClientInit = ({ commit, error }) => {

    return axios.get(process.env.fbUrl + '/posts.json')
        .then(res => {
            const postsArray = []

            for (const key in res.data) {
                postsArray.push({...res.data[key] ,id :key})
            }

            commit(types.SET_POST, postsArray)
        })
        .catch(e => {
            error(e)
        })
}

export const increment = ({commit}) => {
  commit(types.increment);
}

export const decrement = ({commit}) => {
  commit(types.decrement);
}

export default {
    setPosts,
    addPost,
    editPost,
    nuxtClientInit,
  increment,
  decrement
}
