/**
 * File Loginbusiness.js
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { mapActions } from 'vuex';
import constant from '@/constant';

export default {
  name: 'Login',
  layout: 'default',
  middleware: 'guest',
  	data() {
      return {
        error: false,
        clickLogin: false,

        // Variable to replace button "List Perform" with button "Back"
        selectChair: this.$store.state.auth.redirectURL?true:false,
        mail: '',
        password: '',
        client_id: '',
      }
    },
    created() {
    this.renderMsgErr();
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
        this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.$nuxt.$loading.start()

          // Get user input
          let user = {
            mail: this.mail,
            password: this.password,
            client_id: this.$route.params.client_id
          };
          this.error = false;
          this.clickLogin = true;

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

              this.clickLogin = false;

              // Redirect error page when Black_cd =1
              if (this.$store.state.auth.redirect_URL_BLACKCD == constant.router.ERROR) {
                url = constant.router.ERROR_BLACK_CD;
              }
              // Redirect to the target URL
              this.$router.push({name: url, params: { id: this.$store.state.auth.id}, query: this.$store.state.auth.query });
              this.$nuxt.$loading.finish();
            })
            .catch(err => {
              this.$nuxt.$loading.finish();
              this.error = true;
              this.clickLogin = false;
            });
        }
      }).catch(() => {
        return false;
      });
    },

     /**
     * Function overider message validator
     *
     * @returns {void}
     */
    renderMsgErr: function() {
      const dict = {
        custom: {
          loginMail: {
            required: this.$t('validation.required', { field: this.$t('login.lb_ID') }),
            regex: this.$t('validation.regex', { field: this.$t('login.lb_ID') }),
            email: this.$t('validation.email', { field: this.$t('login.lb_ID') }),
            numeric: this.$t('validation.numeric', { field: this.$t('login.lb_ID') })
          },
          loginPwd: {
            required: this.$t('validation.required', { field: this.$t('login.lb_login_password') }),
          }
        }
      }
      this.$validator.localize('ja', dict);
    },
    validate() {
      this.error = false;
      this.$validator.validateAll().catch(() => {
        return false;
      });
    }
  }
}
