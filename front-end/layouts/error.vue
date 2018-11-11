<template>
  <div class="error-page error-system">
    <div v-if="statusCode == 404">
      <Page404 :statusCode="statusCode" :message="message"/>
    </div>
    <div v-else-if="statusCode == 500">
      <Page500 :statusCode="statusCode" :message="message"/>
    </div>
    <div v-else-if="statusCode == 412 || statusCode == 402">
      <Page41x :statusCode="statusCode" :message="message"/>
    </div>
    <div v-else>
      <PageError :statusCode="statusCode" :message="message"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "assets/scss/error"
</style>
<script src="@@/business/error/ErrorSystemBusiness.js"></script>

