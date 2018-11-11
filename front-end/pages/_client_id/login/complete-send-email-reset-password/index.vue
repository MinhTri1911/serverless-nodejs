<template>
  <div id="MainC">
    <h1 class="rs-title-pg"><span id="Pagetitle"> {{ $t('login.lb_complete_send_password_head') }}</span></h1>
    <div>
      <p>{{ $t('login.lb_complete_send_email_1') }}</p>
      <p>{{ $t('login.lb_complete_send_email_2') }}</p>
      <p>{{ $t('login.lb_complete_send_email_3') }}</p>
    </div>
    <div class="center-align">
      <client-info :clientInfo="model"></client-info>
      <button type="button" @click="list()">{{ $t('login.btn_listbutton') }}</button>
    </div>
  </div>
</template>

<script src="@@/business/login/complete_send_email_reset_password/CompleteSendEmailBusiness.js"></script>

<style lang="scss" scoped>
  @import "assets/scss/login/complete_send_email";
</style>
