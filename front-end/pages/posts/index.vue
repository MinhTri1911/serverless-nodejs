<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

import { mapState } from 'vuex'

export default {
 middleware : 'log',
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
};
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
