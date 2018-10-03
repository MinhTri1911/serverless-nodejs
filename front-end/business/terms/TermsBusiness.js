export default {
  middleware: 'guest',
  data: () => ({
    protectPerInf : false,
    termsUse: false,
    validation: false,
    message: '',
  }),
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
        name: 'register-input',
      });

      this.$router.push(path.href);
    }
  }
}