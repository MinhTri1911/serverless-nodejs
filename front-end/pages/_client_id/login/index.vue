<template>
  <div class="container">
    <div class="login">
      <div class="login-head">{{ $t('login.lb_login_head') }}</div>
        <div class="login-form">
          <div>
            <h3>{{ $t('login.lb_login_guide_1') }}</h3>
            <h3>{{ $t('login.lb_login_guide_2') }}</h3>
          </div>
            <div class="col-md-12 block">
              <div class="col-md-12 block-inner">
                <div class="col-md-4">
                  {{ $t('login.lb_login_email') }}
                  <br>
                  {{ $t('login.lb_login_ID') }}
                </div>
                <div class="col-md-8 input-center">
                  <input type="text" name="loginMail" v-model="mail" autocomplete="on" @keyup.enter="onSubmit()">
                </div>
              </div>
              <div class="col-md-12 block-inner">
                <div class="col-md-4">
                  {{ $t('login.lb_login_password') }}
                </div>
                <div class="col-md-8 input-center">
                  <input type="password" name="loginPwd" v-model="password" autocomplete="on" @keyup.enter="onSubmit()">
                </div>
              </div>
              <div class= "error-messenger" colspan="2" v-if="error">{{ $t('login.lb_login_error') }}</div>
              <div class="col-md-12 block-inner">
                <div class="col-md-4">
                </div>
                <div class="col-md-8 input-center">
                  {{ $t('login.lb_register') }}<nuxt-link :to="{name: 'client_id-terms'}">{{ $t('login.link_here') }}</nuxt-link>
                </div>
              </div>
              <div class="col-md-12 block-inner">
                <div class="col-md-4">
                </div>
                <div class="col-md-8 input-center">
                  {{ $t('login.lb_forgotpassword') }}<nuxt-link :to="{name: 'client_id-login-forgot-password' }">{{ $t('login.link_here') }}</nuxt-link>
                </div>
              </div>
              <div class="col-md-12 block-inner">
                <div class="col-md-4"  v-if="!selectChair">
                  <button type="button" v-on:click="list">{{ $t('login.btn_listbutton') }}</button>
                </div>
                <div class="col-md-4"  v-if="selectChair">
                  <button type="button" v-on:click="back">{{ $t('login.btn_back') }}</button>
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

<script src="@@/business/login/LoginBusiness.js"></script>
<style lang="scss">
  @import "assets/scss/login/login";
</style>


