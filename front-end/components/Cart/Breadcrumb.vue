<template>
  <section id="Breadcrumb">
    <ul class="breadcrumb bg-white w-100">
      <li v-bind:class="{active: step > 0}"><a href="#">{{$t("cart.lb_cart")}}</a></li>
      <li v-bind:class="{active: step > 1}"><a href="#">{{$t("cart.lb_choose_pay_type")}}</a></li>
      <li v-bind:class="{active: step > 2}"><a href="#">{{$t("cart.lb_confirm_detail")}}</a></li>
      <li v-bind:class="{active: step > 3}"><a href="#">{{$t("cart.lb_finish")}}</a></li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    props: ['step'],
  }
</script>

<style lang="scss" scoped>
  @import "./assets/scss/cart"
</style>