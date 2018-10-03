<template>
  <!-- ## Begin Show Item -->
  <div class="show-item" v-if="show.id % 2 != 0">
    <!-- Begin Show Top Item -->
    <div class="show-top clearfix">
      <div class="col-show show-main-tt">
        <span class="ico-cart"><i class="fas fa-shopping-cart"></i></span>
        {{ show.show_nm }}
        <span class="slot-seat">Chọn ghế</span>
      </div>
      <div class="col-show show-date">
        {{ show.show_date }}
      </div>
      <div class="col-show show-type">
        {{ show.show_group_id }}
      </div>
      <div class="col-show show status">
        Tình trạng tiếp nhận
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, repellendus.
      </div>
      <div class="col-show">
        <a href="#" class="rs-btn btn-green-dark btn-medium">
          Select
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
        {{ show.show_nm }}
      </div>
      <div class="col-show show-hall">
        Tên hội trường
      </div>
      <div class="col-show show-date">
        Thời hạn công diễn
      </div>
      <div class="col-show show-type">
        Thể loại
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, repellendus.
      </div>
    </div>
    <!-- End Show Body Item -->
    <!-- Begin Show Accept Item -->
    <div class="show-accept clearfix">
      <div class="show-accept-item clearfix">
          <div class="row-show">
            <div class="col-show show-main-tt">
              <span><i class="fas fa-shopping-cart"></i></span> Tên thời hạn tiếp nhận
              <span class="slot-seat">Chọn ghế</span>
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cupiditate debitis eum impedit iure laudantium placeat sunt totam voluptate voluptatum.
            </div>
            <div class="col-show show-button">
              <a class="rs-btn btn-green-dark btn-medium">
                Chọn
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
  export default {
    name: "ItemShow",
    props: ['show']
  }
</script>

