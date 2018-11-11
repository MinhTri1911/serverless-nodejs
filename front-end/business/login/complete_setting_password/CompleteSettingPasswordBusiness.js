/**
 * File CompleteSettingPasswordBusiness.js
 * Alert conplete setting password
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import constant from '@/constant';
import Axios from 'axios';
import { post } from '@/plugins/api';
import ClientInfo from '@/components/UI/ClientInfo';

export default {
  name: 'CompleteSettingPasswordBusiness',
  layout: 'default',
  middleware: 'guest',
  data() {
    return {
      error: false,
      click_login: false,
      model: {
        inquiry_nm: '',
        inquiry_tel_no: '',
        inquiry_url: '',
        inquiry_notes: '',
        client_id: '',
      }
    }
  },
  methods: {
    /**
     * Function go to login page
     *
     * @returns {void}
     */
    login() {
      this.$router.push({name: constant.router.LOGIN_NAME});
    },

    /**
     * Function load page to display
     *
     * @returns {void}
     */
    onLoad() {
      this.$nuxt.$loading.start()
      this.click_login = true;
      Axios.defaults.headers.common = {
        'Content-Type': 'application/json',
        Authorization: "",
      };

      // Post data to API by Axios
      return post(constant.api.GET_CLIENT_INFO, {
        client_id: this.$route.params.client_id,
      })
      .then(result => {
        this.$nuxt.$loading.finish();
        this.click_login = false;
        this.model.inquiry_nm = result.data.data.inquiry_nm;
        this.model.inquiry_url = result.data.data.inquiry_url;
        this.model.inquiry_notes = result.data.data.inquiry_notes;
        this.model.inquiry_tel_no = result.data.data.inquiry_tel_no;
      })
      .catch(e => {
        this.click_login = false;
        this.error = true;
      });
    }
  },
  beforeMount(){
    this.$nextTick(() => {
      this.onLoad();
    })
  },
  components: {
    ClientInfo
  }
}
