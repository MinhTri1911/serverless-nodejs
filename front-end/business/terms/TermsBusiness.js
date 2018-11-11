/**
 * File TermBusiness.js
 * Handler business in page terms
 *
 * @author Rikkei.TriHNM
 * @date 2018-09-28
 */

import constant from '@/constant';

export default {
  middleware: 'redirect_if_authenticated',
  head() {
    return {
      title: this.$t('terms.lb_title_terms')
    }
  },
  data: () => ({
    protectPerInf : false,
    termsUse: false,
    validation: false,
    message: '',
    pathToPageHome: {
      name: constant.router.LISTPERFORM,
      params: { client_id: '' }
    },
    routerNameKiyaku: constant.router.KIYAKU,
    routerNamePrivate: constant.router.PRIVATE
  }),
  created() {
    this.pathToPageHome.params.client_id = this.$route.params.client_id;
  },
  mounted() {
    // After render layout then check if both of checkbox is checked
    if (!!localStorage.getItem('is_checked_both')) {
      this.termsUse = true;
      this.protectPerInf = true;
    }
  },
  methods: {
    /**
     * Function check can go to next page
     */
    goToPageRegister() {
      if (!this.protectPerInf || !this.termsUse) {
        this.message = this.$t('message.msg028_explain_register');
        this.validation = true;
        localStorage.removeItem('is_checked_both');

        return;
      }

      this.validation = false;
      this.message = '';

      // Save status is accept both of term
      localStorage.setItem('is_checked_both', 1);

      // Redirect to page 120 register infomation customer
      let path = this.$router.resolve({
        name: constant.router.REGISTER_INPUT,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    }
  }
}
