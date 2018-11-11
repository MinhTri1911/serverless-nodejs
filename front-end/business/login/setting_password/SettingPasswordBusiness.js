/**
 * File SettingPasswordBusiness.js
 * Setting new password
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import constant from '@/constant';
import Axios from 'axios';
import { post } from '@/plugins/api';

export default {
  name: 'SettingPassword',
  layout: 'default',
  middleware: 'guest',
  data() {
    return {
      error: false,
      valid: false,
      click_login: false,
      key: this.$route.params.key,
      password: '',
      password_confirm: '',
      client_id: this.$route.params.client_id,
    }
  },
  created() {
    this.renderMsgErr();
  },
  methods: {
    /**
     * Function submit back previous page
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
          this.$nuxt.$loading.start()
          this.click_login = true,
          this.error = false;
          Axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            Authorization: "",
          };

          // Post data to API by Axios
          return post(constant.api.SETTING_PASSWORD_API, {
            key: this.key,
            password: this.password,
            client_id: this.client_id,
          })
          .then(result => {
            this.$nuxt.$loading.finish();
            if (result.data.data.result||result.status) {
              this.$router.push({name: constant.router.COMPLETE_SETTING_PASSWORD});
            } else {this.error = true;}
          })
          .catch(err => {
            this.$nuxt.$loading.finish();
            this.click_login = false,
            this.error = true;
          });
        }
      }).catch(() => {
        return false;
      });
    },

    // Check key when load page
    onLoad() {
      this.$nuxt.$loading.start();

      // Post key to API by Axios
      return post(constant.api.CHECK_KEY, {
        key: this.$route.params.key, client_id: this.client_id
      })
      .then(result => {
        this.$nuxt.$loading.finish();
        this.valid = true;
      })
      .catch(e => {
        this.$nuxt.$loading.finish();
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
            min: this.$t('login.lb_password_error_min'),
            max: this.$t('login.lb_password_error_max'),
            passwordRegex: this.$t('login.lb_password_error_regex'),
            required: this.$t('validation.required', { field: this.$t('login.lb_new_password') }),
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
  },
  beforeMount() {
    this.$nextTick(() => {
      this.onLoad();
    })
  }
}
