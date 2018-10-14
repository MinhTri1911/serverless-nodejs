<template>
  <div class="container">
    <div class="login">
      <div class="login-head">{{ $t('login.lb_login_head') }}</div>
        <div class="login-form">
          <div class="col-md-10 block">
            <div class="col-md-11 block-inner">
              <div class="col-md-3">
                {{ $t('login.lb_login_ID_admin') }}
              </div>
              <div class="col-md-8 input-center">
                <input type="text" name="loginMail" v-model="mail" autocomplete="on" @keyup.enter="onSubmit()">
              </div>
            </div>
            <div class="col-md-11 block-inner">
              <div class="col-md-3">
                {{ $t('login.lb_login_password') }}
              </div>
              <div class="col-md-8 input-center">
                <input type="password" name="loginPwd" v-model="password" autocomplete="on" @keyup.enter="onSubmit()">
              </div>
            </div>
            <div class="col-md-11 block-inner">
              <div class="col-md-3">
                {{ $t('login.lb_login_time') }}
              </div>
              <div class="col-md-8 block-inner">
                <div class="col-md-6 block-inner">
                  <date-picker v-model="year" v-bind:config="datepicker.config" :placeholder="'公演日'" id="fromShowDate"></date-picker>
                </div>
                <div class="col-md-6 block-inner">
                  <div class="col-md-3 block-inner">
                    <input type="text" name="hour" v-model="hour" autocomplete="on">
                  </div>
                  <div class="col-md-3 block-inner">
                    {{ $t('login.lb_login_hour') }}
                  </div>
                  <div class="col-md-3 block-inner">
                    <input type="text" name="minute" v-model="minute" autocomplete="on">
                  </div>
                  <div class="col-md-3 block-inner">
                    {{ $t('login.lb_login_minute') }}
                  </div>
                </div>
              </div>
            </div>
              <div class= "error-messenger" colspan="2" v-if="error">{{ $t('login.lb_login_error') }}</div>
            <div class="col-md-11 block-inner">
              <div class="col-md-3">
              </div>
            </div>
            <div class="col-md-11 block-inner">
              <div class="col-md-3">
            </div>
              <div class="col-md-8 input-center">
                <button type="button" @click="onSubmit()" >{{ $t('login.btn_login') }}</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script src="@@/business/login/admin/LoginAdminBusiness.js"></script>
<style lang="scss">
  @import "assets/scss/login/admin";
</style>


