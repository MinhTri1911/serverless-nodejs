<template>
  <div class="page-41x">
    <div class="box-error">
      <div class="box-icon">
        <i class="fas fa-bolt"></i>
      </div>
      <h2 class="box-title">Error Validate</h2>
      <div class="box-content">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Page41x",
    props: ['statusCode', 'message']
  }
</script>

<style lang="scss" scoped>
  @import "assets/scss/error"
</style>
