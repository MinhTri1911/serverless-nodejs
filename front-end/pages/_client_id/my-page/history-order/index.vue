<template lang="html">
  <div id="MainC" class="history-order">
    <main class="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('common.links.my_page') }}</span></h1>
      <div class="container">
        <div v-if="!isNotHaveHistory" class="col-md-12">
          <div class="block-title">
            <label>{{ $t('historyOrder.lb_title_order') }}</label>
          </div>
        </div>

        <!-- Show list order -->
        <div v-if="!isNotHaveHistory" class="col-md-12">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>{{ $t('historyOrder.lb_order_no') }}</th>
                <th>{{ $t('historyOrder.lb_order_date') }}</th>
                <th>{{ $t('historyOrder.lb_payment') }}</th>
                <th>{{ $t('historyOrder.lb_payment_status') }}</th>
                <th>{{ $t('historyOrder.lb_type_order') }}</th>
                <th class="smart-phone-hidden">{{ $t('historyOrder.lb_show_name') }}</th>
                <th class="smart-phone-hidden">{{ $t('historyOrder.lb_show_date') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in dataInit.orders">
                <td
                  v-if="countDuplicate[order.reserve_no] && countDuplicate[order.reserve_no].index == index"
                  :rowspan="countDuplicate[order.reserve_no] ? countDuplicate[order.reserve_no].total : 1">
                  <a href="javascript:void(0)" @click.prevent="getDetail(order.reserve_no, order.show_group_main_title)">
                    {{ order.reserve_no }}
                  </a>
                </td>
                <td
                  v-if="countDuplicate[order.reserve_no] && countDuplicate[order.reserve_no].index == index"
                  :rowspan="countDuplicate[order.reserve_no] ? countDuplicate[order.reserve_no].total : 1">
                  {{ order.reserve_dtime }}
                </td>
                <td>{{ order.settle_depart_nm }}</td>
                <td>{{ order.payment_condition + (order.nyukin_date == '' ? ' ' + order.shiharai_deadline : '' ) }}</td>
                <td
                  v-if="countDuplicate[order.reserve_no] && countDuplicate[order.reserve_no].index == index"
                  :rowspan="countDuplicate[order.reserve_no] ? countDuplicate[order.reserve_no].total : 1">
                  {{ order.entry_nm }}
                </td>
                <td
                  v-if="countDuplicate[order.reserve_no] && countDuplicate[order.reserve_no].index == index"
                  :rowspan="countDuplicate[order.reserve_no] ? countDuplicate[order.reserve_no].total : 1"
                  class="smart-phone-hidden">
                  {{ order.show_group_main_title }}
                </td>
                <td
                  v-if="countDuplicate[order.reserve_no] && countDuplicate[order.reserve_no].index == index"
                  :rowspan="countDuplicate[order.reserve_no] ? countDuplicate[order.reserve_no].total : 1"
                  class="smart-phone-hidden">
                  {{ order.show_dtime }}
                </td>
              </tr>
            </tbody>
          </table>

          <Pagination :current-page="page.currentPage"
            :total-items="page.totalItems"
            :items-per-page="page.itemsPerPage"
            @page-changed="pageChanged">
          </Pagination>
        </div>
        <!-- End show list order -->

        <div v-if="!isNotHaveHistory" class="col-md-12">
          <div class="block-title">
            <label>{{ $t('historyOrder.lb_title_detail_order') }}</label>
          </div>
        </div>

        <!-- Show detail order -->
        <div v-if="!isNotHaveHistory" class="col-md-12">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td class="td-label">{{ $t('historyOrder.lb_order_no') }}</td>
                <td class="td-content">
                  {{ dataShow.reserve_no }}
                </td>
              </tr>
              <tr>
                <td class="td-label">{{ $t('historyOrder.lb_order_date') }}</td>
                <td class="td-content">
                  {{ dataShow.reserve_dtime }}
                </td>
              </tr>
              <tr>
                <td class="td-label">{{ $t('historyOrder.lb_price') }}</td>
                <td class="td-content">
                  {{ dataShow.urikake_gaku }}
                </td>
              </tr>
              <tr>
                <td class="td-label">{{ $t('historyOrder.lb_payment_type') }}</td>
                <td class="td-content">
                  {{ dataShow.settle_nm }}
                </td>
              </tr>
              <tr>
                <td class="td-label">{{ $t('historyOrder.lb_recive') }}</td>
                <td class="td-content">
                  {{ dataShow.depart_nm }}
                </td>
              </tr>
              <tr>
                <td class="td-label">{{ $t('historyOrder.lb_payment_status') }}</td>
                <td class="td-content">
                  {{ dataShow.payment_condition }}
                </td>
              </tr>
              <tr v-if="dataShow.depart_ed == '203'">
                <td class="td-label">{{ $t('historyOrder.lb_order_combini') }}</td>
                <td class="td-content">
                  {{ dataShow.fami_pass_receipt_no2 }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Show detail order -->

        <!-- Show detail seat -->
        <div v-if="!isNotHaveHistory" class="col-md-12">
          <div class="block-title">
            <div class="col-md-4 order-detail-seat">
              <label>{{ $t('historyOrder.lb_show_name') + ':' + detail.showName }}</label>
            </div>

            <!--  -->
            <div class="col-md-12">
              <div class="block-title block-inline col-md-12">
                <div class="col-md-2">
                  <label>{{ $t('historyOrder.lb_show_date') }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ $t('historyOrder.lb_show_name_receipt_period') }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ $t('historyOrder.lb_seat_type') }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ $t('historyOrder.lb_ticket_type') }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ $t('historyOrder.lb_seat_name') }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ $t('historyOrder.lb_sales_price') }}</label>
                </div>
              </div>
            </div>
            <!--  -->

            <!-- Show seat -->
            <div class="col-md-12">
              <div class="block-title block-inline col-md-12" v-for="seat in detail.seat">
                <div class="col-md-2">
                  <label>{{ seat.show_date_disp_char }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ seat.sales_nm }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ seat.seat_type_nm }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ seat.ticket_type_nm }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ seat.seat_nm }}</label>
                </div>
                <div class="col-md-2">
                  <label>{{ seat.sales_price }}</label>
                </div>
              </div>
            </div>
            <!-- End show seat -->

            <!-- Show order -->
            <div class="col-md-12">
              <div class="block-inline col-md-12" v-for="order in detail.order">
                <div class="col-md-6">
                  <label>
                    {{ $t('historyOrder.lb_fee_name') + ':' + (order.fee_nm ? order.fee_nm : '') }}
                  </label>
                </div>
                <div class="col-md-6">
                  <label>
                    {{ $t('historyOrder.lb_fee_price') + ':' + (order.fee_price ? order.fee_price : '') }}
                  </label>
                </div>
              </div>
            </div>
            <!-- End show order -->

            <!-- Show total ticket -->
            <div class="col-md-12">
              <div class="block-title block-inline col-md-12">
                <div class="col-md-6">
                  <label>{{ $t('historyOrder.lb_total_ticket') + ':' + dataShow.total_ticket }}</label>
                </div>
                <div class="col-md-6">
                  <label>{{ $t('historyOrder.lb_total_price') + ':' + dataShow.total_ticket_price }}</label>
                </div>
              </div>
            </div>
            <!-- End show total ticket -->

            <div class="col-md-12 order-detail-seat">
              <label>{{ $t('historyOrder.lb_ticket_url') + ':' }}</label>
              <a :href="url" target="_blank">{{ url }}</a>
            </div>
          </div>
        </div>
        <!-- End show detail seat -->

        <div v-if="isNotHaveHistory" class="col-md-12">
          <div class="block">
            <label>{{ $t('message.msg036_not_have_history_order') }}</label>
          </div>
        </div>

        <div class="col-md-12 block-action">
          <nuxt-link class="btn rs-btn btn-large btn-green-dark" :to="{ name: linkToMyPage }">
            {{ $t('common.btn_back') }}
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="@@/business/my_page/HistoryOrderBusiness.js"></script>

<style lang="scss" scoped>
  @import "assets/scss/my_page/history_order";
</style>
