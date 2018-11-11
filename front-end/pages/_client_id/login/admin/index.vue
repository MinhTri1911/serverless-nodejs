<template>
  <div id="MainC">
    <div class="login">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('login.lb_login_admin_head') }}</span></h1>
      <div class="login-form">
        <div class="col-xl-10 block">
          <div class="col-xl-12 block-inner">
            <div class="col-xl-3 min-width-label">
              {{ $t('login.lb_login_ID_admin') }}
            </div>
            <div class="col-xl-8 input-center">
              <input type="text" name="account_id"
                v-validate="{ required:true }"
                v-model="account_id" autocomplete="on"
                @keyup="validate()"
                @keyup.enter="onSubmit()">
            </div>
          </div>
          <div class="error-messenger" colspan="2">{{ errors.first('account_id') }}</div>
          <div class="col-xl-12 block-inner">
            <div class="col-xl-3 min-width-label">
              {{ $t('login.lb_login_password') }}
            </div>
            <div class="col-xl-8 input-center">
              <input type="password" name="password"
              v-validate="{ required:true }"
              v-model="password" autocomplete="on"
              @keyup="validate()"
              @keyup.enter="onSubmit()">
            </div>
          </div>
          <div class="error-messenger" colspan="2">{{ errors.first('password') }}</div>
          <div class="col-xl-12 block-inner">
            <div class="col-xl-3 min-width-date">
              {{ $t('login.lb_login_time') }}
            </div>
              <div class="col-xl-4 block-inner">
                <div class="rs-datepicker">
                     <date-picker name="date"
                        v-model="date"
                        class="rs-input-datepicker right"
                        v-bind:config="datepicker.config"
                        v-validate="'required:true|date_format:YYYY/MM/DD'"
                        @blur.native="validate()"
                        :placeholder="'公演日'"
                        id="fromShowDate">
                        </date-picker>
                        <span class="rs-ico-datepicker"><i class="fa fa-calendar-alt"></i></span>
                </div>
              </div>
              <div class="col-xl-4 block-inner no-padding">
                <div class="col-xl-3 block-inner">
                  <input type="text" name="hour" class="center"
                  v-validate="'required:true|between:0,23'"
                  @keyup="validate()"
                  v-model="hour"
                  autocomplete="on">
                </div>
                <div class="col-xl-3 block-inner">
                  {{ $t('login.lb_login_hour') }}
                </div>
                <div class="col-xl-3 block-inner">
                  <input type="text" name="minute" class="center"
                  v-validate="'required:true|between:0,59'"
                  @keyup="validate()"
                  v-model="minute"
                  autocomplete="on">
                </div>
                <div class="col-xl-3 block-inner">
                  {{ $t('login.lb_login_minute') }}
                </div>
            </div>
          </div>
          <div class="error-messenger" colspan="2">{{ errors.first('date') }}</div>
            <div class="error-messenger" colspan="2">{{ errors.first('hour') }}</div>
            <div class="error-messenger" colspan="2">{{ errors.first('minute') }}</div>
            <div class="error-messenger" colspan="2" v-if="error">{{ $t('login.lb_login_error') }}</div>
          <div class="col-md-13 col-xl-13 block-inner">
            <button type="button" @click="onSubmit()" >{{ $t('login.btn_login') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@@/business/login/admin/LoginAdminBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/login/admin";
</style>


