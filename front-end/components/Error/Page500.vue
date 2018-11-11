<template>
  <div class="page-500">
    <div class="box-error">
      <div class="box-icon">
        <i class="fa fa-info"></i>
      </div>
      <h2 class="box-title">500 Internal Server</h2>
      <div class="box-content">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Page500",
    props: ['statusCode', 'message']
  }
</script>

<style lang="scss" scoped>
  @import "assets/scss/error"
</style>
