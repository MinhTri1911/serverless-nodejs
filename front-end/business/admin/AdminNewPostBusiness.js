import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from 'axios'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  components: {
    AdminPostForm
  },
  methods : {
    onSubmitted(postData){
      axios.post( process.env.fbUrl + '/posts.json',postData)
      .then(result => {
         this.$store.dispatch("addPost", postData).then(() => {
                this.$router.push("/admin");
              });

      })
      .catch(e=> console.log(e))
    }
  }
};