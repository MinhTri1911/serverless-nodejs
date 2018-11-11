/**
 * File ConfirmBusiness.js
 * Handler business in page confirm user infomation
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-10
 */

import { mapState } from 'vuex';
import constant from '@/constant';
import { post, get } from '@/plugins/api';

const DEFAULT_GENRE_INLINE = 4;
const IS_EXISTS = 1;

export default {
  middleware: 'redirect_if_authenticated',
  head() {
    return {
      title: this.$t('register.lb_title_confirm_inf')
    }
  },
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

    /**
     * Function register user
     *
     * @returns {void}
     */
    postRegister: function() {
      this.$nuxt.$loading.start();

      post(constant.api.REGISTER, {
        client_id: this.$route.params.client_id,
        member_code: this.model.memberCode,
        password: this.model.password,
        mail: this.model.mail,
        full_name: this.model.fullName,
        furigana: this.model.furigana,
        post_no: this.model.postCode,
        prefecture: this.model.slbCity,
        municipality: this.model.district,
        address1: this.model.address,
        address2: this.model.buildingRoom,
        tel_no: this.model.phoneNumber,
        mobile_no: this.model.cellPhone,
        mail_send_flg: this.model.magazineMail,
        post_send_flg: this.model.directMail,
        sex_type: this.model.gender === 'male' ? constant.config.MALE : constant.config.FEMALE,
        birthday: this.model.birthday,
        list_genre: this.model.genre
      }).then(res => {
        if (res.data.data.code !== constant.http.SUCCESS) {
          throw new Error();
        }

        this.$nuxt.$loading.finish();
        this.$store.dispatch('register/updateStepTwo', true);

        let path = this.$router.resolve({
          name: constant.router.REGISTER_COMPLETE_TEMPORARY,
          params: { client_id: this.$route.params.client_id }
        });

        this.$router.push(path.href);
      }).catch(err => {
        this.$nuxt.$loading.finish();

        if (err.response.status == constant.http.ERROR) {
          this.$store.dispatch('auth/setError', [
            this.$t('message.msg003_exception.line_1'),
            this.$t('message.msg003_exception.line_2'),
            this.$t('message.msg003_exception.line_3')
          ]);

          this.redirectToError();

          return;
        }

        let errors = err.response.data.data.errors;

        // If validator mail fail then redirect to page 120
        if (Object.keys(errors).includes('mail') || Object.keys(errors).includes('memberCode')) {
          let pathToInput = this.$router.resolve({
            name: constant.router.REGISTER_INPUT,
            params: { client_id: this.$route.params.client_id }
          });

          let msg = [];

          if (Object.keys(errors).includes('mail')) {
            msg.push(this.$t('validation.unique', { field: this.$t('register.lb_mail') }));
          }

          if (Object.keys(errors).includes('memberCode')) {
            msg.push(this.$t('message.msg065_not_exists_member_code'));
          }

          this.$store.dispatch('auth/setError', msg);
          this.$router.push(pathToInput.href);
        }
      });
    }
  }
}
