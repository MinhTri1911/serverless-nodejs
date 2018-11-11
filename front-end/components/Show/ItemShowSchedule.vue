<template>
  <!-- ## Begin Show Item -->
  <div class="show-item sub-item schedule " :id="'show_item_' + schedule.show_no"
       v-show="(!seeExpired && schedule.hide_show_flg == constant.EXPIRED_HIDE)
       || (seeExpired && (schedule.hide_show_flg == constant.EXPIRED_HIDE || schedule.hide_show_flg == constant.EXPIRED_SHOW))">
    <!-- Begin Show Top Item -->
    <div class="show-top clearfix">
      <div class="row-show">
        <div class="col-show">
          {{schedule.show_nm}}
        </div>
        <div class="col-show">
          {{schedule.show_date_disp_char}}
        </div>
        <div class="col-show">
          {{schedule.hall_nm}}
        </div>
      </div>
      <div class="row-show">
        <div class="col-show show-main-tt">
          {{schedule.detail_explanation}}
        </div>
      </div>
    </div>
    <!-- End Show Top -->
    <!-- Begin Show Accept Item -->
    <div class="show-accept clearfix" v-if="schedule.sales_list && schedule.sales_list.length > 0"
         v-for="(sales, index2) in schedule.sales_list" v-bind:key="index2">
      <div class="show-accept-item clearfix">
        <div class="row-show">
          <div class="col-show show-main-tt">
            <span><i class="fas fa-shopping-cart"></i></span> {{sales.sales_nm}}
            <span class="slot-seat"
                  v-if="sales.seat_selection_flg && sales.seat_selection_flg == constant.SEAT_SELECTION">{{$t('show.lbl_able_seat')}}</span>
          </div>
          <div class="col-show show-date">
            {{sales.sales_term}}
          </div>
          <div class="col-show show-status">
            {{sales.show_sales_status}}
          </div>
        </div>
        <div class="row-show">
          <div class="col-show show-desc">
            {{sales.sales_explanation}}
          </div>
          <div class="col-show show-button">
            <nuxt-link
              :to="{name: rsRouter.SELECT_TICKET_NAME, params: {client_id: clientId}, query: {show_group_id: showGroupId, show_no: sales.show_no, sales_no: sales.sales_no}}"
              v-if="sales.select_button_disp_flg && sales.select_button_disp_flg == constant.BUTTON_SELECT_SHOW
                    && sales.hall_seat_view_flg == constant.NO_SELECT_SEAT"
              class="rs-btn btn-green-dark btn-medium btn-go">{{$t('show.btn_select')}}
            </nuxt-link>
            <nuxt-link
              :to="{name: rsRouter.SELECT_SEAT_NAME, params: {client_id: clientId}, query: {show_group_id: showGroupId, show_no: sales.show_no, sales_no: sales.sales_no}}"
              v-else-if="sales.select_button_disp_flg && sales.select_button_disp_flg == constant.BUTTON_SELECT_SHOW
                   && sales.hall_seat_view_flg == constant.WITH_SELECT_SEAT"
              class="rs-btn btn-green-dark btn-medium btn-go">{{$t('show.btn_select')}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- End Show Accept Item -->
  </div>
  <!-- ## End Show Item -->
</template>

<script>
  export default {
    name: "ItemShowSchedule",
    props: [
      'clientId',
      'showGroupId',
      'schedule',
      'seeExpired',
      'rsRouter',
      'constant'
    ]
  }
</script>

<style lang="scss" scoped>
  @import "assets/scss/show"
</style>
