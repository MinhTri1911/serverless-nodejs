<template>
  <div id="MainC">
    <!-- Main Contents -->
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="PageTitle"> {{$t("cart.lb_cart")}}</span></h1>

      <div id="UpperContents" class="mb-3">
        <Breadcrumb :step="step"></Breadcrumb>
      </div>

      <div id="LowerContents">
        <!-- お知らせトップ -->
        <section id="InfoList">
          <p class="test-justify">
              {{$t("cart.lb_cart_exit.line1")}}
              <br>
              {{$t("cart.lb_cart_exit.line2")}}
          </p>
        </section>
        <!-- お知らせトップ end -->

        <ShowDetail v-for="tickets in cartDetailGroup" :key="tickets.seat_no" :tickets="tickets" :cartDetailGroup="cartDetailGroup"></ShowDetail>

        <TotalPayment></TotalPayment>

        <section class="mt-3">
          <div class="d-flex justify-content-between">
            <button class="btn rounded-0">
              {{$t("cart.btn_cont_booking")}}
            </button>
            <button class="btn rounded-0">
              {{$t("cart.btn_reset_cart")}}
            </button>
            <button class="btn rounded-0">
              {{$t("cart.btn_go_payment")}}
            </button>
          </div>
        </section>
      </div>
    </main>
    <!-- Main Contents end -->
  </div>
</template>

<script src="@/business/cart/CartBusiness.js"></script>
<style lang="scss" scoped>
  @import "./assets/scss/cart"
</style>

