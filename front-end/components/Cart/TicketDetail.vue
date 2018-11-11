<template>
  <div class="d-flex justify-content-between m-2 border p-1">
    <div class="d-flex justify-content-between align-items-center w-75">
      <div class="text-center px-2 width-item-box">Loại ghế (ghế chỉ định)</div>
      <div class="text-center px-2 width-item-box">Loại vé</div>
      <div class="text-center px-2 width-item-box" v-if="type">Tên chỗ ngồi</div>
      <div class="text-center px-2 width-item-box" v-else>Số vé</div>
      <div class="text-center px-2 width-item-box">Giá</div>
      <div class="text-center px-2 width-item-box text-danger">Giá sau khi giảm giá</div>
    </div>
    <button v-if="hasButton" class="btn rounded-0 m-2">
      {{$t("cart.btn_cancel")}}
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: Boolean,
        default: true,
      },
      hasButton: {
        type: Boolean,
        default: true,
      }
    }
  }
</script>

<style scoped>
  .width-item-box {
    width: 20%;
  }
</style>
