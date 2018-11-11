<template>
  <div class="page-error">
    <div class="box-error">
      <div class="box-icon">
        <i class="fa fa-info"></i>
      </div>
      <h2 class="box-title">Error</h2>
      <div class="box-content">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PageError",
    props: ['statusCode', 'message']
  }
</script>

<style lang="scss" scoped>
  @import "assets/scss/error"
</style>

