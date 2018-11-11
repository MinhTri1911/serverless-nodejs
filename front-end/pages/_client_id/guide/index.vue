<template>
  <div class="container">
    <div class="login-head">
      {{ $t('common.links.guide') }}
    </div>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script src="@@/business/guide/GuideBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/guide/guide";
</style>
