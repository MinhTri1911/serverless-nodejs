/**
 * File ActiveAccountBusiness.js
 * Handler business in page complete register
 * Active account after register
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-22
 */

import constant from '@/constant';
import { post, get } from '@/plugins/api';
import ClientInfo from '@/components/UI/ClientInfo';

export default {
  middleware: 'redirect_if_authenticated',
  head() {
    return {
      title: this.$t('register.lb_title_complete')
    }
  },
  data: () => ({
    model: {
      inquiryNm: '',
      inquiryTelNo: '',
      inquiryUrl: '',
      inquiryNote: ''
    },
    linkToLoginPage: '',
    flagClickButtonActive: false,
  }),
  created() {
    let pathToLoginPage = this.$router.resolve({
      name: constant.router.LOGIN_NAME,
      params: { client_id: this.$route.params.client_id }
    });

    this.linkToLoginPage = pathToLoginPage.href;

    localStorage.removeItem('is_checked_both');
    this.$store.dispatch('register/updateStepTwo', false);

    this.initPage();
  },
  methods: {
    /**
     * Function init page
     *
     * @returns {void}
     */
    initPage() {
      let clientId = this.$route.params.client_id;
      let key = this.$route.query.key;

      return get(constant.api.INIT_PAGE_COMPLETE, { client_id: clientId, key: key })
        .catch(err => {
          let messages = [
              this.$t('message.msg001_timeout.line_1'),
              this.$t('message.msg001_timeout.line_2'),
              this.$t('message.msg001_timeout.line_3')
            ];

          this.$store.dispatch('auth/setError', messages);
          this.redirectToError();
        });
    },

    /**
     * Function call api active account
     *
     * @returns {void}
     */
    activeAccount: function() {
      let clientId = this.$route.params.client_id;
      let key = this.$route.query.key;

      return post(constant.api.ACTIVE_ACCOUNT, { client_id: clientId, key: key })
        .then(res => {
          if (res.data.data.code == constant.http.SUCCESS) {
            let clientInf = res.data.data.client_inf;

            this.model.inquiryNm = clientInf.inquiry_nm;
            this.model.inquiryTelNo = clientInf.inquiry_tel_no;
            this.model.inquiryUrl = clientInf.inquiry_url;
            this.model.inquiryNote = clientInf.inquiry_notes;
            this.flagClickButtonActive = true;
          } else {
            throw new Error();
          }

        }).catch(err => {
          let messages = [];

          if (err.response.data.data.code == constant.http.NOT_FOUND) {
            messages = [
              this.$t('message.msg001_timeout.line_1'),
              this.$t('message.msg001_timeout.line_2'),
              this.$t('message.msg001_timeout.line_3')
            ];
          } else {
            messages = [
              this.$t('message.msg003_exception.line_1'),
              this.$t('message.msg003_exception.line_2'),
              this.$t('message.msg003_exception.line_3')
            ];
          }

          this.$store.dispatch('auth/setError', messages);
          this.redirectToError();
        });
    },

    /**
     * Function redirect to page error
     *
     * @returns {void}
     */
    redirectToError: function() {
      let path = this.$router.resolve({
        name: constant.router.ERROR_NAME,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    },
  },
  components: {
    ClientInfo
  }
}
