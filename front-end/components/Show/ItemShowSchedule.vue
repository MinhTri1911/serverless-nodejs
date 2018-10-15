<template>
  <!-- ## Begin Show Item -->
  <div class="show-item sub-item schedule" :id="'show_item_'">
    <!-- Begin Show Top Item -->
    <div class="show-top clearfix">
      <div class="row-show">
        <div class="col-show">
          Tên công diễn
        </div>
        <div class="col-show">
          Ngày công diễn
        </div>
        <div class="col-show">
          Hội trường
        </div>
      </div>
      <div class="row-show">
        <div class="col-show show-main-tt">
          Mô tả thời gian công diễn
        </div>
      </div>
    </div>
    <!-- End Show Top -->
    <!-- Begin Show Accept Item -->
    <div class="show-accept clearfix" >
      <div class="show-accept-item clearfix">
        <div class="row-show">
          <div class="col-show show-main-tt">
            <span><i class="fas fa-shopping-cart"></i></span> Tên thời hạn tiếp nhận
            <span class="slot-seat">{{$t('show.lbl_able_seat')}}</span>
          </div>
          <div class="col-show show-date">
            Thời hạn tiếp nhận
          </div>
          <div class="col-show show-status">
            Tình trạng tiếp nhận
          </div>
        </div>
        <div class="row-show">
          <div class="col-show show-desc">
            Đây là mô tả thời hạn tiếp nhận
          </div>
          <div class="col-show show-button">
            <nuxt-link
              :to="{name: 'fasf', params: {client_id: clientId}, query: {show_group_id: 'ewry', show_no: 'wery', sales_no: 'ywery'}}"
              class="rs-btn btn-green-dark btn-medium">{{$t('show.btn_select')}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- End Show Accept Item -->
    <!-- Begin Show Accept Item -->
    <div class="show-accept clearfix" >
      <div class="show-accept-item clearfix">
        <div class="row-show">
          <div class="col-show show-main-tt">
            <span><i class="fas fa-shopping-cart"></i></span> Tên thời hạn tiếp nhận
            <span class="slot-seat">{{$t('show.lbl_able_seat')}}</span>
          </div>
          <div class="col-show show-date">
            Thời hạn tiếp nhận
          </div>
          <div class="col-show show-status">
            Tình trạng tiếp nhận
          </div>
        </div>
        <div class="row-show">
          <div class="col-show show-desc">
            Đây là mô tả thời hạn tiếp nhận
          </div>
          <div class="col-show show-button">
            <nuxt-link
              :to="{name: 'fasf', params: {client_id: clientId}, query: {show_group_id: 'ewry', show_no: 'wery', sales_no: 'ywery'}}"
              class="rs-btn btn-green-dark btn-medium">{{$t('show.btn_select')}}
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
    props:[
      'clientId'
    ]
  }
</script>

<style scoped>

</style>
