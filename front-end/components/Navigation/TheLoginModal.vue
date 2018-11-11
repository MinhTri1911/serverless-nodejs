<template>
  <div class="modal fade" id="theLoginModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <form @submit.prevent="searchModalShow">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
                {{$t("booking.lb_require_login")}}

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('common.btn_close')}}</button>
            <nuxt-link :to="{name: 'client_id-login' }" class="btn btn-primary" data-dismiss="modal" style="color: white; text-decoration: none;">{{$t('common.btn_login')}}</nuxt-link>
        </div>
      </div>
      </form>
    </div>
  </div>
</template>

<script>


  export default {
    name: "TheLoginModal",

    data() {
      return {

      }
    },
    created() {

    },

  }
</script>

<style scoped>

</style>
