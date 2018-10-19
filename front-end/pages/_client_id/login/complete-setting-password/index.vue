<template>
  <div class="container">
    <div class="login-head">
      {{ $t('login.lb_complete_setting_password_head') }}
    </div>
    <div>
      <h3>{{ $t('login.lb_complete_setting_password_1') }}</h3>
      <h3>{{ $t('login.lb_complete_setting_password_2') }}</h3>
    </div>
    <div class="center-align">
      <table>
      <tr>
        <th>{{ $t('login.lb_question') }}</th>
      </tr>
      <tr>
        <td>{{ $t('login.lb_inquiry_nm') }}{{inquiry_nm}}</td>
      </tr>
      <tr>
        <td>{{ $t('login.lb_inquiry_tel_no') }} {{inquiry_tel_no}}</td>
      </tr>
      <tr>
        <td>{{ $t('login.lb_inquiry_url') }} <a :href= "inquiry_url">{{inquiry_url}}</a></td>
      </tr>
      <tr>
        <td>{{ $t('login.lb_inquiry_notes') }} {{inquiry_notes}}</td>
      </tr>
    </table>
      <button type="button" @click="login()">{{ $t('login.btn_login_here') }}</button>
    </div>
  </div>
</template>

<script src="@@/business/login/complete_setting_password/CompleteSettingPasswordBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/login/complete_setting_password";
</style>


