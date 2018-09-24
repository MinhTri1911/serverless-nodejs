import Vuex from "vuex";
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      loadedPost: [],
      token : null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },

    actions: {
      nuxtClientInit(vuexContext, context) {
        console.log('clienInit');
        return axios.get( process.env.fbUrl +'/posts.json')
                .then( res => {
                  const postsArray = [];
                  for(const key in res.data){
                    postsArray.push({...res.data[key] ,id :key})
                  }
                  vuexContext.commit('setPosts',postsArray);
                 
                }

                  )
                .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, addPost) {
            vuexContext.commit('addPost', addPost);
      },
      editPost(vuexContext, editedPost) {
            vuexContext.commit('editPost', editedPost);
      },
      authenticateUser(vuexContext, authData) {
       
        let authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authUrl =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
            process.env.fbAPIKey;
        }
        return axios
          .post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            console.log(result.data);
            vuexContext.commit("setToken", result.data.idToken);
           
            localStorage.setItem("token", result.data.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
            );
          })
          .catch(e => console.log(e));
        
      }
      ,
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (!process.isClient && localStorage.getItem("token") != null ) {
          // get token from server 
            token =  "asdasdasd"
            expirationDate = "";
        } else {
          token =  localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        // if (new Date().getTime() > +expirationDate || !token) {
        //   console.log("No token or invalid token");
        //   vuexContext.dispatch("logout");
        //   return;
        // }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {

        vuexContext.commit("clearToken");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        // if (process.client) {
        //   localStorage.removeItem("token");
        //   localStorage.removeItem("tokenExpiration");
        // }
      }
    },
    getters: {
      loadedPosts(state) {

        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
