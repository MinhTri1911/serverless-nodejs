<template>
  <div class="modal fade" id="TheDeleteSeatModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <form @submit.prevent="">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <pre>{{message}} </pre>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('common.btn_close')}}</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">{{$t('common.btn_ok')}}</button>

        </div>
      </div>
      </form>
    </div>
  </div>
</template>

<script>

  export default {
    name: "TheDeleteSeatModal",
    props: ['message'],
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
