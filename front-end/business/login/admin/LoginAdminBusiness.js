/**
 * File Loginbusiness.js
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { mapActions } from 'vuex';
import constant from '@/constant';
import datePicker from "vue-bootstrap-datetimepicker"

export default {
  name: 'Login',
  components: {
    datePicker
  },
  layout: 'admin',
  middleware: 'guest',
  	data() {
      return {
        error: false,

        // Variable to replace button "List Perform" with button "Back"
        selectChair: this.$store.state.auth.redirectURL?true:false,
        mail: '',
        password: '',
        client_id: '',
        year: '',
        hour: '',
        minute: '',
        datepicker: {
          config: {
            format: 'YYYY/MM/DD',
            useCurrent: false,
            locale: 'ja'
          }
        }
      }
    },
    methods: {
      ...mapActions('auth', [
        'login',
        'logout'
      ]),

      /**
       *Function go to Back page
       */
      back() {
        this.$router.go(-1);
      },

      /**
       *Function go to Lits Perform  for login
       */
      list() {
        this.$router.push({name: constant.router.LISTPERFORM});
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
          password: this.password,
          client_id: this.$route.params.client_id
        }

        // Set the target url when we Login successful
        let url = constant.router.BASE_URL_NAME;
        // Check stay in screen SELECT_TICKET we must change target URL
        if (this.$store.state.auth.redirectURL == constant.router.SELECT_TICKET_NAME
          || this.$store.state.auth.redirectURL == constant.router.SELECT_SEAT_NAME) {
          url = this.$store.state.auth.redirectURL;
        }

        // Call function login to Login
        this.login(user)
          .then((res) => {
            // Redirect error page when Black_cd =1
            if (this.$store.state.auth.redirectURL == constant.router.ERROR) {
              url = constant.router.ERROR_BLACK_CD;
            }
            // Redirect to the target URL
            this.$router.push({name: url});
          })
          .catch(err => {
            this.error = true;
          });
      }
    }
}
