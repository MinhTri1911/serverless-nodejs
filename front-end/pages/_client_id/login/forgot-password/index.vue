<template>
  <div class="container">
    <div class="login">
      <div class="login-head">{{ $t('login.lb_forgot_password_head') }}</div>
        <div>
          <h3>{{ $t('login.lb_forgot_password_guide_1') }}</h3>
          <h3>{{ $t('login.lb_forgot_password_guide_2') }}</h3>
        </div>
          <div class="login-form">
            <div class="col-md-12 block">
              <div class="col-md-12 block-inner">
                <div class="col-md-4">
                  {{ $t('login.lb_login_email') }}
               </div>
               <div class="col-md-8 input-center">
                  <input type="text"
                    name="email"
                    v-validate="'required'"
                    :data-vv-as="$t('login.lb_login_email')"
                    v-model="email"
                    autocomplete="on"
                    @keyup.enter="onSubmit()">
               </div>
              </div>
            <div class="col-md-12 block-inner">
              <div class="col-md-4">
                {{ $t('login.lb_home_phone') }}
              </div>
               <div class="col-md-8 input-center">
                  <input type="text" name="phone" v-validate="'required'" v-model="phone" autocomplete="on" @keyup.enter="onSubmit()">
               </div>
              </div>
              <div class= "error-messenger" colspan="2">{{ errors.first('email') }}</div>
              <div class= "error-messenger" colspan="2">{{ errors.first('phone') }}</div>
              <div class= "error-messenger" colspan="2" v-if="error">{{ $t('login.lb_error_forgot_password') }}</div>
              <div class="col-md-12 block-inner">
                <div class="col-md-4">
                  <button type="button" v-on:click="back">{{ $t('login.btn_back') }}</button>
                </div>
                <div class="col-md-8 input-center">
                  <button type="button" @click="onSubmit()">{{ $t('login.lb_setting_password') }}</button>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script src="@@/business/login/forgot_password/ForgotPasswordBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/login/forgot_password";
</style>
