<template>
  <!-- FOOTER -->
  <div id="mainFooter">
    <div class="containerFooter">
      <div id="Footer">
        <ul id="FooterMenu">
          <li><nuxt-link :to="{name: routerNamePrivate }">{{ $t('common.footer.privacy') }}</nuxt-link></li>
          <li><nuxt-link :to="{name: routerNameKiyaku }">{{ $t('common.footer.kiyaku') }}</nuxt-link></li>
          <li><nuxt-link :to="{name: routerNameLaw }">{{ $t('common.footer.law') }}</nuxt-link></li>
          <li><nuxt-link :to="{name: routerNameSpec }">{{ $t('common.footer.spec') }}</nuxt-link></li>
        </ul>
        <p> {{ $t('common.footer.title') }}</p>
      </div>
    </div>
  </div>
  <!-- FOOTER end -->
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
import rsRouter from "@/constant/router";

export default {
  name: "TheHeader",
  data: () => ({
    routerNamePrivate: rsRouter.PRIVATE,
    routerNameKiyaku: rsRouter.KIYAKU,
    routerNameLaw: rsRouter.LAW,
    routerNameSpec: rsRouter.SPEC,
  }),
  components: {
    TheSideNavToggle
  },
  watch:{
    '$route'(to, from) {
      if (to.name != rsRouter.LISTPERFORM) {
        $('#mainFooter').removeClass('rs-fixed')
      }
    }
  }
};
</script>


