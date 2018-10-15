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
      <div class="col-show show status">
        {{ show.show_group_sales_status }}
      </div>
    </div>
    <!-- End Show Top -->
    <!-- Begin Show Body Item-->
    <div class="show-body clearfix">
      <div class="col-show">
        <div class="rs-image no-image">
          <img class="img-load" :src="imageMainUrl(show.client_id, show.show_group_id)" alt="">
        </div>
      </div>
      <div class="col-show">
        {{ show.list_explanation }}
      </div>
      <div class="col-show">
        <nuxt-link
          :to="{name: rRoute.SHOW_SCHEDULE_LIST, params: {client_id: clientId, show_group_id: show.show_group_id}}"
          class="rs-btn btn-green-dark btn-medium">{{$t('show.btn_select')}}
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
        </div>
      </div>
      <div class="col-show">
        {{ show.list_explanation }}
      </div>
    </div>
    <!-- End Show Body Item -->
    <!-- Begin Show Accept Item -->
    <div class="show-accept clearfix" v-if="show.list_sales && show.list_sales.length > 0">
      <div class="show-accept-item clearfix" v-for="(show_sales, index_i) in show.list_sales" :key="index_i">
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
          <div class="col-show show-button">
            <a class="rs-btn btn-green-dark btn-medium">
              <nuxt-link
                :to="{name: rRoute.SELECT_TICKET_NAME, params: {client_id: clientId}, query: {show_group_id: show.show_group_id, show_no: show.show_no, sales_no:show.sales_no}}"
                class="rs-btn btn-green-dark btn-medium">{{$t('show.btn_select')}}
              </nuxt-link>
            </a>
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
    props: ['show'],
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
      // $('.rs-image').addClass('loading')
      // $('.img-load').on('load', function(){
      //   $('.rs-image').removeClass('loading')
      // });
      this.rRoute = RRoute
      // console.log(this.rRoute)

    },
    methods: {
      imageMainUrl: function (client_id, show_group_id) {
        return process.env.baseS3Url + Config.PATH_IMG_SHOW_MAIN.replace(':client_id', client_id).replace(':show_group_id', show_group_id)
      }
    }
  }
</script>

