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
const MALE = 0;
const FEMALE = 1;
const HTTP_SUCCESS = 200;

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
      post(constant.api.REGISTER, {
        clientId: this.$route.params.client_id,
        memberCode: this.model.memberCode,
        password: this.model.password,
        mail: this.model.mail,
        fullName: this.model.fullName,
        furigana: this.model.furigana,
        postNo: this.model.postCode,
        prefecture: this.model.slbCity,
        municipality: this.model.district,
        address1: this.model.address,
        address2: this.model.buildingRoom,
        telNo: this.model.phoneNumber,
        mobileNo: this.model.cellPhone,
        mailSendFlg: this.model.magazineMail,
        postSendFlg: this.model.directMail,
        sexType: this.model.gender === 'male' ? MALE : FEMALE,
        birthday: this.model.birthday,
        listGenre: this.model.genre
      }).then(res => {
        if (res.data.data.code !== HTTP_SUCCESS) {
          throw new Error();
        }

        this.$store.dispatch('register/updateStepTwo', true);

        let path = this.$router.resolve({
          name: constant.router.REGISTER_COMPLETE_TEMPORARY,
          params: { client_id: this.$route.params.client_id }
        });

        this.$router.push(path.href);
      }).catch(err => {
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
        } else {
          this.$store.dispatch('auth/setError', [
            this.$t('message.msg003_exception.line_1'),
            this.$t('message.msg003_exception.line_2'),
            this.$t('message.msg003_exception.line_3')
          ]);

          this.redirectToError();
        }
      });
    }
  }
}
