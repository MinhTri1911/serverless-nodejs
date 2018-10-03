import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'AdminAuthPage',
  layout: 'admin',
  middleware: 'guest',
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
		...mapActions('auth', [
			'login',
			'logout'
		]),
		onSubmit(){
			let user = {
				isLogin: this.isLogin,
				email: this.email,
				password: this.password
			}

			this.login(user)
				.then((res) => {
					console.log(res)

					let url = localStorage.getItem('redirect_url')
						? localStorage.getItem('redirect_url')
						: '/'

					console.log(url)
					this.$router.push(url)
				})
				.catch(err => {
					console.log(err)
					this.logout()
				})
		}
	}
}