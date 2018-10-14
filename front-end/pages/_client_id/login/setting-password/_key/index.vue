<template>
  <div class="container" v-if="valid">
    <div class="login">
      <div class="login-head">{{ $t('login.lb_setting_password_head') }}</div>
        <div>
          <h3>{{ $t('login.lb_setting_password_1') }}</h3>
          <h3>{{ $t('login.lb_setting_password_2') }}</h3>
          <h3>{{ $t('login.lb_setting_password_3') }}</h3>
        </div>
        <div class="login-form">
          <div class="col-md-12 block">
            <div class="col-md-12 block-inner">
              <div class="col-md-4">
                {{ $t('login.lb_new_password') }}
              </div>
               <div class="col-md-8 input-center">
                  <input type="password" v-validate="'required|passwordRegex'" ref="password" name="password" v-model="password">
               </div>
            </div>
            <div class="col-md-12 block-inner">
              <div class="col-md-4">
                {{ $t('login.lb_confirm_new_password') }}
              </div>
              <div class="col-md-8 input-center">
                <input type="password"
                name="password_confirm"
                :data-vv-as="$t('login.lb_confirm_new_password')"
                v-model="password_confirm"
                v-validate="'required|confirmed:password'"
                @keyup.enter="onSubmit()">
               </div>
            </div>
              <div class= "error-messenger" colspan="2">{{ errors.first('password') }}</div>
              <div class= "error-messenger" colspan="2">{{ errors.first('password_confirm') }}</div>
            <div class="col-md-12 block-inner">
              <div class="col-md-4">
              </div>
              <div class="col-md-8 input-center">
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
