<template lang="html">
  <div id="MainC" class="terms">
    <main id="ContentsPane">
      <div class="error" :style="validation ? 'display: block;' : ''">
        <div class="alert alert-danger" v-if="validation">
          {{ message }}
        </div>
      </div>

      <div class="accept-inf-link">
        <nuxt-link to="/about">{{ $t('terms.href_terms_of_use') }}</nuxt-link>
        <br/>
        <nuxt-link to="/about">{{ $t('terms.href_protect_per_inf') }}</nuxt-link>
      </div>
      <div class="accept-input">
        <input type="checkbox" id="cb-terms-use" v-model="termsUse">
        <label for="cb-terms-use">{{ $t('terms.cb_terms_of_use') }}</label><br>
        <input type="checkbox" id="cb-protect-per-inf" v-model="protectPerInf">
        <label for="cb-protect-per-inf">{{ $t('terms.cb_protect_per_inf') }}</label><br>
      </div>
      <div class="accept-action">
        <nuxt-link :to="pathToPageHome" class="btn rs-btn btn-large btn-green-dark block-left">{{ $t('terms.btn_no_accept') }}</nuxt-link>
        <button @click.prevent="goToPageRegister()" class="rs-btn btn-large btn-green-dark block-right">{{ $t('common.btn_next') }}</button>
      </div>
    </main>
  </div>
</template>

<script src="@@/business/terms/TermsBusiness.js">
</script>

<style lang="scss">
  @import "assets/scss/terms";
</style>
