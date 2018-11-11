<template>
  <div class="show-item main-item schedule" >
    <!-- Begin Show Top Item -->
    <div class="show-top clearfix">
      <div class="row-show">
        <div class="col-show">
          <!-- Show main title of group show-->
          {{schedule.show_group_main_title}}
        </div>
        <div class="col-show">
          <!-- Show main title of group show-->
          {{schedule.genre_nm}}
        </div>
      </div>
      <div class="row-show">
        <div class="col-show">
          {{schedule.show_group_sub_title}}
        </div>
        <div class="col-show">
          {{schedule.sub_genre_nm}}
        </div>
      </div>
    </div>
    <!-- End Show Top -->
    <!-- Begin Show Body Item-->
    <div class="show-body clearfix">
      <div class="col-show">
        <div class="rs-image no-image">
          <img class="img-load" :src="imageMainUrl(clientId, showGroupId)" alt="">
        </div>
      </div>
      <div class="col-show">
        {{schedule.detail_explanation}}
      </div>
    </div>
    <!-- End Show Body Item -->
  </div>
</template>

<script>
  import Config from "@/constant/config"
  export default {
    name: "ItemShowScheduleMain",
    props: [
      "clientId",
      "schedule",
      "showGroupId"
    ],
    methods: {
      imageMainUrl: function (client_id, show_group_id) {
        return process.env.baseS3Url + Config.PATH_IMG_SHOW_MAIN.replace(':client_id', client_id).replace(':show_group_id', show_group_id)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "assets/scss/show"
</style>
