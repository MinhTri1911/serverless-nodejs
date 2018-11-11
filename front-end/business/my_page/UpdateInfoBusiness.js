/**
 * File UpdateInfoBusiness.js
 * Handle business when update infomation
 *
 * @author Rikkei.TriHNM
 * @date 2018-11-06
 */

import { mapState } from 'vuex';
import constant from '@/constant';
import { get } from '@/plugins/api';

const DEFAULT_GENRE_INLINE = 4;
const MALE = 0;
const GET = 1;
const NOT_GET = 0;
const ENTER_SPACE = 1;
const REMOVE_SPACE = 2;
const ENTER_DASH = 1;
const REMOVE_DASH = 2;

export default {
  middleware: ['authenticated', 'valid_client_id'],
  head() {
    return {
      title: this.$t('updateInfomation.lb_title_update_infomation')
    }
  },
  data: () => ({
    errorsMsg: [],
    flagRequiredWith: true,
    flagValidate: false,
    statusInputPhoneNumber: 0,
    statusInputName: 0,
    now: new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ''),
    dataInit: {
      clientId: '',
      city: [],
      listGenre: [],
      countLineGenre: 0
    },
    model: {
      loginId: '',
      mail: '',
      confirmedMail: '',
      fullName: '',
      furigana: '',
      phoneNumber: '',
      cellPhone: '',
      postCode: '',
      postCode1: '',
      postCode2: '',
      slbCity: [],
      district: '',
      address: '',
      buildingRoom: '',
      birthday: '',
      year: '',
      month: '',
      day: '',
      gender: '',
      password: '',
      confirmedPassword: '',
      memberCode: '',
      flagShowMemberCode: 0,
      flagShowMagazineMail: 0,
      flagShowDirectMail: 0,
      magazineMail: '',
      directMail: '',
      flagShowGenre: false,
      listGenre: [],
      memberCodeInput: ''
    },
    clientId: '',
    routerToMyPage: constant.router.MY_PAGE,
  }),
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    })
  },
  created() {
    this.setModel();
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      client: state => state.client
    })
  },
  methods: {
    /**
     * Function set model when load page
     *
     * @return {void}
     */
    setModel: function () {
      this.renderMsgErr();

      let clientInf = this.client.clientInfo;
      this.clientId = clientInf.client_id;

      this.statusInputName = clientInf.member_nm_kb;
      this.statusInputPhoneNumber = clientInf.tel_no_kb;
      this.model.flagShowMemberCode = clientInf.member_id_input_disp_kb;
      this.model.flagShowMagazineMail = clientInf.mail_send_disp_kb;
      this.model.flagShowDirectMail = clientInf.post_send_disp_kb;

      let userInf = this.auth.user;
      this.model.loginId = userInf.login_id;
      this.model.mail = userInf.mail_address;
      this.model.confirmedMail = userInf.mail_address;
      this.model.fullName = userInf.member_nm;
      this.model.furigana = userInf.member_kn;
      this.model.phoneNumber = userInf.tel_no;
      this.model.cellPhone = userInf.mobile_no;
      this.model.postCode = userInf.post_no;
      this.splitPostCode(userInf.post_no);
      this.initPage();
      this.model.slbCity = userInf.prefecture;
      this.model.district = userInf.municipality;
      this.model.address = userInf.address1;
      this.model.buildingRoom = userInf.address2;
      this.splitBirthday(userInf.birthday);
      this.model.gender = userInf.sex_type == constant.config.MALE ? 'male': 'female';
      this.model.memberCode = userInf.member_id;
      this.model.magazineMail = userInf.mail_send_flg;
      this.model.directMail = userInf.post_send_flg;
    },

    /**
     * Function init page update infomation
     *
     * @return {void}
     */
    initPage: function () {
      get(constant.api.INIT_UPDATE_PROFILE, { client_id: this.clientId, member_id: this.auth.user.member_id })
        .then(res => {
          this.dataInit.city = res.data.data.list_city;

          if (res.data.data.list_gener.length) {
            this.model.flagShowGenre = true;

            let data = res.data.data.list_gener;
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
            this.dataInit.countLineGenre = this.dataInit.listGenre.length;

            res.data.data.list_gener_member.forEach(el => {
              this.model.listGenre.push(el.genre_no);
            });
          }
        }).catch(err => {
          console.log(err);
          // Redirect to page 570
          // this.$store.dispatch('auth/setError', [
          //   this.$t('message.msg003_exception.line_1'),
          //   this.$t('message.msg003_exception.line_2'),
          //   this.$t('message.msg003_exception.line_3')
          // ]);

          // let path = this.$router.resolve({
          //   name: constant.router.ERROR_NAME,
          //   params: { client_id: this.$route.params.client_id }
          // });

          // this.$router.push(path.href);
        });
    },

    /**
     * Function split post code
     *
     * @return {void}
     */
    splitPostCode: function (postCode) {
      this.model.postCode1 = postCode.substring(0, 3);
      this.model.postCode2 = postCode.substring(3, postCode.length);
    },

    /**
     * Function split birthday
     *
     * @return {void}
     */
    splitBirthday: function (birthday) {
      this.model.year = birthday.substring(0, 4);
      this.model.month = birthday.substring(5, 7);
      this.model.day = birthday.substring(6, birthday.length);

      this.model.birthday = this.model.year + '-' + this.model.month + '-' + this.model.day;
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
          if (result.errors === undefined && result.list_address.length) {
            let city = this.dataInit.city.find(element => element.code_nm === result.list_address[0].todofuken_nm);

            this.model.slbCity = city.code_nm;
            this.model.district = result.list_address[0].shikuchoson_nm;
            this.model.address = result.list_address[0].choiki_nm;
          } else {
            // Api response empty result
            this.model.slbCity = '';
            this.model.district = '';
            this.model.address = '';
          }
        })
        .catch(err => {
          this.model.slbCity = '';
          this.model.district = '';
          this.model.address = '';
        });
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
     * Function check validation require with
     *
     * @return {boolean}
     */
    checkRequireWith: function () {
      if (this.model.phoneNumber == '' && this.model.cellPhone == '') {
        this.flagRequiredWith = false;

        return this.flagRequiredWith;
      }
    },

    /**
     * Function go to next page
     *
     * @return {void}
     */
    goToNext: function () {
      this.$validator.validate().then(result => {
        // validator check required with when validator all input
        // this.validatorRequiredWith();
        this.$store.dispatch('auth/setError', []);
        this.errorsMsg = [];

        this.checkRequireWith();

        if (!result) {
          this.flagValidate = true;
          window.scrollTo(0, 0);

          return;
        }

        // Reset validator is false to hidden error
        this.flagValidate = false;

        // let path = this.$router.resolve({
        //   name: constant.router.REGISTER_CONFIRM,
        //   params: { client_id: this.$route.params.client_id }
        // });

        // this.$store.dispatch('register/setModel', this.model);
        // this.$store.dispatch('register/updateStepOne', true);

        // if (this.model.memberCode == '') {
        //   localStorage.removeItem('member_inf');
        // }

        // this.$router.push(path.href);
      });
    },

    /**
     * Function overider message validator
     *
     * @returns {void}
     */
    renderMsgErr: function () {
      const dict = {
        custom: {
          login_id: {
            existsLoginId: this.$t('validation.unique', { field: this.$t('updateInfomation.lb_login_id') }),
            textNumberHaftSize: this.$t('validation.textNumberHaftSize', { field: this.$t('updateInfomation.lb_login_id') })
          },
          mail: {
            required: this.$t('validation.required', { field: this.$t('updateInfomation.lb_mail') }),
            email: this.$t('validation.email', { field: this.$t('updateInfomation.lb_mail') }),
            confirmed: this.$t('validation.confirmed', { field: this.$t('updateInfomation.lb_mail') }),
            existsMailUpdate: this.$t('validation.unique', { field: this.$t('updateInfomation.lb_mail') }),
          },
          confirm_mail: {
            required: this.$t('validation.required', { field: this.$t('updateInfomation.lb_confirm_mail') }),
            email: this.$t('validation.email', { field: this.$t('updateInfomation.lb_confirm_mail') }),
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
                : this.$t('validation.format', { field: this.$t('updateInfomation.lb_phone_number') })
              )
          },
          cell_phone: {
            phoneNumber: this.statusInputPhoneNumber == ENTER_DASH
              ? this.$t('message.msg013_enter_dash')
              : (this.statusInputPhoneNumber == REMOVE_DASH
                ? this.$t('message.msg014_remote_dash')
                : this.$t('validation.format', { field: this.$t('updateInfomation.lb_cell_phone') })
              )
          },
          post_code: {
            length: this.$t('validation.length', { field: this.$t('updateInfomation.lb_zipcode'), number: 7 }),
          },
          post_code_1: {
            length: this.$t('validation.length', { field: this.$t('updateInfomation.lb_zipcode_3'), number: 3 }),
          },
          post_code_2: {
            length: this.$t('validation.length', { field: this.$t('updateInfomation.lb_zipcode_4'), number: 4 }),
          },
          district: {
            fullsize: this.$t('validation.fullsize', { field: this.$t('updateInfomation.lb_district') }),
          },
          address: {
            fullsize: this.$t('validation.fullsize', { field: this.$t('updateInfomation.lb_detail_address') }),
          },
          building_room: {
            fullsize: this.$t('validation.fullsize', { field: this.$t('updateInfomation.lb_building_room') }),
          },
          password: {
            passwordRegex: this.$t('validation.passwordRegex', { field: this.$t('updateInfomation.lb_password') }),
          },
          member_code: {
            textNumberHaftSize: this.$t('validation.textNumberHaftSize', { field: this.$t('updateInfomation.lb_member_code') }),
            existsMemberCode: this.$t('message.msg065_not_exists_member_code'),
          }
        }
      }

      this.$validator.localize('ja', dict);
    },

    /**
     * Funtion show popup confirm stop change infomation
     *
     * @return {void}
     */
    showPopUp: function () {
      $('#confirm-stop-update-infomation').modal('show');
    },

    /**
     * Function redirect to top my page
     *
     * @return {void}
     */
    goToMyPage: function () {
      let path = this.$router.resolve({
        name: this.routerToMyPage,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    }
  }
}
