<template>
  <div class="container">
    <div class="login-head">
      {{ $t('common.footer.law') }}
    </div>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script src="@@/business/law/LawBusiness.js"></script>
<style lang="scss" scoped>
  @import "assets/scss/law/law";
</style>
