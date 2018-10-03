<template lang="html">
  <div id="MainC" class="register-step-1">
    <main id="ContentsPane">
      <div class="container">
        {{ $t('message.msg009_explain_input_inf.msg_1_head.dot') }}
        <span class="head-msg-fullsize require" v-html="$t('common.require_1')"></span>
        {{ $t('message.msg009_explain_input_inf.msg_1') }}
        <br />
        {{ $t('message.msg009_explain_input_inf.msg_2') }}
      </div>

      <div class="container" v-if="flagValidate">
        <div class="error" :style="flagValidate ? 'display: block;' : ''">
          <div class="alert alert-danger" v-if="flagValidate">
            <span>{{ errors.first('mail') }}</span><br />
            <span>{{ errors.first('confirmed_mail') }}</span>
          </div>
        </div>
      </div>

      <div class="container" id="RegForm">
        <table>
          <tbody>
            <tr>
              <th scope="row">
                <label>{{ $t('register.mail') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="email" data-vv-delay="100" v-validate="'required|email|confirmed:confirmed_mail'" name="mail" />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label>{{ $t('register.confirm_mail') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="email" name="confirmed_mail" ref="confirmed_mail" v-validate="'required|email'" :data-vv-as="$t('register.confirm_mail')" />
              </td>
            </tr>

            <tr>
              <th scope="row">
                <label>{{ $t('register.full_name') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="text" v-model="model.fullName" name="full_name"
                  v-validate="statusInputName == 2 ? 'spaceFullSize:model.fullName' : 'spaceFullSize:222'"/>
                <label>{{ errors.first('full_name') }}</label>
                <label class="extension">{{ $t('register.extension') }}</label>
                <label class="extension" v-if="statusInputName == 1">{{ $t('register.enter_space') }}</label>
                <label class="extension" v-if="statusInputName == 2">{{ $t('register.remove_space') }}</label>
              </td>

            </tr>
            <tr>
              <th>
                <label>{{ $t('register.furigana') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="text" />
                <label class="extension">{{ $t('register.extension') }}</label>
                <label class="extension" v-if="statusInputName == 1">{{ $t('register.enter_space') }}</label>
                <label class="extension" v-if="statusInputName == 2">{{ $t('register.remove_space') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.phone_number') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </th>
              <td>
                <input type="text" />
                <label class="extension" v-if="statusInputPhoneNumber == 1">{{ $t('register.enter_dash') }}</label>
                <label class="extension" v-if="statusInputPhoneNumber == 2">{{ $t('register.remove_dash') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.cell_phone') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </th>
              <td>
                <input type="text" />
                <label class="extension" v-if="statusInputPhoneNumber == 1">{{ $t('register.enter_dash') }}</label>
                <label class="extension" v-if="statusInputPhoneNumber == 2">{{ $t('register.remove_dash') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.zipcode') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td class="flex-block">
                <input type="text" v-model="model.post_code_1"/>
                <span class="between">-</span>
                <input type="text" v-model="model.post_code_2" />
                <button class="rs-btn btn-green-dark btn-auto" @click.prevent="searchPostCode(model.post_code_1, model.post_code_2)">
                  {{ $t('register.btn_search_zipcode') }}
                </button>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.city') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <select v-model="model.slbCity">
                  <option value="0">{{ $t('register.not_select') }}</option>
                  <option v-for="item in dataInit.city" :value="item.code_no" >{{ item.code_nm }}</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.district') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="text" v-model="model.district" />
                <label class="extension">{{ $t('common.enter_full_size') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.detail_address') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="text" v-model="model.address"/>
                <label class="extension">{{ $t('common.enter_full_size') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.building_room') }}</label>
              </th>
              <td>
                <input type="text"/>
                <label class="extension">{{ $t('register.enter_if_have_address') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.birthday') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td class="flex-block">
                <label class="between">{{ $t('register.calendar') }}</label>
                <input type="text"/>
                <label class="between">{{ $t('register.year') }}</label>
                <input type="text"/>
                <label class="between">{{ $t('register.month') }}</label>
                <input type="text"/>
                <label class="between">{{ $t('register.day') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.gender') }}</label>
              </th>
              <td class="flex-block">
                <span class="between">{{ $t('register.male') }}
                </span>
                <input type="radio" name="gender" value="male" checked />
                <span class="between">{{ $t('register.female') }}
                </span>
                <input type="radio" name="gender" value="female">
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.password') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="password"/>
                <label>{{ $t('register.extension_password.msg_1') }}</label><br />
                <label>{{ $t('register.extension_password.msg_2') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.confirm_password') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="password"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container">
        <label v-if="flagShowMemberCode">{{ $t('register.lbl_explant_code_member') }}</label>
        <div class="block" v-if="flagShowMemberCode">
          <div class="message">
            <label>{{ $t('register.lbl_.line_1') }}</label><br />
            <label>{{ $t('register.lbl_.line_2') }}</label><br />
            <label>{{ $t('register.lbl_.line_3') }}</label>
          </div>
          <div class="area-input">
            <label>{{ $t('register.member_code') }}</label>
            <input type="text" />
          </div>
        </div>

        <div class="block-input" v-if="flagShowMagazineMail">
          <div class="inline">
            <div class="label-inf">
              <label>{{ $t('register.magazine_mail') }}</label>
            </div>
            <div class="content content-flex">
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.get') }}</label>
                <input type="radio" name="magazine-mail" checked/>
              </div>
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.not_get') }}</label>
                <input type="radio" name="magazine-mail" />
              </div>
            </div>
          </div>
          <div class="inline" v-if="flagShowDirectMail">
            <div class="label-inf">
              <label>{{ $t('register.direct_mail') }}</label>
            </div>
            <div class="content content-flex">
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.get') }}</label>
                <input type="radio" name="direct-mail" checked />
              </div>
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.not_get') }}</label>
                <input type="radio" name="direct-mail" />
              </div>
            </div>
          </div>
          <div class="inline" v-if="flagShowGenre">
            <div class="label-inf">
              <label>{{ $t('register.favorite_genres') }}</label>
            </div>
            <div class="content">
              <div class="inline" v-for="line in dataInit.countLineGenre">
                <div class="inline" v-for="genre in dataInit.listGenre[line - 1]">
                  <input type="checkbox" name="vehicle1" :value="genre.genre_no">
                  <label class="label-checkbox">{{ genre.genre_nm }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="block-action">
            <button class="rs-btn btn-large btn-green-dark block-left">
              {{ $t('register.btn_stop_register') }}
            </button>
            <button class="rs-btn btn-large btn-green-dark block-right" @click.prevent="goToNextPage()">
              {{ $t('common.btn_next') }}
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import constant from '@/constant';
import { get } from '@/plugins/api';

const DEFAULT_GENRE_INLINE = 4;
const ENTER_SPACE = 1;
const REMOVE_SPACE = 2;
const ENTER_DASH = 1;
const REMOVE_DASH = 2;

export default {
  middleware: 'guest',
  data: () => ({
    message: '',
    dataInit: {
      city: [],
      listGenre: [],
      countLineGenre: 0,
      indexLineGenre: DEFAULT_GENRE_INLINE - 1,
    },
    flagShowGener: false,
    flagShowMemberCode: 0,
    flagShowMagazineMail: 0,
    flagShowDirectMail: 0,
    statusInputName: ENTER_SPACE,
    statusInputPhoneNumber: ENTER_DASH,
    model: {
      slbCity: 0,
      post_code_1: '',
      post_code_2: '',
      district: '',
      address: '',
      fullName: ''
    },
    flagValidate: false
  }),
  created() {
    if (!!localStorage.getItem('is_checked_both') === false) {
      // Redirect to page 110 terms register
      let path = this.$router.resolve({
        name: 'terms',
      });

      this.$router.push(path.href);
    }

    this.renderMsgErr();
    this.initPage();
  },
  methods: {
    /**
     * Function init page get list city
     *
     * @returns {Array}
     */
    initPage: function () {
      get(constant.api.GET_LIST_CITY, { clientId: this.$route.params.client_id })
        .then(result => {
          this.dataInit.city = result.data.data.listCity;

          if (result.data.data.genre.length) {
            this.flagShowGenre = true;

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
          }

          let hanlderResult = result.data.data.flgHandler;

          if (hanlderResult.length) {
            this.flagShowMagazineMail = hanlderResult[0].mail_send_disp_kb == 1;
            this.flagShowDirectMail = hanlderResult[0].post_send_disp_kb == 1;
            this.flagShowMemberCode = hanlderResult[0].member_id_input_disp_kb == 1;
            this.statusInputName = hanlderResult[0].member_nm_kb;
            this.statusInputName = hanlderResult[0].member_nm_kb;
            this.statusInputPhoneNumber = hanlderResult[0].tel_no_kb;
          }
        })
        .catch(err => {
          // Will be redirect to page error 570 later
        });
    },

    /**
     * Function search post code get address
     *
     * @param {string} code_1
     * @param {string} code_2
     * @returns {Array|null}
     */
    searchPostCode: function (code_1, code_2) {
      get(constant.api.SEARCH_POST_CODE, { post_code_1: code_1, post_code_2: code_2 })
        .then(res => {
          let result = res.data.data;

          // Api response have result
          if (result.errors === undefined && result.listAddress.length) {
            let city = this.dataInit.city.find(element => element.code_nm === result.listAddress[0].todofuken_nm);

            this.model.slbCity = city.code_no;
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
    goToNextPage: function () {
      this.$validator.validate().then(result => {
        if (!result) {
          this.flagValidate = true;
        }
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
          mail: {
            required: this.$t('validation.required', { field: this.$t('register.mail') }),
            email: this.$t('validation.email', { field: this.$t('register.mail') }),
            confirmed: this.$t('validation.confirmed', { field: this.$t('register.mail') }),
          },
          confirmed_mail: {
            required: this.$t('validation.required', { field: this.$t('register.confirm_mail') }),
            email: this.$t('validation.email', { field: this.$t('register.confirm_mail') }),
          },
          full_name: {
            spaceFullSize: 'TRIHNM'
          }
        }
      }

      this.$validator.localize('ja', dict);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/scss/register";
</style>
