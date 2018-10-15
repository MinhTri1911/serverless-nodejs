<template>
  <div class="container">
    <div class="login" v-if="valid">
      <div class="login-head">{{ $t('login.lb_setting_password_head') }}</div>
        <div>
          <h3>{{ $t('login.lb_setting_password_1') }}</h3>
          <h3>{{ $t('login.lb_setting_password_2') }}</h3>
          <h3>{{ $t('login.lb_setting_password_3') }}</h3>
        </div>
        <div class="login-form">
          <div class="col-xl-12 block">
            <div class="col-xl-12 block-inner">
              <div class="col-xl-4">
                {{ $t('login.lb_new_password') }}
              </div>
               <div class="col-xl-8 input-center">
                  <input type="password"
                  v-validate="{ required: true, min:8, max:16, passwordRegex:true }"
                  ref="password"
                  :data-vv-as="$t('login.lb_new_password')"
                  name="password"
                  v-model="password"
                  @keyup="validate()"
                  @paste.prevent>
               </div>
            </div>
            <div class="col-xl-12 block-inner">
              <div class="col-xl-4">
                {{ $t('login.lb_confirm_new_password') }}
              </div>
              <div class="col-xl-8 input-center">
                <input type="password"
                name="password_confirm"
                :data-vv-as="$t('login.lb_confirm_new_password')"
                v-model="password_confirm"
                v-validate="'required:true|confirmed:password'"
                @keyup="validate()"
                @keyup.enter="onSubmit()"
                @paste.prevent>
               </div>
            </div>
              <div class= "error-messenger" colspan="2">{{ errors.first('password') }}</div>
              <div class= "error-messenger" colspan="2">{{ errors.first('password_confirm') }}</div>
              <div class="error-messenger" colspan="2" v-if="error">{{ $t('login.lb_setting_password_error') }}</div>
            <div class="col-xl-12 block-inner">
                <div class="col-xl-4">
                </div>
              </div>
            <div class="col-xl-12 block-inner">
              <div class="col-xl-4">
              </div>
              <div class="col-xl-8 input-center">
                <button type="button" @click="onSubmit()">{{ $t('login.btn_setting_password') }}</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script src="@@/business/login/setting_password/SettingPasswordBusiness.js"></script>
<style lang="scss">
  @import "assets/scss/login/setting_password";
</style>
