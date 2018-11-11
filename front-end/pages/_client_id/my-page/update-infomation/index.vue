<template lang="html">
  <div id="MainC" class="update-infomation">
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('updateInfomation.lb_title_update_infomation') }}</span></h1>
      <div class="container">
        <div class="block">
          {{ $t('message.msg009_explain_input_inf.msg_1_head.dot') }}
          <span class="head-msg-fullsize require" v-html="$t('common.require_1')"></span>
          {{ $t('message.msg009_explain_input_inf.msg_1') }}
          <br />
          {{ $t('message.msg009_explain_input_inf.msg_2') }}
        </div>
      </div>

      <!-- Show message errors -->
      <div class="container" v-if="flagValidate || !flagRequiredWith || errorsMsg.length">
        <div class="error" :style="flagValidate || !flagRequiredWith ? 'display: block;' : ''">
          <div class="alert alert-danger" v-if="flagValidate || !flagRequiredWith">
            <label v-if="errors.first('login_id')">{{ errors.first('login_id') }}</label>
            <label v-if="errors.first('mail')">{{ errors.first('mail') }}</label>
            <label v-if="errors.first('confirmed_mail')">{{ errors.first('confirmed_mail') }}</label>
            <label v-if="errors.first('full_name')">{{ errors.first('full_name') }}</label>
            <label v-if="errors.first('furigana')">{{ errors.first('furigana') }}</label>
            <label v-if="flagRequiredWith && (errors.first('phone_number') || errors.first('cell_phone'))">
              <label>{{ errors.first('phone_number') }}</label>
              <label>{{ errors.first('cell_phone') }}</label>
            </label>
            <label v-if="!flagRequiredWith">
              {{ $t('validation.required_with', {
                  field_1: $t('updateInfomation.lb_phone_number'),
                  field_2: $t('updateInfomation.lb_cell_phone')
                })
              }}
            </label>
            <label v-if="errors.first('post_code')">{{ errors.first('post_code') }}</label>
            <label v-if="errors.first('post_code_1')">{{ errors.first('post_code_1') }}</label>
            <label v-if="errors.first('post_code_2')">{{ errors.first('post_code_2') }}</label>
            <label v-if="errors.first('city')">{{ errors.first('city') }}</label>
            <label v-if="errors.first('district')">{{ errors.first('district') }}</label>
            <label v-if="errors.first('address')">{{ errors.first('address') }}</label>
            <label v-if="errors.first('building_room')">{{ errors.first('building_room') }}</label>
            <label v-if="errors.first('birthday')">{{ errors.first('birthday') }}</label>
            <label v-if="errors.first('password')">{{ errors.first('password') }}</label>
            <label v-if="errors.first('confirmed_password')">{{ errors.first('confirmed_password') }}</label>
            <label v-if="errors.first('member_code')">{{ errors.first('member_code') }}</label>
          </div>

          <div v-if="errorsMsg.length" class="alert alert-danger">
            <div class="error" :style="errorsMsg.length ? 'display: block;' : ''">
              <label v-for="error in errorsMsg">{{ error }}</label>
            </div>
          </div>
        </div>
      </div>
      <!-- End show message errors -->

      <!-- Show login id -->
      <div class="container">
        <div class="block">
          <div class="message">
            <label>{{ $t('message.msg037_explain_login_id.line_1') }}</label><br />
            <label>{{ $t('message.msg037_explain_login_id.line_2') }}</label>
          </div>
          <div class="area-input">
            <label>{{ $t('updateInfomation.lb_login_id') }}</label>
            <input type="text" name="login_id" v-model="model.loginId"
              v-validate="'max:200|textNumberHaftSize|existsLoginId:' + `${clientId},${model.memberCode}`"
              :data-vv-as="$t('updateInfomation.lb_login_id')"/>
          </div>
          <div class="message col-md-3 offset-md-1">
            <label>{{ $t('message.msg038_note_input_login_id') }}</label>
          </div>
        </div>
      </div>
      <!-- End show login id -->

      <!-- Show input form -->
      <div class="container" id="RegForm">
        <table>
          <tbody>
            <!-- Mail -->
            <tr>
              <td class="td-head" scope="row">
                <label>{{ $t('updateInfomation.lb_mail') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="email" name="mail" v-model="model.mail"
                  v-validate="'required|max:200|email|confirmed:confirmed_mail|existsMailUpdate:' + `${clientId},${model.memberCode}`"
                  :data-vv-as="$t('updateInfomation.lb_mail')"/>
              </td>
            </tr>
            <!-- Confirm mail -->
            <tr>
              <td class="td-head" scope="row">
                <label>{{ $t('updateInfomation.lb_confirm_mail') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="email" name="confirmed_mail" ref="confirmed_mail"
                  v-validate="'required|max:200|email'"
                  :data-vv-as="$t('updateInfomation.lb_confirm_mail')"
                  v-model="model.confirmedMail"/>
              </td>
            </tr>
            <!-- Full name -->
            <tr>
              <td class="td-head" scope="row">
                <label>{{ $t('updateInfomation.lb_full_name') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" name="full_name"
                  v-validate="'required|max:200|' + (
                    statusInputName == 1 ? 'spaceFullSize:1' : (statusInputName == 2 ? 'spaceFullSize:2' : 'fullsize')
                  )" :data-vv-as="$t('updateInfomation.lb_full_name')"
                  v-model="model.fullName"/>
                <label class="extension">{{ $t('updateInfomation.lb_extension') }}</label>
                <label class="extension" v-if="statusInputName == 1">{{ $t('updateInfomation.lb_enter_space') }}</label>
                <label class="extension" v-if="statusInputName == 2">{{ $t('updateInfomation.lb_remove_space') }}</label>
              </td>

            </tr>
            <!-- Furigana -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_furigana') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" name="furigana"
                  v-validate="'required|max:200|' + (
                    statusInputName == 1 ? 'spaceFullSize:1' : (statusInputName == 2 ? 'spaceFullSize:2' : 'fullsize')
                  )" :data-vv-as="$t('updateInfomation.lb_furigana')"
                  v-model="model.furigana"/>
                <label class="extension">{{ $t('updateInfomation.lb_extension') }}</label>
                <label class="extension" v-if="statusInputName == 1">{{ $t('updateInfomation.lb_enter_space') }}</label>
                <label class="extension" v-if="statusInputName == 2">{{ $t('updateInfomation.lb_remove_space') }}</label>
              </td>
            </tr>
            <!-- Tel no -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_phone_number') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.phoneNumber" ref="phone_number" name="phone_number"
                  v-validate="'phoneNumber:' + statusInputPhoneNumber" :data-vv-as="$t('updateInfomation.lb_phone_number')"/>
                <label class="extension" v-if="statusInputPhoneNumber == 1">{{ $t('updateInfomation.lb_enter_dash') }}</label>
                <label class="extension" v-if="statusInputPhoneNumber == 2">{{ $t('updateInfomation.lb_remove_dash') }}</label>
              </td>
            </tr>
            <!-- Mobile no -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_cell_phone') }}<span class="require">{{ $t('common.require_1') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" ref="cell_phone" v-model="model.cellPhone" name="cell_phone"
                  v-validate="'phoneNumber:' + statusInputPhoneNumber"/>
                <label class="extension" v-if="statusInputPhoneNumber == 1">{{ $t('updateInfomation.lb_enter_dash') }}</label>
                <label class="extension" v-if="statusInputPhoneNumber == 2">{{ $t('updateInfomation.lb_remove_dash') }}</label>
              </td>
            </tr>
            <!-- Post code -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_zipcode') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content flex-block">
                <input type="hidden" v-model="model.postCode" name="post_code"
                  v-validate="'numeric|required|length:7'" :data-vv-as="$t('updateInfomation.lb_zipcode')"/>
                <input type="text" v-model="model.postCode1" name="post_code_1"
                  @change="watchPostCode()"
                  v-validate="'length:3'"/>
                <span class="between">-</span>
                <input type="text" v-model="model.postCode2"
                  name="post_code_2"
                  @change="watchPostCode()"
                  v-validate="'length:4'"/>
                <button class="rs-btn btn-green-dark btn-auto"
                  @click.prevent="searchPostCode(model.postCode1, model.postCode2)">
                  {{ $t('updateInfomation.btn_search_zipcode') }}
                </button>
              </td>
            </tr>
            <!-- Prefecture -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_city') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <select v-model="model.slbCity" v-validate="'required'" name="city" :data-vv-as="$t('updateInfomation.lb_city')">
                  <option value="">{{ $t('updateInfomation.lb_not_select') }}</option>
                  <option v-for="item in dataInit.city" :value="item.code_nm" >{{ item.code_nm }}</option>
                </select>
              </td>
            </tr>
            <!-- Municipality -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_district') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.district" name="district"
                  v-validate="'required|max:200|fullsize'"
                  :data-vv-as="$t('updateInfomation.lb_district')"/>
                <label class="extension">{{ $t('common.enter_full_size') }}</label>
              </td>
            </tr>
            <!-- Address1 -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_detail_address') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.address" name="address"
                  v-validate="'required|max:400|fullsize'"
                  :data-vv-as="$t('updateInfomation.lb_detail_address')"/>
                <label class="extension">{{ $t('common.enter_full_size') }}</label>
              </td>
            </tr>
            <!-- Address2 -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_building_room') }}</label>
              </td>
              <td class="td-content">
                <input type="text" v-model="model.buildingRoom" name="building_room"
                  v-validate="'max:400|fullsize'"
                  :data-vv-as="$t('updateInfomation.lb_building_room')"/>
                <label class="extension">{{ $t('message.msg017_enter_building_room') }}</label>
              </td>
            </tr>
          <!-- Birthday -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_birthday') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content flex-block">
                <input type="hidden"
                  v-model="model.birthday"
                  v-validate="'required|date_format:YYYY-MM-DD|after:1900-01-01|before:' + now"
                  name="birthday"
                  :data-vv-as="$t('updateInfomation.lb_birthday')"/>
                <label class="between">{{ $t('updateInfomation.lb_calendar') }}</label>
                <input type="text"
                  v-model="model.year"
                  @change="watchBirthday()"
                  name="year"/>
                <label class="between">{{ $t('updateInfomation.lb_year') }}</label>
                <input type="text"
                  v-model="model.month"
                  @change="watchBirthday()"
                  name="month"/>
                <label class="between">{{ $t('updateInfomation.lb_month') }}</label>
                <input type="text"
                  v-model="model.day"
                  @change="watchBirthday()"
                  name="day"/>
                <label class="between">{{ $t('updateInfomation.lb_day') }}</label>
              </td>
            </tr>
            <!-- Sex type -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_gender') }}</label>
              </td>
              <td class="td-content flex-block gender">
                <span class="between">{{ $t('updateInfomation.lb_male') }}
                </span>
                <input type="radio" v-model="model.gender" name="gender" value="male" checked />
                <span class="between">{{ $t('updateInfomation.lb_female') }}
                </span>
                <input type="radio" v-model="model.gender" name="gender" value="female">
              </td>
            </tr>
            <!-- Password -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_password') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="password"
                  v-model="model.password"
                  v-validate="'min:8|max:16|confirmed:confirmed_password|passwordRegex'"
                  :data-vv-as="$t('updateInfomation.lb_password')"
                  name="password"/>
                <label>{{ $t('message.msg018_enter_password.msg_1') }}</label><br />
                <label>{{ $t('message.msg018_enter_password.msg_2') }}</label>
              </td>
            </tr>
            <!-- Confirm password -->
            <tr>
              <td class="td-head">
                <label>{{ $t('updateInfomation.lb_confirm_password') }}<span class="require">{{ $t('common.require') }}</span></label>
              </td>
              <td class="td-content">
                <input type="password"
                  name="confirmed_password"
                  ref="confirmed_password"
                  v-validate="'min:8|max:16'"
                  :data-vv-as="$t('updateInfomation.lb_confirm_password')"
                  v-model="model.confirmedPassword"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End show input form -->

      <!-- Show input infomation -->
      <div class="container">
        <label v-if="model.flagShowMemberCode">{{ $t('updateInfomation.lb_explant_code_member') }}</label>
        <div class="block" v-if="model.flagShowMemberCode">
          <div class="message">
            <label>{{ $t('updateInfomation.lb_extension_member_code.line_1') }}</label><br />
            <label>{{ $t('updateInfomation.lb_extension_member_code.line_2') }}</label><br />
            <label>{{ $t('updateInfomation.lb_extension_member_code.line_3') }}</label>
          </div>
          <div class="area-input">
            <label>{{ $t('updateInfomation.lb_member_code') }}</label>
            <input type="text"
              name="member_code"
              v-validate="'max:16|textNumberHaftSize|existsMemberCode:' +
                `${clientId},${model.fullName},${model.furigana},${model.cellPhone},${model.phoneNumber}`"
              v-model="model.memberCodeInput"
              :data-vv-as="$t('updateInfomation.lb_member_code')"/>
          </div>
        </div>

        <div class="block-input">
          <div class="inline" v-if="model.flagShowMagazineMail">
            <div class="label-inf">
              <label>{{ $t('updateInfomation.lb_magazine_mail') }}</label>
            </div>
            <div class="content content-flex">
              <div class="content-inner">
                <label class="label-radio">{{ $t('updateInfomation.lb_get') }}</label>
                <input type="radio" name="magazine-mail" checked value="1" v-model="model.magazineMail"/>
              </div>
              <div class="content-inner">
                <label class="label-radio">{{ $t('updateInfomation.lb_not_get') }}</label>
                <input type="radio" name="magazine-mail" value="0" v-model="model.magazineMail"/>
              </div>
            </div>
          </div>
          <div class="inline" v-if="model.flagShowDirectMail">
            <div class="label-inf">
              <label>{{ $t('updateInfomation.lb_direct_mail') }}</label>
            </div>
            <div class="content content-flex">
              <div class="content-inner">
                <label class="label-radio">{{ $t('updateInfomation.lb_get') }}</label>
                <input type="radio" v-model="model.directMail" name="direct-mail" value="1" checked/>
              </div>
              <div class="content-inner">
                <label class="label-radio">{{ $t('updateInfomation.lb_not_get') }}</label>
                <input type="radio" v-model="model.directMail" name="direct-mail" value="0"/>
              </div>
            </div>
          </div>
          <div class="inline" v-if="model.flagShowGenre">
            <div class="label-inf">
              <label>{{ $t('updateInfomation.lb_favorite_genres') }}</label>
            </div>
            <div class="content">
              <div class="inline" v-for="line in dataInit.countLineGenre">
                <div class="inline" v-for="(genre, index) in dataInit.listGenre[line - 1]" :key="index">
                  <input type="checkbox" :id="genre.genre_no" :value="genre.genre_no" v-model="model.listGenre">
                  <label :for="genre.genre_no" class="label-checkbox">{{ genre.genre_nm }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="block-action">
            <button class="btn rs-btn btn-large btn-green-dark block-left" @click.prevent="showPopUp()">
              {{ $t('updateInfomation.btn_stop_change') }}
            </button>
            <button class="btn rs-btn btn-large btn-green-dark block-right"
              @click.prevent="goToNext()">
              {{ $t('common.btn_next') }}
            </button>
          </div>
        </div>
      </div>
      <!-- End show input infomation -->

      <!-- Show modal -->
      <div class="modal fade" id="confirm-stop-update-infomation"
        tabindex="-1" role="dialog"
        aria-labelledby="title-stop"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="title-stop">{{ $t('common.lb_dialog_confirm') }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div class="modal-body">
              {{ $t('updateInfomation.lb_msg_stop_change') }}
            </div>
            <div class="modal-footer">
              <div class="block-action">
                <button type="button" class="rs-btn btn-small btn-secondary block-left" data-dismiss="modal">{{ $t('common.btn_no') }}</button>
                <button type="button" class="rs-btn btn-small btn-primary block-right" data-dismiss="modal" @click.prevent="goToMyPage()">
                  {{ $t('common.btn_ok') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End show modal -->

    </main>
  </div>
</template>

<script src="@@/business/my_page/UpdateInfoBusiness.js">
</script>

<style lang="scss" scoped>
  @import "assets/scss/register";
</style>
