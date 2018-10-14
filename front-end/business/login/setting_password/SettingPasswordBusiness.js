/**
 * File SettingPasswordBusiness.js
 * Setting new password
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import constant from '@/constant';
import Axios from 'axios';
import { get, post } from '@/plugins/api';

export default {
  name: 'SettingPassword',
  layout: 'default',
  middleware: 'guest',
  data() {
    return {
      error: false,
      valid: false,
      key: this.$route.params.key,
      password: '',
      password_confirm: '',
      clientId: this.$route.params.client_id,
    }
  },
  created() {
    this.renderMsgErr();
  },
  methods: {
    /**
     * Function submit to back previous page
     *
     * @returns {void}
     */
    back() {
      this.$router.go(-1);
    },
    /**
     * Function submit form for setting password
     *
     * @returns {void}
     */
    onSubmit() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          Axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            Authorization: "",
          };
          // Post data to API by Axios
          return post(constant.api.SETTING_PASSWORD_API, {
            key: this.key,
            password: this.password,
            clientId: this.clientId,
          })
          .then(result => {
            if (result.data.data.result) {
              this.$router.push({name: constant.router.COMPLETE_SETTING_PASSWORD});
            } else {this.error = true;}
          })
          .catch(err => {
            this.error = true;
          });
        }
      }).catch(() => {
        return false;
      });
    },

    // Check key when load page
    onLoad() {
      // Post key to API by Axios
      return post(constant.api.CHECK_KEY, {
        key: this.$route.params.key, clientId: this.clientId
      })
      .then(result => {
        this.valid = true;
      })
      .catch(e => {
        this.$router.push({name: constant.router.ERROR_URL_EXPIRED});
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
          password: {
            passwordRegex: this.$t('validation.passwordRegex', { field: this.$t('login.lb_new_password') }),
            required: this.$t('validation.required', { field: this.$t('login.lb_new_password') }),
          }
        }
      }
      this.$validator.localize('ja', dict);
    },
  },
  beforeMount() {
    this.onLoad();
  }
}
