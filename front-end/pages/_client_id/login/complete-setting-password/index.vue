<template>
  <div id="MainC">
    <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('login.lb_complete_setting_password_head') }}</span></h1>
    <div>
      <p>{{ $t('login.lb_complete_setting_password_1') }}</p>
      <p>{{ $t('login.lb_complete_setting_password_2') }}</p>
    </div>
    <div class="center-align">
      <client-info :clientInfo="model"></client-info>
      <button type="button" @click="login()">{{ $t('login.btn_login_here') }}</button>
    </div>
  </div>
</template>

<script src="@@/business/login/complete_setting_password/CompleteSettingPasswordBusiness.js"></script>

<style lang="scss" scoped>
  @import "assets/scss/login/complete_setting_password";
</style>
