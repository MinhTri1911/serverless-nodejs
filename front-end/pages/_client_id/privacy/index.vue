<template>
  <div class="container">
    <div class="login-head">
      {{ $t('common.footer.privacy') }}
    </div>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script src="@@/business/privacy/PrivacyBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/privacy/privacy";
</style>
