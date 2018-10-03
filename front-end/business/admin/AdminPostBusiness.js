import AdminPostForm from '@/components/Admin/AdminPostForm'

import axios from 'axios';
export default {
  layout: "admin",
  // middleware: ['check-auth', 'auth'],
  middleware: 'authenticated',
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios
      .get(
        process.env.fbUrl + "/posts/" +
          context.params.postId +
          ".json"
      )
      .then(res => {

        return {
          loadedPost: { ...res.data, id: context.params.postId }
        };
      })
      .catch(e => context.error());
  },
  methods: {
    onSubmitted(editedPost) {
         axios.put(process.env.fbUrl + "/posts/" +
          editedPost.id +
          ".json", editedPost)
          .then(res => {
              this.$store.dispatch("post/editPost", editedPost).then(() => {
                this.$router.push("/admin");
              });
          })
          .catch(e => console.log(e))
      
    }
  }
};