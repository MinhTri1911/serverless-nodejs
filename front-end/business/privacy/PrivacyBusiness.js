/**
 * File PrivacyBusiness.js
 * Show Privacy
 *
 * @author Rikkei.DucVN
 * @date 2018-10-12
 */

import constant from '@/constant';
import Axios from 'axios';
import { get } from '@/plugins/api';

export default {
  name: 'MaintenanceBusiness',
  layout: 'default',
  middleware: 'guest',
  data() {
    return {
      messenge_error: '',
      content: '',
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
      return get(constant.api.READS3, {
        client_id: this.$route.params.client_id,
        file: this.$route.params.client_id + '/' + constant.api.PRIVACY
      })
      .then(result => {
        this.content = result.data.data;
      })
      .catch(e => {
        console.log(e)
      });
    }
  },
  beforeMount(){
    this.onLoad();
  }
}
