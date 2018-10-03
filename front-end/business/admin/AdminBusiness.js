import PostList from '@/components/Posts/PostList'
import AppButton from '@/components/UI/AppButton'

import { mapActions, mapState } from 'vuex'

export default {
  layout: 'admin',
  // middleware: ['check-auth','auth'],
  middleware: ['authenticated'],
  components: {
    PostList,
    AppButton
  },
  computed: {
      ...mapState({
          post: state => state.post
      }),
      loadedPosts() {
        return this.post.loadedPosts
      }
  },
  methods : {
      ...mapActions('auth', [
        'logout'
      ]),
      onLogout() {
          this.logout()
          this.$router.push('/admin/auth')
      }
  }
}