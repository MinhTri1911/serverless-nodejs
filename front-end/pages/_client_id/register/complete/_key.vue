<template lang="html">
  <div id="MainC" class="register-step-4">
    <main id="ContentsPane">
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
        <div class="col-md-6 offset-3">
          <div class="block-center">
           <label class="lb-question">{{ $t('register.lb_msg_question') }}</label>
          </div>
        </div>

        <div class="col-md-4 offset-4">
          <button class="rs-btn btn-large btn-green-dark btn-center">{{ $t('register.btn_go_to_list_show') }}</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import "assets/scss/complete_register";
</style>

