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

      <div class="container">
        <div class="error" :style="validation ? 'display: block;' : ''">
          <div class="alert alert-danger" v-if="validation">
            {{ errors.first('email') }}
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
                <input type="email" v-validate="'required|email'" name="email" />
              </td>
            </tr>

            <tr>
              <th scope="row">
                <label>{{ $t('register.confirm_mail') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="email" />
              </td>
            </tr>

            <tr>
              <th scope="row">
                <label>{{ $t('register.full_name') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="text"/>
                <label class="extension">{{ $t('register.extension') }}</label>
              </td>

            </tr>
            <tr>
              <th>
                <label>{{ $t('register.furigana') }}<span class="require">{{ $t('common.require') }}</span></label>
              </th>
              <td>
                <input type="text" />
                <label class="extension">{{ $t('register.extension') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.phone_number') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </th>
              <td>
                <input type="text" />
                <label class="extension" style="display: none">{{ $t('register.extension') }}</label>
              </td>
            </tr>

            <tr>
              <th>
                <label>{{ $t('register.cell_phone') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </th>
              <td>
                <input type="text" />
                <label class="extension" style="display: none">{{ $t('register.extension') }}</label>
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
          <div class="inline" v-if="flagShowGener">
            <div class="label-inf">
              <label>{{ $t('register.favorite_genres') }}</label>
            </div>
            <div class="content">
              <div class="inline">
                <input type="checkbox" name="vehicle1" value="Bike">
                <label class="label-checkbox">{{ $t('register.classic') }}</label>
                <input type="checkbox" name="vehicle2" value="Car">
                <label class="label-checkbox">{{ $t('register.jazz') }}</label>
                <input type="checkbox" name="vehicle3" value="Boat">
                <label class="label-checkbox">{{ $t('register.pop') }}</label>
                <input type="checkbox" name="vehicle1" value="Bike">
                <label class="label-checkbox">{{ $t('register.ballad') }}</label>
              </div>
              <div class="inline">
                <input type="checkbox" name="vehicle2" value="Car">
                <label class="label-checkbox">{{ $t('register.musical') }}</label>
                <input type="checkbox" name="vehicle3" value="Boat">
                <label class="label-checkbox">{{ $t('register.kabuki') }}</label>
                <input type="checkbox" name="vehicle3" value="Boat">
                <label class="label-checkbox">{{ $t('register.dramatic') }}</label>
                <input type="checkbox" name="vehicle3" value="Boat">
                <label class="label-checkbox">{{ $t('register.dance') }}</label>
              </div>
            </div>
          </div>
          <div class="block-action">
            <button class="rs-btn btn-large btn-green-dark block-left" @click.prevent="openModal()"
              data-toggle="modal" data-target="#exampleModal">
              {{ $t('register.btn_stop_register') }}
            </button>
            <button class="rs-btn btn-large btn-green-dark block-right">
              {{ $t('common.btn_next') }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '@/constant';
import { get } from '@/plugins/api';

export default {
  data: () => ({
    validation: true,
    message: '',
    dataInit: {
      city: [],
      gener: [],
    },
    flagShowGener: true,
    flagShowMemberCode: 1,
    flagShowMagazineMail: 1,
    flagShowDirectMail: 1,
    statusInputName: 1,
    statusInputPhoneNumber: 1,
    model: {
      slbCity: 0,
      post_code_1: '',
      post_code_2: '',
      district: '',
      address: ''
    }
  }),
  created() {
    if (!!localStorage.getItem('is_checked_both') === false) {
      // Redirect to page 110 terms register
      let path = this.$router.resolve({
        name: 'terms',
      });

      this.$router.push(path.href);
    }

    this.initPage();
  },
  methods: {
    /**
     * Function init page get list city
     *
     * @returns {Array}
     */
    initPage: function () {
      get(constant.api.GET_LIST_CITY)
        .then(result => {
          this.dataInit.city = result.data.data.listCity;

          if (result.data.data.gener.length) {
            this.flagShowGener = true;
          }

          let hanlderResult = result.data.data.flgHandler;

          if (hanlderResult.length) {
            this.flagShowMagazineMail = hanlderResult[0].mail_send_disp_kb == 1;
            this.flagShowDirectMail = hanlderResult[0].post_send_disp_kb == 1;
            this.flagShowMemberCode = hanlderResult[0].member_id_input_disp_kb == 1;
          }
        })
        .catch(err => {
          // Will be redirect to page error 570 later
        });
    },

    /**
     * Function search post code get address
     *
     * @param
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

    openModal: function () {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/scss/register";
</style>
