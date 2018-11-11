<template lang="html">
  <div id="MainC" class="register-step-3">
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('register.lb_title_complete_temporary') }}</span></h1>
      <div class="container">
        <div class="col-md-12">
          {{ $t('register.lb_guide_complete_temporary') }}
        </div>
      </div>

      <div class="container">
        <div class="col-md-12">
          <div class="block">
            <label>{{ $t('register.lb_msg_send_mail') }}</label>
            <label>{{ $t('register.lb_msg_open_mail') }}</label>
            <label>{{ $t('register.lb_msg_not_recive_mail') }}</label>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="col-md-6 offset-md-3">
          <ClientInfo :clientInfo="model"/>
        </div>

        <div class="col-md-4 offset-md-4">
          <nuxt-link class="btn rs-btn btn-large btn-green-dark btn-center" :to="pathToHomePage">{{ $t('register.btn_go_to_list_show') }}</nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="@@/business/register/CompleteBusiness.js">
</script>

<style lang="scss" scoped>
  @import "assets/scss/complete_register";
</style>
