/**
 * File Loginbusiness.js
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { mapActions } from 'vuex'
import constant from '../../constant';

export default {
  name: 'Login',
  layout: 'default',
  middleware: 'guest',
  	data() {
      return {
        error: false,

        // Variable to replace button "Listcongdien" with button "Back"
        ManhinhChonghe: localStorage.getItem('redirect_url')?true:false,
        mail : '',
        password : '',
      }
	  },
    methods: {
      ...mapActions('auth', [
        'login',
        'logout'
      ]),
      /**
       *
       */
      back() {
        this.$router.go(-1);
      },

      /**
       *
       */
      list() {
        this.$router.push('/listperform');
      },

      /**
       * Function submit form for login
       *
       * @returns {void}
       */
      onSubmit() {
        // Get user input
        let user = {
          mail: this.mail,
          password: this.password
        }

        // Set the target url when we Login successful
        var url = "/listperform";

        // Check stay in screen SELECT_TICKET we must change target URL
        if ((localStorage.getItem('redirect_url')) == constant.router.SELECT_TICKET) {
          url = localStorage.getItem('redirect_url');
        }

        // Call function login to Login
        this.login(user)
          .then((res) => {
            // Redirect to the target URL
            this.$router.push(url);
          })
          .catch(err => {
            this.error = true;
          });
      }
    }
}
