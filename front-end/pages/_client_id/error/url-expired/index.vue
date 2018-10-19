<template>
  <div class="container">
    <div class="login-head">
    </div>
    <div>
      <h3>{{ $t('login.lb_error_url_1') }}</h3>
      <h3>{{ $t('login.lb_error_url_2') }}</h3>
      <h3>{{ $t('login.lb_error_url_3') }}</h3>
    </div>
    <div class="center-align">
      <hr>
      <button type="button" @click="list()">{{ $t('login.btn_listbutton') }}</button>
    </div>
  </div>
</template>

<script src="@@/business/error/ErrorBussiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/error/error";
</style>


