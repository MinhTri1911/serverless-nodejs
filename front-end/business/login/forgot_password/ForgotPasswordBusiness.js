/**
 * File ForfotPasswordBusiness.js
 * Check email and phone to send URL setting password to user
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import constant from '@/constant';
import Axios from 'axios';
import { post } from '@/plugins/api';

export default {
  name: 'ForgotPassword',
  layout: 'default',
  middleware: 'guest',
  data() {
    return {
      error: false,
      email: '',
      phone: '',
      clientId: '',
    }
  },
  created() {
    this.renderMsgErr();
  },
  methods: {
    /**
     * Function go to back page
     *
     * @returns {void}
     */
    back() {
      this.$router.go(-1);
    },

    /**
     * Function submit form to send data to API forgot password
     *
     * @returns {void}
     */
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            Authorization: "",
          };

          // Post data to API by Axios
          return post(constant.api.FORGOT_PASSWORD_API, {
            email: this.email,
            phone: this.phone,
            client_id: this.$route.params.client_id,
          })
          .then(result => {
            if (result.data.data.result) {
              this.$router.push({name: constant.router.COMPLETE_SEND_EMAIL_PASS});
            }
          })
          .catch(e => {
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
          email: {
            required: this.$t('validation.required', { field: this.$t('login.lb_login_email') }),
          },
          phone: {
            required: this.$t('validation.required', { field: this.$t('login.lb_phone') }),
          }
        }
      }
      this.$validator.localize('ja', dict);
    }
  }
}
