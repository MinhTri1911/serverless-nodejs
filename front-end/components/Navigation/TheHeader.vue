<template>
  <!-- HEADER -->
  <div id="HeadWrap">
    <header id="Header">
      <div id="HeaderLeft">
        <section id="Headlogo"><nuxt-link to="/"><img src="@/assets/images/headlogo.png" width="267" height="46" alt=""/></nuxt-link></section>
      </div>
      <div id="HeaderRight">
        <section id="Headsearch">
          <!-- 検索窓 -->
          <form action="">
            <input type="text" id="Headinput" placeholder="公演名・アーティスト名で検索">
            <button id="sbtn" type="submit"><i class="fas fa-search"></i></button>
          </form>
          <!-- /検索窓 -->
          <div id="soptxt"><a href="search/index.html">{{ $t('common.links.search') }}&gt;&gt;</a></div>
        </section>
        <nav id="Headmenupre">
          <ul id="TmenuGR">
            <li class="tmenu"><a href="#">{{ $t('common.links.help') }}</a></li>
            <li class="tmenu"><a href="#">{{ $t('common.links.list_show') }}</a></li>
            <li v-if="false"  class="tmenu"><a href="#">&nbsp;{{ $t('common.links.cart') }}</a></li>
            <li v-if="false"  class="tmenu"><a href="#">&nbsp;{{ $t('common.links.my_page') }}</a></li>
            <li  class="tmenu"><a href="#">{{ $t('common.links.register') }}</a></li>
            <li class="tlogin"><nuxt-link to="/login">&nbsp;{{ $t('common.links.login') }}</nuxt-link></li>
            <li v-if="false"  class="tlogin"><a href="logout.html">&nbsp;{{ $t('common.links.logout') }}</a></li>
            <li class="tmenu"><a href="#">{{$t('common.links.faq') }}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
  <!-- HEADER end -->
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


