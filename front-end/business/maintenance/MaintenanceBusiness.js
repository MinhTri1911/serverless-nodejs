/**
 * File MaintenanceBusiness.js
 * Show error
 *
 * @author Rikkei.DucVN
 * @date 2018-10-12
 */

import constant from '@/constant';
import Axios from 'axios';
import { post } from '@/plugins/api';

export default {
  name: 'MaintenanceBusiness',
  layout: 'maintenance',
  middleware: 'guest',
  data() {
    return {
      messenge_error: '',
      inquiry_nm: '',
      inquiry_tel_no: '',
      inquiry_url: '',
      inquiry_notes: '',
      clientId: '',
    }
  },
  methods: {

    /**
     * Function go to Lits Perform
     *
     * @returns {void}
     */
    list() {
      this.$router.push({name: constant.router.LISTPERFORM});
    },

     /**
     * Function to load error messenger
     *
     * @returns {void}
     */
    loadError() {
      this.messenge_error = this.$store.state.auth.error
    },

    /**
     * Function load info client to display
     *
     * @returns {void}
     */
    onLoad() {
      Axios.defaults.headers.common = {
        'Content-Type': 'application/json',
        Authorization: "",
      };

      // Post data to API by Axios
      return post(constant.api.GET_CLIENT_INFO, {
        client_id: this.$route.params.client_id,
      })
      .then(result => {
        this.inquiry_nm = result.data.data.inquiry_nm;
        this.inquiry_url = result.data.data.inquiry_url;
        this.inquiry_notes = result.data.data.inquiry_notes;
        this.inquiry_tel_no = result.data.data.inquiry_tel_no;
      })
      .catch(e => {
        console.log(e)
      });
    }
  },
  beforeMount(){
    this.onLoad();
    this.loadError();
  }
}
