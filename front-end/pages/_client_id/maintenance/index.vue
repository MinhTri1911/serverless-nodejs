<template>
  <div class="container">
    <div class="login-head">
    </div>
    <div>
      <h3>
        {{ $t('login.lb_maintenance') }}
      </h3>
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
    </div>
  </div>
</template>

<script src="@@/business/maintenance/MaintenanceBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/maintenance/maintenance";
</style>
