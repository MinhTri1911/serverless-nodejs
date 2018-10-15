<template>
  <div class="container">
    <div class="login">
      <div class="login-head">{{ $t('login.lb_login_head') }}</div>
        <div class="login-form">
          <div>
            <h3>{{ $t('login.lb_login_guide_1') }}</h3>
            <h3>{{ $t('login.lb_login_guide_2') }}</h3>
          </div>
            <div class="col-xl-12 block">
              <div class="col-xl-12 block-inner">
                <div class="col-xl-4">
                  {{ $t('login.lb_login_email') }}
                  <br>
                  {{ $t('login.lb_login_ID') }}
                </div>
                <div class="col-xl-8 input-center">
                  <input type="text" name="loginMail" v-validate="{
                    required:true,
                    regex: /(^([a-zA-Z0-9]+[@]([a-zA-Z0-9]{1,})+([.]([a-zA-Z0-9]{2,}){1,})+)$)|(^([0-9]+)$)/
                  }"
                  v-model="mail"
                  autocomplete="on"
                  @keyup.enter="onSubmit()"
                  @keyup="validate()"
                  :data-vv-as="$t('login.lb_ID')">
                </div>
              </div>
              <div class="col-xl-12 block-inner">
                <div class="col-xl-4">
                  {{ $t('login.lb_login_password') }}
                </div>
                <div class="col-xl-8 input-center">
                  <input type="password" name="loginPwd" v-validate="{ required:true }" v-model="password" autocomplete="on" @keyup="validate()" @keyup.enter="onSubmit()">
                </div>
              </div>
              <div class="error-messenger" colspan="2">{{ errors.first('loginMail') }}</div>
              <div class="error-messenger" colspan="2">{{ errors.first('loginPwd') }}</div>
              <div class="error-messenger" colspan="2" v-if="error">{{ $t('login.lb_login_error') }}</div>
              <div class="col-xl-12 block-inner">
                <div class="col-xl-4">
                </div>
                <div class="col-xl-8 input-center">
                  {{ $t('login.lb_register') }}<nuxt-link :to="{name: 'client_id-terms'}">{{ $t('login.link_here') }}</nuxt-link>
                </div>
              </div>
              <div class="col-xl-12 block-inner">
                <div class="col-xl-4">
                </div>
                <div class="col-xl-8 input-center">
                  {{ $t('login.lb_forgotpassword') }}<nuxt-link :to="{name: 'client_id-login-forgot-password' }">{{ $t('login.link_here') }}</nuxt-link>
                </div>
              </div>
              <div class="col-xl-12 block-inner">
                <div class="col-xl-4">
                </div>
              </div>
              <div class="col-xl-12 block-inner">
                <div class="col-xl-4"  v-if="!selectChair">
                  <button type="button" v-on:click="list">{{ $t('login.btn_listbutton') }}</button>
                </div>
                <div class="col-xl-4"  v-if="selectChair">
                  <button type="button" v-on:click="back">{{ $t('login.btn_back') }}</button>
                </div>
                <div class="col-xl-8 input-center">
                  <button type="button" @click="onSubmit()" >{{ $t('login.btn_login') }}</button>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script src="@@/business/login/LoginBusiness.js"></script>
<style lang="scss">
  @import "assets/scss/login/login";
</style>


