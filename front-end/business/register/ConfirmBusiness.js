/**
 * File ConfirmBusiness.js
 * Handler business in page confirm user infomation
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-10
 */

import { mapState } from 'vuex';
import constant from '@/constant';

const DEFAULT_GENRE_INLINE = 4;

export default {
  middleware: 'guest',
  data: () => ({
    model: '',
    dataInit: {
      countLineGenre: 0,
      indexLineGenre: DEFAULT_GENRE_INLINE - 1,
      listGenre: [],
      memberInf: ''
    }
  }),
  created() {
    // Redirect to page 120 input customer infomation when not valid input
    if (!this.register.validStepOne) {
      let path = this.$router.resolve({
        name: constant.router.REGISTER_INPUT,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    }

    this.initPage();
  },
  computed: {
    ...mapState({
      register: state => state.register
    })
  },
  methods: {
    /**
     * Function go back to prev page
     *
     * @returns {void}
     */
    backToPrevPage: function() {
      let path = this.$router.resolve({
        name: constant.router.REGISTER_INPUT,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    },

    /**
     * Function init page 130 confirm user infomation
     *
     * @returns {void}
     */
    initPage: function() {
      this.model = this.register.model;

      if (this.model.flagShowGenre) {
        this.dataInit.listGenre = this.model.listGenre;
        this.dataInit.countLineGenre = this.dataInit.listGenre.length;
      }

      if (!!localStorage.getItem('member_inf')) {
        this.dataInit.memberInf = JSON.parse(localStorage.getItem('member_inf'));
      }
    }
  }
}
