<template>
    <div class="posts-page">
        <PostList :posts="loadedPosts" />
        <br>
        <div>
            <p>{{ post.counter }}</p>
            <p>
                <button @click="increment">+</button>
                <button @click="decrement">-</button>
            </p>
        </div>
    </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

import { mapState, mapMutations, mapActions} from 'vuex'

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
  },
  methods: {

    ...mapActions('post', [
      'increment',
      'decrement'
    ]),
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
