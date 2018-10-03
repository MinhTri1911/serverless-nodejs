import PostList from "@/components/Posts/PostList"
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    PostList
  },
  computed: {
    ...mapState({
      post: state => state.post
    }),
    loadedPosts() {
      return this.post.loadedPosts
    }
  }
  // data() {
  //   return {
  //     loadedPosts: []
  //   };
  // },
};