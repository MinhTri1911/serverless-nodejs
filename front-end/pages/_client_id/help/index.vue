<template>
  <div class="container">
    <div class="login-head">
      {{ $t('common.links.faq') }}
    </div>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script src="@@/business/help/HelpBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/help/help";
</style>
