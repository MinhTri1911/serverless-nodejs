<template lang="html">
  <div id="MainC" class="register-step-1">
    <main id="ContentsPane">
      <div class="container">
        <div class="block">
          {{ $t('message.msg009_explain_input_inf.msg_1_head.dot') }}
          <span class="head-msg-fullsize require" v-html="$t('common.require_1')"></span>
          {{ $t('message.msg009_explain_input_inf.msg_1') }}
          <br />
          {{ $t('message.msg009_explain_input_inf.msg_2') }}
        </div>
      </div>

      <div class="container" v-if="flagValidate || !flagRequiredWith">
        <div class="error" :style="flagValidate || !flagRequiredWith ? 'display: block;' : ''">
          <div class="alert alert-danger" v-if="flagValidate || !flagRequiredWith">
            <label>{{ errors.first('mail') }}</label>
            <label>{{ errors.first('confirmed_mail') }}</label>
            <label>{{ errors.first('full_name') }}</label>
            <label>{{ errors.first('furigana') }}</label>
            <label v-if="flagRequiredWith">
              <label>{{ errors.first('phone_number') }}</label>
              <label>{{ errors.first('cell_phone') }}</label>
            </label>
            <label v-if="!flagRequiredWith">
              {{ $t('validation.required_with', {
                  field_1: $t('register.lb_phone_number'),
                  field_2: $t('register.lb_cell_phone')
                })
              }}
            </label>
            <label>{{ errors.first('post_code') }}</label>
            <label>{{ errors.first('city') }}</label>
            <label>{{ errors.first('district') }}</label>
            <label>{{ errors.first('address') }}</label>
            <label>{{ errors.first('building_room') }}</label>
            <label>{{ errors.first('birthday') }}</label>
            <label>{{ errors.first('password') }}</label>
            <label>{{ errors.first('confirmed_password') }}</label>
            <label>{{ errors.first('member_code') }}</label>
          </div>
        </div>
      </div>

      <div class="container" id="RegForm">
        <table>
          <tbody>
            <tr>
              <td class="td-head" scope="row">
                <label>{{ $t('register.lb_mail') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="email"
                  v-validate="'required|max:200|email|confirmed:confirmed_mail|existsMail:' + dataInit.clientId"
                  name="mail" v-model="model.mail"
                  :data-vv-as="$t('register.lb_mail')"/>
              </td>
            </tr>
            <tr>
              <td class="td-head" scope="row">
                <label>{{ $t('register.lb_confirm_mail') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="email" name="confirmed_mail" ref="confirmed_mail"
                  v-validate="'required|max:200|email'"
                  :data-vv-as="$t('register.lb_confirm_mail')"
                  v-model="model.confirmedMail"/>
              </td>
            </tr>

            <tr>
              <td class="td-head" scope="row">
                <label>{{ $t('register.lb_full_name') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" name="full_name"
                  v-validate="'required|max:200|' + (
                    statusInputName == 1 ? 'spaceFullSize:1' : (statusInputName == 2 ? 'spaceFullSize:2' : 'fullsize')
                  )" :data-vv-as="$t('register.lb_full_name')"
                  v-model="model.fullName"/>
                <label class="extension">{{ $t('register.lb_extension') }}</label>
                <label class="extension" v-if="statusInputName == 1">{{ $t('register.lb_enter_space') }}</label>
                <label class="extension" v-if="statusInputName == 2">{{ $t('register.lb_remove_space') }}</label>
              </td>

            </tr>
            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_furigana') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" name="furigana"
                  v-validate="'required|max:200|' + (
                    statusInputName == 1 ? 'spaceFullSize:1' : (statusInputName == 2 ? 'spaceFullSize:2' : 'fullsize')
                  )" :data-vv-as="$t('register.lb_furigana')"
                  v-model="model.furigana"/>
                <label class="extension">{{ $t('register.lb_extension') }}</label>
                <label class="extension" v-if="statusInputName == 1">{{ $t('register.lb_enter_space') }}</label>
                <label class="extension" v-if="statusInputName == 2">{{ $t('register.lb_remove_space') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_phone_number') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.phoneNumber" ref="phone_number" name="phone_number"
                  v-validate="'phoneNumber:' + statusInputPhoneNumber" :data-vv-as="$t('register.lb_phone_number')"/>
                <label class="extension" v-if="statusInputPhoneNumber == 1">{{ $t('register.lb_enter_dash') }}</label>
                <label class="extension" v-if="statusInputPhoneNumber == 2">{{ $t('register.lb_remove_dash') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_cell_phone') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" ref="cell_phone" v-model="model.cellPhone" name="cell_phone"
                  v-validate="'phoneNumber:' + statusInputPhoneNumber"/>
                <label class="extension" v-if="statusInputPhoneNumber == 1">{{ $t('register.lb_enter_dash') }}</label>
                <label class="extension" v-if="statusInputPhoneNumber == 2">{{ $t('register.lb_remove_dash') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_zipcode') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content flex-block">
                <input type="hidden" v-model="model.postCode" name="post_code"
                  v-validate="'numeric|required|length:7'" :data-vv-as="$t('register.lb_zipcode')"/>
                <input type="text" v-model="model.postCode1" name="post_code_1"
                  @change="watchPostCode()"
                  v-validate="'length:3'"/>
                <span class="between">-</span>
                <input type="text" v-model="model.postCode2"
                  @change="watchPostCode()" name="post_code_2"
                  v-validate="'length:4'"/>
                <button class="rs-btn btn-green-dark btn-auto" @click.prevent="searchPostCode(model.postCode1, model.postCode2)">
                  {{ $t('register.btn_search_zipcode') }}
                </button>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_city') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <select v-model="model.slbCity" v-validate="'required'" name="city" :data-vv-as="$t('register.lb_city')">
                  <option value="">{{ $t('register.lb_not_select') }}</option>
                  <option v-for="item in dataInit.city" :value="item.code_no" >{{ item.code_nm }}</option>
                </select>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_district') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.district" name="district"
                  v-validate="'required|max:200|fullsize'"
                  :data-vv-as="$t('register.lb_district')"/>
                <label class="extension">{{ $t('common.enter_full_size') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_detail_address') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.address" name="address"
                  v-validate="'required|max:400|fullsize'"
                  :data-vv-as="$t('register.lb_detail_address')"/>
                <label class="extension">{{ $t('common.enter_full_size') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_building_room') }}</label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.buildingRoom" name="building_room"
                  v-validate="'max:400|fullsize'"
                  :data-vv-as="$t('register.lb_building_room')"/>
                <label class="extension">{{ $t('message.msg017_enter_building_room') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_birthday') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content flex-block">
                <input type="hidden"
                  v-model="model.birthday"
                  v-validate="'required|date_format:YYYY-MM-DD|after:1900-01-01'"
                  name="birthday"
                  :data-vv-as="$t('register.lb_birthday')"/>
                <label class="between">{{ $t('register.lb_calendar') }}</label>
                <input type="text"
                  v-model="model.year"
                  @change="watchBirthday()"
                  v-validate="'numeric|length:4'"
                  name="year"
                  :data-vv-as="$t('register.lb_year')"/>
                <label class="between">{{ $t('register.lb_year') }}</label>
                <input type="text"
                  v-model="model.month"
                  @change="watchBirthday()"
                  v-validate="'numeric|length:2'"
                  name="month"
                  :data-vv-as="$t('register.lb_month')"/>
                <label class="between">{{ $t('register.lb_month') }}</label>
                <input type="text"
                  v-model="model.day"
                  @change="watchBirthday()"
                  v-validate="'numeric|length:2'"
                  name="day"
                  :data-vv-as="$t('register.lb_day')"/>
                <label class="between">{{ $t('register.lb_day') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_gender') }}</label>
              </td>
              <td class="td-content flex-block gender">
                <span class="between">{{ $t('register.lb_male') }}
                </span>
                <input type="radio" v-model="model.gender" name="gender" value="male" checked />
                <span class="between">{{ $t('register.lb_female') }}
                </span>
                <input type="radio" v-model="model.gender" name="gender" value="female">
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_password') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="password"
                  v-model="model.password"
                  v-validate="'required|min:8|max:16|confirmed:confirmed_password|passwordRegex'"
                  name="password"
                  :data-vv-as="$t('register.lb_password')"/>
                <label>{{ $t('message.msg018_enter_password.msg_1') }}</label><br />
                <label>{{ $t('message.msg018_enter_password.msg_2') }}</label>
              </td>
            </tr>

            <tr>
              <td class="td-head">
                <label>{{ $t('register.lb_confirm_password') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="password"
                  name="confirmed_password"
                  ref="confirmed_password"
                  v-validate="'required|min:8|max:16'"
                  :data-vv-as="$t('register.lb_confirm_password')"
                  v-model="model.confirmedPassword"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container">
        <label v-if="model.flagShowMemberCode">{{ $t('register.lb_explant_code_member') }}</label>
        <div class="block" v-if="model.flagShowMemberCode">
          <div class="message">
            <label>{{ $t('register.lb_extension_member_code.line_1') }}</label><br />
            <label>{{ $t('register.lb_extension_member_code.line_2') }}</label><br />
            <label>{{ $t('register.lb_extension_member_code.line_3') }}</label>
          </div>
          <div class="area-input">
            <label>{{ $t('register.lb_member_code') }}</label>
            <input type="text"
              name="member_code"
              v-validate="'max:16|textNumberHaftSize|existsMemberCode:' +
                `${dataInit.clientId},${model.fullName},${model.furigana},${model.cellPhone},${model.phoneNumber}`"
              v-model="model.memberCode"
              :data-vv-as="$t('register.lb_member_code')"
              />
          </div>
        </div>

        <div class="block-input">
          <div class="inline" v-if="model.flagShowMagazineMail">
            <div class="label-inf">
              <label>{{ $t('register.lb_magazine_mail') }}</label>
            </div>
            <div class="content content-flex">
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.lb_get') }}</label>
                <input type="radio" name="magazine-mail" checked value="1" v-model="model.magazineMail"/>
              </div>
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.lb_not_get') }}</label>
                <input type="radio" name="magazine-mail" value="0" v-model="model.magazineMail"/>
              </div>
            </div>
          </div>
          <div class="inline" v-if="model.flagShowDirectMail">
            <div class="label-inf">
              <label>{{ $t('register.lb_direct_mail') }}</label>
            </div>
            <div class="content content-flex">
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.lb_get') }}</label>
                <input type="radio" v-model="model.directMail" name="direct-mail" value="1" checked/>
              </div>
              <div class="content-inner">
                <label class="label-radio">{{ $t('register.lb_not_get') }}</label>
                <input type="radio" v-model="model.directMail" name="direct-mail" value="0"/>
              </div>
            </div>
          </div>
          <div class="inline" v-if="model.flagShowGenre">
            <div class="label-inf">
              <label>{{ $t('register.lb_favorite_genres') }}</label>
            </div>
            <div class="content">
              <div class="inline" v-for="line in dataInit.countLineGenre">
                <div class="inline" v-for="(genre, index) in dataInit.listGenre[line - 1]" :key="index">
                  <input type="checkbox" :id="genre.genre_no" :value="genre.genre_no" v-model="model.genre">
                  <label :for="genre.genre_no" class="label-checkbox">{{ genre.genre_nm }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="block-action">
            <button class="rs-btn btn-large btn-green-dark block-left"
              data-toggle="modal" data-target="#confirm-stop-register">
              {{ $t('register.btn_stop_register') }}
            </button>
            <button class="rs-btn btn-large btn-green-dark block-right" @click.prevent="goToNextPage()">
              {{ $t('common.btn_next') }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <div class="modal fade" id="confirm-stop-register"
      tabindex="-1" role="dialog"
      aria-labelledby="title-stop"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="title-stop">{{ $t('register.lb_confirm_stop_register') }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            {{ $t('message.msg_confirm_stop_register') }}
          </div>
          <div class="modal-footer">
            <div class="block-action">
              <button type="button" class="rs-btn btn-small btn-secondary block-left" data-dismiss="modal" @click.prevent="goToTop()">
                {{ $t('register.btn_yes') }}
              </button>
              <button type="button" class="rs-btn btn-small btn-primary block-right" data-dismiss="modal">{{ $t('register.btn_no') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@@/business/register/InputBusiness.js">
</script>

<style lang="scss" scoped>
  @import "assets/scss/register";
</style>
