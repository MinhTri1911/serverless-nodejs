<template>
  <table>
    <div class="container">
      <div class="login-head"></div>
        <div>
          <h3>{{ $t('login.lb_error_black_cd') }}</h3>
        </div>
        <div class="center-align">
          <hr>
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
            <hr>
          <button type="button" @click="list()">{{ $t('login.btn_listbutton') }}</button>
        </div>
      </div>
    </table>
</template>

<script src="@@/business/error/ErrorBussiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/error/error";
</style>


