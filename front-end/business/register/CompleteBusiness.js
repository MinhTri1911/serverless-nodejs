/**
 * File Complete.js
 * Handle complete register
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-17
 */
import { mapState } from 'vuex';
import constant from '@/constant';

export default {
  middleware: 'guest',
  data: () => ({
    model: {
      inquiryNm: '',
      inquiryTelNo: '',
      inquiryUrl: '',
      inquiryNote: ''
    },
  }),
  created() {
    if (!this.register.validStepTwo) {
      let path = this.$router.resolve({
        name: constant.router.REGISTER_CONFIRM,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    }

    if (!!localStorage.getItem('contact_inf')) {
      let contactInf = JSON.parse(localStorage.getItem('contact_inf'));
      this.model.inquiryNm = contactInf.inquiryNm;
      this.model.inquiryTelNo = contactInf.inquiryTelNo;
      this.model.inquiryUrl = contactInf.inquiryUrl;
      this.model.inquiryNote = contactInf.inquiryNote;
    }

    this.$store.dispatch('register/removeModel');
    this.$store.dispatch('register/updateStepOne', false);
  },
  computed: {
    ...mapState({
      register: state => state.register
    })
  }
}
