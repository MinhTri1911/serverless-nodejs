<template>
  <div class="page-404">
    <div class="box-error">
      <div class="box-icon">
        <i class="fab fa-searchengin"></i>
      </div>
      <h2 class="box-title">404 Not Found</h2>
      <div class="box-content">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Page404",
    props: ['statusCode', 'message']
  }
</script>

<style lang="scss" scoped>
  @import "assets/scss/error"
</style>
