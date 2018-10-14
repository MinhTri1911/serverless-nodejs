<template>
  <!-- FOOTER -->
  <div id="mainFooter">
    <div class="containerFooter">
      <div id="Footer">
        <ul id="FooterMenu">
          <li><a href="privacy/index.html">個人情報保護方針</a></li>
          <li><a href="law/index.html">特定商取引法に基づく表示</a></li>
          <li><a href="kiyaku/index.html">利用規約</a></li>
          <li><a href="spec/index.html">動作環境</a></li>
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


