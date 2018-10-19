/**
 * File InputBusiness.js
 * Handler business in page enter custom infomation
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-05
 */

import constant from '@/constant';
import { get } from '@/plugins/api';
import { mapState } from 'vuex';

const DEFAULT_GENRE_INLINE = 4;
const ENTER_SPACE = 1;
const REMOVE_SPACE = 2;
const ENTER_DASH = 1;
const REMOVE_DASH = 2;
const GET = 1;
const NOT_GET = 0;

export default {
  middleware: 'guest',
  data: () => ({
    message: '',
    dataInit: {
      city: [],
      listGenre: [],
      countLineGenre: 0,
      indexLineGenre: DEFAULT_GENRE_INLINE - 1,
      clientId: '',
    },
    statusInputName: ENTER_SPACE,
    statusInputPhoneNumber: ENTER_DASH,
    model: {
      birthday: '',
      slbCity: '',
      postCode1: '',
      postCode2: '',
      postCode: '',
      district: '',
      address: '',
      mail: '',
      confirmedMail: '',
      fullName: '',
      furigana: '',
      phoneNumber: '',
      cellPhone: '',
      buildingRoom: '',
      year: '',
      month: '',
      day: '',
      gender: 'male',
      password: '',
      confirmedPassword: '',
      memberCode: '',
      genre: [],
      directMail: GET,
      magazineMail: GET,
      flagShowGenre: false,
      flagShowMemberCode: 0,
      flagShowMagazineMail: 0,
      flagShowDirectMail: 0,
      listGenre: [],
      inquiryNm: '',
      inquiryTelNo: '',
      inquiryUrl: '',
      inquiryNote: '',
    },
    flagValidate: false,
    flagRequiredWith: true,
    errorsMsg: []
  }),
  beforeRouteEnter(to, from, next) {
    // Reload or go from other page != page 130
    if (from.name !== constant.router.REGISTER_CONFIRM) {
      localStorage.removeItem('check_error');
    } else {
      // Check show message error when back from page 130 to page 120
      localStorage.setItem('check_error', true);
    }

    next();
  },
  created() {
    if (!!localStorage.getItem('is_checked_both') === false) {
      // Redirect to page 110 terms register
      let path = this.$router.resolve({
        name: constant.router.TERMS,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    }

    this.initPage();

    // Reset model if state is set data
    if (!!this.register.model) {
      this.model = this.register.model;
    }

    // If register fail in page 130 then show error in page 120
    if (!!localStorage.getItem('check_error')) {
      this.errorsMsg = this.auth.error;
    }
  },
  computed: {
    ...mapState({
      register: state => state.register,
      auth: state => state.auth
    })
  },
  methods: {
    /**
     * Function init page get list city
     *
     * @returns {Array}
     */
    initPage: function() {
      this.dataInit.clientId = this.$route.params.client_id;

      get(constant.api.INIT_PAGE_REGISTER, { clientId: this.$route.params.client_id })
        .then(result => {
          this.dataInit.city = result.data.data.listCity;

          if (result.data.data.genre.length) {
            this.model.flagShowGenre = true;

            this.dataInit.countLineGenre = Math.round(parseFloat(result.data.data.genre.length / DEFAULT_GENRE_INLINE));

            let data = result.data.data.genre;
            let from = 0;
            let to = DEFAULT_GENRE_INLINE - 1;
            let arrGenre = [];
            let obj = [];

            // Loop every genre and add to array
            data.forEach((element, index) => {
              // If in the line is not full genre then add genre to sub array
              if (from <= index && index < to) {
                obj.push(element);
              } else if (index == to && index < data.length - 1) {
                // If in the line is full genre then add sub array to array

                // Reset from, to
                from = to + 1;
                to = to + DEFAULT_GENRE_INLINE;

                // Push element to sub array
                obj.push(element);

                // Push sub array to array
                arrGenre.push(obj);

                // Reset sub array
                obj = [];
              }

              // Push sub array to array if element is end of genre
              if (index == data.length - 1) {
                arrGenre.push(obj);
              }
            });

            this.dataInit.listGenre = arrGenre;
            this.model.listGenre = arrGenre;
          }

          let hanlderResult = result.data.data.flgHandler;

          if (hanlderResult.length) {
            this.model.flagShowMagazineMail = hanlderResult[0].mail_send_disp_kb == 1;
            this.model.flagShowDirectMail = hanlderResult[0].post_send_disp_kb == 1;
            this.model.flagShowMemberCode = hanlderResult[0].member_id_input_disp_kb == 1;
            this.statusInputName = hanlderResult[0].member_nm_kb;
            this.statusInputPhoneNumber = hanlderResult[0].tel_no_kb;

            let contactInf = {
              inquiryNm: hanlderResult[0].inquiry_nm,
              inquiryTelNo: hanlderResult[0].inquiry_tel_no,
              inquiryUrl: hanlderResult[0].inquiry_url,
              inquiryNote: hanlderResult[0].inquiry_notes,
            }

            window.localStorage.setItem('contact_inf', JSON.stringify(contactInf));
          }

          this.renderMsgErr();
        })
        .catch(err => {
          this.$store.dispatch('auth/setError', [
            this.$t('message.msg003_exception.line_1'),
            this.$t('message.msg003_exception.line_2'),
            this.$t('message.msg003_exception.line_3')
          ]);

          // Redirect to page error 570 later
          let path = this.$router.resolve({
            name: constant.router.ERROR_NAME,
            params: { client_id: this.$route.params.client_id }
          });

          this.$router.push(path.href);
        });
    },

    /**
     * Function search post code get address
     *
     * @param {string} code_1
     * @param {string} code_2
     * @returns {Array|null}
     */
    searchPostCode: function(code_1, code_2) {
      get(constant.api.SEARCH_POST_CODE, { post_code_1: code_1, post_code_2: code_2 })
        .then(res => {
          let result = res.data.data;

          // Api response have result
          if (result.errors === undefined && result.listAddress.length) {
            let city = this.dataInit.city.find(element => element.code_nm === result.listAddress[0].todofuken_nm);

            this.model.slbCity = city.code_nm;
            this.model.district = result.listAddress[0].shikuchoson_nm;
            this.model.address = result.listAddress[0].choiki_nm;
          } else {
            // Api response empty result
            this.model.slbCity = 0;
            this.model.district = '';
          }
        })
        .catch(err => {
          this.model.slbCity = 0;
          this.model.district = '';
        });
    },

    /**
     * Function handler and do to next page
     *
     * @returns {void}
     */
    goToNextPage: function() {
      this.$validator.validate().then(result => {
        // validator check required with when validator all input
        this.validatorRequiredWith();
        this.$store.dispatch('auth/setError', []);
        this.errorsMsg = [];

        if (!result) {
          this.flagValidate = true;
          window.scrollTo(0, 0);

          return;
        }

        let path = this.$router.resolve({
          name: constant.router.REGISTER_CONFIRM,
          params: { client_id: this.$route.params.client_id }
        });

        this.$store.dispatch('register/setModel', this.model);
        this.$store.dispatch('register/updateStepOne', true);

        this.$router.push(path.href);
      });
    },

    /**
     * Function overider message validator
     *
     * @returns {void}
     */
    renderMsgErr: function() {
      const dict = {
        custom: {
          mail: {
            required: this.$t('validation.required', { field: this.$t('register.lb_mail') }),
            email: this.$t('validation.email', { field: this.$t('register.lb_mail') }),
            confirmed: this.$t('validation.confirmed', { field: this.$t('register.lb_mail') }),
            existsMail: this.$t('validation.unique', { field: this.$t('register.lb_mail') }),
          },
          confirm_mail: {
            required: this.$t('validation.required', { field: this.$t('register.lb_confirm_mail') }),
            email: this.$t('validation.email', { field: this.$t('register.lb_confirm_mail') }),
          },
          full_name: {
            spaceFullSize: this.statusInputName == ENTER_SPACE
              ? this.$t('message.msg010_enter_space_full_size')
              : this.$t('message.msg011_remove_space_full_size'),
            fullsize: this.$t('message.msg012_input_full_size'),
          },
          furigana: {
            spaceFullSize: this.statusInputName == ENTER_SPACE
              ? this.$t('message.msg010_enter_space_full_size')
              : this.$t('message.msg011_remove_space_full_size'),
            fullsize: this.$t('message.msg012_input_full_size'),
          },
          phone_number: {
            phoneNumber: this.statusInputPhoneNumber == ENTER_DASH
              ? this.$t('message.msg013_enter_dash')
              : (this.statusInputPhoneNumber == REMOVE_DASH
                ? this.$t('message.msg014_remote_dash')
                : this.$t('validation.format', { field: this.$t('register.lb_phone_number') })
              )
          },
          cell_phone: {
            phoneNumber: this.statusInputPhoneNumber == ENTER_DASH
              ? this.$t('message.msg013_enter_dash')
              : (this.statusInputPhoneNumber == REMOVE_DASH
                ? this.$t('message.msg014_remote_dash')
                : this.$t('validation.format', { field: this.$t('register.lb_cell_phone') })
              )
          },
          district: {
            fullsize: this.$t('validation.fullsize', { field: this.$t('register.lb_district') }),
          },
          address: {
            fullsize: this.$t('validation.fullsize', { field: this.$t('register.lb_detail_address') }),
          },
          building_room: {
            fullsize: this.$t('validation.fullsize', { field: this.$t('register.lb_building_room') }),
          },
          password: {
            passwordRegex: this.$t('validation.passwordRegex', { field: this.$t('register.lb_password') }),
          },
          member_code: {
            textNumberHaftSize: this.$t('validation.textNumberHaftSize', { field: this.$t('register.lb_member_code') }),
            existsMemberCode: this.$t('message.msg065_not_exists_member_code'),
          }
        }
      }

      this.$validator.localize('ja', dict);
    },

    /**
     * Function check required with
     *
     * @returns {boolean}
     */
    validatorRequiredWith: function() {
      let phoneNumber = this.model.phoneNumber;
      let cellPhone = this.model.cellPhone;

      this.flagRequiredWith = phoneNumber != '' || cellPhone != '';

      return this.flagRequiredWith;
    },

    /**
     * Function change postcode if onchange in post code 1 and post code 2
     *
     * @returns {void}
     */
    watchPostCode: function() {
      this.model.postCode = this.model.postCode1 + this.model.postCode2;
    },

    /**
     * Function change birthday if onchange in year, mon, day
     *
     * @returns {void}
     */
    watchBirthday: function() {
      this.model.birthday = this.model.year + '-' + this.model.month + '-' + this.model.day;
    },

    /**
     * Function go to page 310 show top
     *
     * @returns {void}
     */
    goToTop: function() {
      let path = this.$router.resolve({
        name: constant.router.SHOW_TOP,
        params: { client_id: this.$route.params.client_id }
      });

      this.$store.dispatch('register/removeModel');
      this.$store.dispatch('register/updateStepOne', false);

      this.$router.push(path.href);
    }
  }
}
