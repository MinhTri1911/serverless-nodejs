<template>
  <div class="container">
    <div class="login-head">
      {{ $t('common.footer.spec') }}
    </div>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script src="@@/business/spec/SpecBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/spec/spec";
</style>
