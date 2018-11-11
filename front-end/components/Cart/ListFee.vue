<template>
  <section class="border mt-3 pb-2">
    <div class="d-flex p-1 bg-light border m-3 mb-4">
      <div class="w-50 ml-2">
        <span>
          {{$t("cart.lbl_name_fee")}}
        </span>
      </div>
      <div class="w-50 ml-2">
        <span>
          {{$t("cart.lbl_price_fee")}}
        </span>
      </div>
    </div>
    <FeeDetail v-for="(i, index) in [1,2]" :key="index"></FeeDetail>
  </section>
</template>

<script>
  import FeeDetail from "@/components/Cart/FeeDetail";

  export default {
    components: {
      FeeDetail
    }
  }

</script>

<style scoped>

</style>
