<template>
  <!-- FOOTER -->
  <div id="mainFooter">
    <div class="containerFooter">
      <div id="Footer">
        <ul id="FooterMenu">
          <li><nuxt-link :to="{name: 'client_id-privacy' }">{{ $t('common.footer.privacy') }}</nuxt-link></li>
          <li><nuxt-link :to="{name: 'client_id-kiyaku' }">{{ $t('common.footer.kiyaku') }}</nuxt-link></li>
          <li><nuxt-link :to="{name: 'client_id-law' }">{{ $t('common.footer.law') }}</nuxt-link></li>   
          <li><nuxt-link :to="{name: 'client_id-spec' }">{{ $t('common.footer.spec') }}</nuxt-link></li>
        </ul>
        <p> {{ $t('common.footer.title') }}</p>
      </div>
    </div>
  </div>
  <!-- FOOTER end -->
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle
  }
};
</script>


