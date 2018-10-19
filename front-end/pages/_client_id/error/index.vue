<template>
  <div class="container">
    <div class="login-head">
    </div>
    <div>
      <h3 v-for="(error, index) in messenge_error" :key="index">{{ error }}</h3>
    </div>
    <div class="center-align">
      <hr>
      <button type="button" @click="list()">
        {{ $t('login.btn_listbutton') }}
      </button>
    </div>
  </div>
</template>

<script src="@@/business/error/ErrorCommonBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/error/error";
</style>
