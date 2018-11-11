<template lang="html">
  <div id="MainC" class="my-page">
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('common.links.my_page') }}</span></h1>
      <div class="container">
        <!-- Show message error -->
        <div class="alert alert-danger text-center" v-if="flagShowMessage">
          {{ message }}
        </div>
        <!-- End show message error -->

        <!-- Show infomation member -->
        <div class="col-md-12 block-border" v-if="flagShowMemberInfo" v-for="member in dataShow">
          <!-- Display member infomation -->
          <label>
            {{ dataInit.member.disp_member_nm }}
          </label>

          <div class="block-inline">
            <label>
              {{ member.member_kb_nm + ' ' + member.member_type_nm }}
            </label>
            <label v-if="member.limit_kb != '1'">
              {{ $t('myPage.lb_determinative') + ':' + splitDate(member.member_end_date) }}
            </label>
          </div>
          <!-- End display member infomation -->
          <!-- Display explain member infomation -->
          <div class="col-md-12 block-border" v-if="member.condition_kb != '1'">
            <label>{{ $t('myPage.lb_explain_inf_member') }}</label>

            <div class="block-inline">
              <label>
                {{ member.member_kb_nm + $t('myPage.lb_member_of') }}
              </label>
              <label>{{ $t('myPage.lb_determinative_from_to', splitDate(member.member_end_date, true)) }}</label>
            </div>
          </div>
          <!-- Display payment infomation -->
          <div class="col-md-12 block-border" v-if="member.condition_kb == '3'">
            <label>{{ $t('myPage.lb_explain_inf_member') }}</label>
            <div class="block-inline">
              <label v-if="member.nyukin_flg == '0'">{{ $t('myPage.lb_payment_type') + ':' + member.settle_cd }}</label>
              <label v-if="isConbiniType">{{ $t('myPage.lb_payment_code_conbini') + ':' + member.fami_pass_receipt_no }}</label>
            </div>

            <div class="block-inline" v-if="member.nyukin_flg == '0'">
              <label>{{ $t('myPage.lb_payment_deadline') + ':' + splitDate(member.shiharai_deadline) }}</label>
            </div>
          </div>
        </div>
        <!-- End show infomation member -->

        <!-- Show button -->
        <div class="col-md-12">
          <div class="block-inline-center">
            <nuxt-link class="btn rs-btn btn-green-dark btn-large" :to="{ name: routerNameHistoryOrder }">
              {{ $t('myPage.btn_history_order') }}
            </nuxt-link>
            <nuxt-link class="btn rs-btn btn-green-dark btn-large" :to="{ name:routerNameUpdateInfomation }">
              {{ $t('myPage.btn_change_user_inf') }}
            </nuxt-link>
            <button @click.prevent="checkMember()" v-if="flagShowButtonRegisterMember" class="btn rs-btn btn-green-dark btn-large">
              {{ dataInit.member.disp_member_nm + renderNameButton() }}
            </button>
          </div>
        </div>
        <!-- End show button -->

        <!-- Show history member -->
        <div class="col-md-12 block-border" v-if="flagShowHistoryMember">
          {{ dataInit.member.disp_member_nm + $t('myPage.lb_history') }}

          <table class="table table-borderless">
            <tbody>
              <tr v-for="history in dataInit.historyMember">
                <td>
                  <label>{{ history.member_kb_nm }}</label>
                </td>
                <td>
                  <label>
                    {{ returnStatus(history.member_start_date, history.member_end_date, history.nyukin_flg) }}
                  </label>
                </td>
                <td>
                  <label v-if="history.limit_kb != '1'">
                    {{
                      $t('myPage.lb_determinative') + ':'
                      + splitDate(history.member_start_date) + '~' + splitDate(history.member_end_date)
                    }}
                  </label>
                  <label v-if="history.condition_kb == '3' || history.condition_kb == '5' && history.limit_kb == '1'">
                    {{ $t('myPage.lb_payment_deadline') + ':' + history.shiharai_deadline }}
                  </label>
                </td>
                <td>
                  <label v-if="history.condition_kb == '3' || history.condition_kb == '5' && history.limit_kb == '1'">
                    {{ $t('myPage.lb_payment_type') + ':' + history.settle_cd }}
                  </label>
                </td>
                <td>
                  <label v-if="history.settle_cd == '103'">
                    {{ $t('myPage.lb_payment_code_conbini') + ':' + history.fami_pass_receipt_no }}
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- End show history member -->
      </div>
    </main>

    <!-- Show modal -->
    <div class="modal fade" id="dialog-error"
      tabindex="-1" role="dialog"
      aria-labelledby="title-stop"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="title-stop">{{ $t('common.lb_dialog_confirm') }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ $t('message.msg035_order_exists.line_1') }}</p>
            <p>{{ $t('message.msg035_order_exists.line_2') }}</p>
          </div>
          <div class="modal-footer">
            <div class="block-action">
              <button type="button" class="rs-btn btn-small btn-primary block-right" data-dismiss="modal">
                {{ $t('common.btn_ok') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End show modal -->
  </div>
</template>

<script src="@@/business/my_page/MyPageBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/my_page/mypage";
</style>
