<template>
  <!-- ## Begin Show Item -->
  <div class="show-item" v-if="show.show_group_disp_kb != 1" :id="'show_item_'+show.show_group_id">
    <!-- Begin Show Top Item -->
    <div class="show-top clearfix">
      <div class="col-show show-main-tt">
        <span class="ico-cart"><i class="fas fa-shopping-cart"></i></span>
        {{ show.show_group_main_title }}
        <span class="slot-seat" v-if="show.seat_selection_flg == 1">{{$t('show.lbl_able_seat')}}</span>
      </div>
      <div class="col-show show-date">
        {{ show.show_term }}
      </div>
      <div class="col-show show-type">
        {{ show.genre_nm }}
      </div>
      <div class="col-show show-status">
        {{ show.show_group_sales_status }}
      </div>
    </div>
    <!-- End Show Top -->
    <!-- Begin Show Body Item-->
    <div class="show-body clearfix">
      <div class="col-show">
        <div class="rs-image no-image">
          <img class="img-load" @error="loadImage" :src="imageMainUrl(show.client_id, show.show_group_id)" alt="">
        </div>
      </div>
      <div class="col-show show-desc">
        {{ show.list_explanation }}
      </div>
      <div class="col-show fl-right">
        <nuxt-link
          :to="{name: rRoute.SHOW_SCHEDULE_LIST, params: {client_id: clientId, show_group_id: show.show_group_id},
                    query: searching ? {searching: true}: null}"
          class="rs-btn btn-green-dark btn-medium btn-go"
          v-if="show.select_button_disp_flg && show.select_button_disp_flg == constant.BUTTON_SELECT_SHOW">
          {{$t('show.btn_select')}}
        </nuxt-link>
      </div>
    </div>
    <!-- End Show Body Item -->
  </div>
  <!-- ## End Show Item -->
  <!-- ## Begin Show Item -->
  <div class="show-item" v-else :id="'show_item_'+show.show_group_id">
    <!-- Begin Show Top Item -->
    <div class="show-top clearfix">
      <div class="col-show show-main-tt">
        {{ show.show_group_main_title }}
      </div>
      <div class="col-show show-hall">
        {{ show.hall_nm }}
      </div>
      <div class="col-show show-date">
        {{ show.show_term }}
      </div>
      <div class="col-show show-type">
        {{ show.genre_nm }}
      </div>
    </div>
    <!-- End Show Top -->
    <!-- Begin Show Body Item-->
    <div class="show-body clearfix">
      <div class="col-show">
        <div class="rs-image no-image">
          <img class="img-load" @error="loadImage" :src="imageMainUrl(show.client_id, show.show_group_id)" alt="">
        </div>
      </div>
      <div class="col-show show-desc">
        {{ show.list_explanation }}
      </div>
    </div>
    <!-- End Show Body Item -->
    <!-- Begin Show Accept Item -->
    <div class="show-accept clearfix" v-if="show.sales_list && show.sales_list.length > 0">
      <div class="show-accept-item clearfix" v-for="(show_sales, index_i) in show.sales_list" :key="index_i">
        <div class="row-show">
          <div class="col-show show-main-tt">
            <span><i class="fas fa-shopping-cart"></i></span> {{ show.sales_nm }}
            <span class="slot-seat" v-if="show_sales.seat_selection_flg == 1">{{$t('show.lbl_able_seat')}}</span>
          </div>
          <div class="col-show show-date">
            {{ show_sales.sales_term }}
          </div>
          <div class="col-show show-status">
            {{ show_sales.show_sales_status }}
          </div>
        </div>
        <div class="row-show">
          <div class="col-show show-desc">
            {{ show_sales.sales_explanation }}
          </div>
          <div class="col-show show-button fl-right">
            <nuxt-link
              :to="{name: rRoute.SELECT_TICKET_NAME, params: {client_id: clientId}, query: searching
                    ? {searching: true, show_group_id: show.show_group_id, show_no: show.show_no, sales_no:show.sales_no}
                    : {show_group_id: show.show_group_id, show_no: show.show_no, sales_no:show.sales_no}}"
              class="rs-btn btn-green-dark btn-medium btn-go"
              v-if="show.select_button_disp_flg && show.select_button_disp_flg == constant.BUTTON_SELECT_SHOW
                    && show.hall_seat_view_flg == constant.NO_SELECT_SEAT">
              {{$t('show.btn_select')}}
            </nuxt-link>
            <nuxt-link
              :to="{name: rRoute.SELECT_SEAT_NAME, params: {client_id: clientId}, query: searching
                        ? {searching: true, show_group_id: show.show_group_id, show_no: show.show_no, sales_no:show.sales_no}
                        : {show_group_id: show.show_group_id, show_no: show.show_no, sales_no:show.sales_no}}"
              class="rs-btn btn-green-dark btn-medium btn-go"
              v-if="show.select_button_disp_flg && show.select_button_disp_flg == constant.BUTTON_SELECT_SHOW
                    && show.hall_seat_view_flg == constant.WITH_SELECT_SEAT">
              {{$t('show.btn_select')}}
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
  import Config from '@/constant/config'
  import RRoute from '@/constant/router'
  import {get} from "@/plugins/api"

  export default {
    name: "ItemShow",
    props: ['show', 'constant', 'searching'],
    data() {
      return {
        rRoute: null
      }
    },
    computed: {
      clientId() {
        return this.$route.params.client_id
      }
    },
    created() {
      this.rRoute = RRoute
      // console.log(this.rRoute)
    },
    methods: {
      imageMainUrl: function (client_id, show_group_id) {
        return process.env.baseS3Url + Config.PATH_IMG_SHOW_MAIN.replace(':client_id', client_id).replace(':show_group_id', show_group_id)
      },
      loadImage(value) {
        $(this.$el).find('.img-load').remove()
        return false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "assets/scss/show"
</style>
