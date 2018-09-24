import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'
import axios from 'axios'
export default {
  name: 'AdminAuthPage',
  layout: 'admin',
  components: {
    AppControlInput,
    AppButton
  },
  data() {
    return {
      isLogin: true ,
      email : '',
      password : ''
    }
  },
  methods : {
   onSubmit(){
      this.$store.dispatch("authenticateUser", {
              isLogin: this.isLogin,
              email: this.email,
              password: this.password
            })
            .then(() => {
              this.$router.push('/admin');
            });
   }
  }
}