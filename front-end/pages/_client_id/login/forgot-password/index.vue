<template>
  <div id="MainC">
    <main id="ContentsPane" class="login">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('login.lb_forgot_password_head') }}</span></h1>
      <div>
        <p>{{ $t('login.lb_forgot_password_guide_1') }}</p>
        <p>{{ $t('login.lb_forgot_password_guide_2') }}</p>
      </div>
      <div class="col login-form">
        <div class="col-xl-12 block">
          <div class="col-xl-12 block-inner">
            <div class="col-xl-4 max-width">
              {{ $t('login.lb_login_email') }}
            </div>
            <div class="col-xl-8 input-center">
              <input type="text"
                name="email"
                v-validate="{
                  required: true,
                  email,
                  regex: /^([a-zA-Z0-9@.]+)$/
                }"
                :data-vv-as="$t('login.lb_login_email')"
                v-model="email"
                autocomplete="on"
                @keyup="validate()"
                @keyup.enter="onSubmit()">
            </div>
          </div>
        <div class="col-xl-12 block-inner">
          <div class="col-xl-4 max-width">
            {{ $t('login.lb_home_phone') }}<br />
            {{ $t('login.lb_phone') }}
          </div>
          <div class="col-xl-8 input-center">
            <input type="text"
              name="phone"
              v-validate="{
                required: true,
                regex: /(^([0-9]+(([-]([0-9]{1,10})){1,10})+)$)|(^([0-9]+)$)/,
                min: 10,
                max: 20
              }"
              v-model="phone"
              autocomplete="on"
              @keyup="validate()"
              @keyup.enter="onSubmit()"
              :data-vv-as="$t('login.lb_phone')">
          </div>
          </div>
          <div class= "error-messenger" colspan="2">{{ errors.first('email') }}</div>
          <div class= "error-messenger" colspan="2">{{ errors.first('phone') }}</div>
          <div class= "error-messenger" colspan="2" v-if="error">
            {{ $t('login.lb_error_forgot_password') }}
          </div>
          <div class="col-xl-12 block-inner">
              <button type="button" v-on:click="back">{{ $t('login.btn_back') }}</button>
              <button type="button" @click="onSubmit()">{{ $t('login.lb_setting_password') }}</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="@@/business/login/forgot_password/ForgotPasswordBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/login/forgot_password";
</style>
