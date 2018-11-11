<template>
  <div class="container">
    <div class="login-head">
      {{ $t('common.footer.kiyaku') }}
    </div>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script src="@@/business/kiyaku/KiyakuBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/kiyaku/kiyaku";
</style>
