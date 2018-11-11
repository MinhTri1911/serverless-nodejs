<template>
  <div id="MainC">
    <!-- Main Contents -->
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">ヘッダー</span></h1>

      <div id="UpperContents" class="mb-3">
        <Breadcrumb :step="step"></Breadcrumb>
      </div>

      <div id="LowerContents">
        <!-- お知らせトップ -->
        <section id="InfoList">
          <p class="test-justify">{{$t("cart.lbl_desc_cart")}}</p>
        </section>
        <!-- お知らせトップ end -->
        <ShowDetail v-for="(i, index) in [1,2]" :key="index" :type="type"></ShowDetail>

        <TotalPayment></TotalPayment>

        <ListFee></ListFee>

        <TotalPaymentAmount></TotalPaymentAmount>

        <PaymentType></PaymentType>

        <InfoReceive></InfoReceive>

        <section class="mt-3">
          <div class="d-flex justify-content-between">
            <button class="btn rounded-0">
              {{$t("cart.btn_back")}}
            </button>
            <button class="btn rounded-0">
              {{$t("cart.btn_confirm")}}
            </button>
          </div>
        </section>
      </div>
    </main>
    <!-- Main Contents end -->
  </div>
</template>

<script src="@/business/cart/CartConfirmBusiness.js"></script>
<style lang="scss" scoped>
  @import "./assets/scss/cart"
</style>

