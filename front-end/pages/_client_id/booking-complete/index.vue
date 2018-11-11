<template>
  <div id="MainC" class="booking-complete">
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('booking.title_booking_complete') }}</span></h1>
      <div id="LowerContents">
        <div class="booking-alert">
          <p class="mb-2">{{appendBookingCode($t('message.msg070_booking_complete.msg_alert'), bookingCodeStore)}}</p>
          <p class="mb-4">{{$t('message.msg070_booking_complete.msg_suggest')}}</p>
        </div>
        <div class="mid-page">
          <button class="rs-btn btn-green-dark" @click.prevent="goToHome()">{{$t('common.btn_back_show')}}</button>
        </div>
        <div class="card-info">
          <ClientInfo :clientInfo="clientInfo"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="@@/business/booking/BookingCompleteBusiness.js"></script>

<style lang="scss" scoped>
  @import "assets/scss/booking_complete";
</style>

