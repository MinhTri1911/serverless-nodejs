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
  name: 'LoginAdmin',
  components: {
    datePicker
  },
  // render: h => h(datePicker),
  layout: 'admin',
  middleware: 'guest',
  data() {
    return {
      error: false,
      account_id: '',
      password: '',
      client_id: '',
      date: '',
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
  created() {
    this.renderMsgErr();
  },
  methods: {
    ...mapActions('auth', [
      'loginAdmin',
      'logoutAdmin'
    ]),
    /**
     * Function submit form for login
     *
     * @returns {void}
     */
    onSubmit() {
      this.$validator.validateAll()
        .then((valid) => {
          if (valid) {
            this.$nuxt.$loading.start()
            // Get user input
            let user = {
              account_id: this.account_id,
              password: this.password,
              client_id: this.$route.params.client_id,
              admin_time: {
                date: this.date,
                hour: this.hour,
                minute: this.minute,
              }
            };

            // Set the target url when we Login successful
            let url = constant.router.BASE_URL_NAME;

            // Call function login to Login
            this.loginAdmin(user)
              .then((res) => {
                this.$nuxt.$loading.finish();

                // Redirect to the target URL
                this.$router.push({name: url});
              })
              .catch(err => {
                this.$nuxt.$loading.finish();
                this.error = true;
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
          account_id: {
            required: this.$t('validation.required', { field: this.$t('login.lb_login_ID_admin') }),
          },
          password: {
            required: this.$t('validation.required', { field: this.$t('login.lb_login_password') }),
          },
          date: {
            date_format: this.$t('validation.date_format', { field: this.$t('login.lb_login_time') }),
            required: this.$t('validation.required', { field: this.$t('login.lb_login_time') }),
          },
          hour: {
            between: this.$t('validation.between', { field: this.$t('login.lb_login_hour') }),
            required: this.$t('validation.required', { field: this.$t('login.lb_login_hour') }),
          },
          minute: {
            between: this.$t('validation.between', { field: this.$t('login.lb_login_minute') }),
            required: this.$t('validation.required', { field: this.$t('login.lb_login_minute') }),
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
