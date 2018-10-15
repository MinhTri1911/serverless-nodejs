<template lang="html">
  <div id="MainC" class="register-step-3">
    <main id="ContentsPane">
      <div class="container">
        {{ $t('register.lb_guide_complete_temporary') }}
      </div>

      <div class="container">
        <div class="block">
          <label>{{ $t('register.lb_msg_send_mail') }}</label>
          <label>{{ $t('register.lb_msg_open_mail') }}</label>
          <label>{{ $t('register.lb_msg_not_recive_mail') }}</label>
        </div>
      </div>

      <div class="container">
        <div class="col-md-6 offset-3">
          <div class="block-center">
           <label class="lb-question">{{ $t('register.lb_msg_question') }}</label>
          </div>
        </div>

        <div class="col-md-4 offset-4">
          <button class="rs-btn btn-large btn-green-dark">{{ $t('register.btn_go_to_list_show') }}</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import constant from '@/constant';

export default {
  middleware: 'guest',
  data: () => ({

  }),
  created() {
    if (!this.register.validStepTwo) {
      let path = this.$router.resolve({
        name: constant.router.REGISTER_CONFIRM,
        params: { client_id: this.$route.params.client_id }
      });

      this.$router.push(path.href);
    }
  },
  computed: {
    ...mapState({
      register: state => state.register
    })
  }

}
</script>


<style lang="scss" scoped>
  .register-step-3 {
    .container {
      margin: 20px;

      .block, .block-center {
        padding: 10px;
        margin-top: 5px;
        background-color: #dfe7f0;
      }

      .block-center {
        border-radius: 10px;
        height: 75px;
        text-align: center;

        .lb-question {
          margin-top: 15px;
        }
      }
    }
  }
</style>
