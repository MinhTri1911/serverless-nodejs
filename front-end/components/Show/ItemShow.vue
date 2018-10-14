<template>
  <!-- ## Begin Show Item -->
  <div class="show-item" v-if="show.show_group_disp_kb != 1">
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
        <div class="rs-image">
          <img class="img-load" :src="imageMainUrl(show.client_id, show.show_group_id)" alt="">
        </div>
      </div>
      <div class="col-show">
        {{ show.list_explanation }}
      </div>
      <div class="col-show">
        <a href="#" class="rs-btn btn-green-dark btn-medium">
          {{$t('show.btn_select')}}
        </a>
      </div>
    </div>
    <!-- End Show Body Item -->
  </div>
  <!-- ## End Show Item -->
  <!-- ## Begin Show Item -->
  <div class="show-item" v-else>
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
                {{$t('show.btn_select')}}
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
  import {get} from "@/plugins/api"
  export default {
    name: "ItemShow",
    props: ['show'],
    computed: {

    },
    mounted(){
      // $('.rs-image').addClass('loading')
      // $('.img-load').on('load', function(){
      //   $('.rs-image').removeClass('loading')
      // });
    },
    methods: {
      imageMainUrl: function(client_id, show_group_id){
        return process.env.baseS3Url + Config.PATH_IMG_SHOW_MAIN.replace(':client_id', client_id).replace(':show_group_id', show_group_id)
      }
    }
  }
</script>

