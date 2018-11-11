<template lang="html">
  <!-- Main Contents -->
  <div id="MainC">
    <!-- Main Contents -->
    <main id="ContentsPane">
      <div id="SingleContents">
        <div id="TicketContent">
          <!--Show detail-->
          <div v-for="(data, index) in dataBookingDetail">
            <section id="Infor-detail">
              <div class="collapse show info--paddingX pt-2">
                <div class="d-md-flex justify-content-md-between info border-bottom">
                  <div class="d-flex ">
                    <div class="info__title--medium">
                      {{ data.show_group_main_title }}
                    </div>
                  </div>
                </div>
                <div class="d-md-flex justify-content-md-between info border-bottom">
                  <div class="d-flex ">
                    <div class="info__title--medium">
                      {{ data.show_group_sub_title }}
                    </div>
                  </div>
                </div>
                <div class="d-md-flex justify-content-md-between info border-bottom">
                  <div class="d-flex width-content-50">
                    <div class="info__title--medium">
                      {{ data.genre_nm }}
                    </div>
                  </div>
                  <div class="d-flex width-content-50">
                    <div class="info__title--medium">
                      {{ data.sub_genre_nm }}
                    </div>
                  </div>
                </div>
                <div class="d-md-flex justify-content-md-between info">
                  <div class="d-flex width-content-33">
                    <div class="info__title--medium">
                      {{ data.show_date_disp_char }}
                    </div>
                  </div>
                  <div class="d-flex width-content-33">
                    <div class="info__title--medium">
                      {{ data.hall_nm }}
                    </div>
                  </div>
                  <div class="d-flex width-content-33">
                    <div class="info__title--medium">
                      {{ data.show_start_time }}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="Infor-detail-image">
              <div class="collapse show info--paddingX pt-2">
                <div class="d-md-flex justify-content-md-between info">
                  <div class="d-flex width-content-20">
                    <div class="info__title--medium">
                      <div class="rs-image no-image">
                        <img :src="imageMainUrl(data.client_id,data.show_group_id)" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="d-flex width-content-80">
                    <div class="info__title--medium" v-html='data.detail_explanation'>

                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="Info-detail-note">
              <div class="collapse show info--paddingX pt-2">
                <div class="d-md-flex justify-content-md-between info">
                  <div class="d-flex ">
                    <div class="info__title--medium" v-html='data.show_explanation'>

                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div class="btn-close">
              <button class="btn" @click="closeTabWindow()">
                {{ $t('booking_detail.btn_close') }}
              </button>
            </div>
          </div>
          <!--Show detail End-->
        </div>
      </div>
    </main>
    <!-- Main Contents end -->
  </div>
  <!-- Main Contents end -->
</template>
<script src="@/business/booking_detail/BookingDetailBusiness.js">
</script>

<style lang="scss">
  @import "./assets/scss/booking_detail";
</style>