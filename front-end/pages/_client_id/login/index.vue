<template>
  <div id="MainC">
    <div class="login">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('login.lb_login_head') }}</span></h1>
      <div class="login-form">
        <div>
          <p>{{ $t('login.lb_login_guide_1') }}</p>
          <p>{{ $t('login.lb_login_guide_2') }}</p>
        </div>
          <div class="col-xl-12 block">
            <div class="col-xl-12 block-inner">
              <div class="col-xl-4 max-width">
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
              <div class="col-xl-4 max-width">
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
            <div class="col-xl-6 offset-xl-3 block-inner">
              <button type="button" v-if="selectChair" class="mr-3" v-on:click="back">{{ $t('login.btn_back') }}</button>
              <button type="button" v-if="!selectChair"  class="mr-3" v-on:click="list">{{ $t('login.btn_listbutton') }}</button>
              <button type="button" class="ml-3" @click="onSubmit()" >{{ $t('login.btn_login') }}</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@@/business/login/LoginBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/login/login";
</style>


