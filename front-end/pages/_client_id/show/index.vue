<template>
  <div id="MainC">
    <!-- Main Contents -->
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">公演一覧</span></h1>
      <div id="UpperContents">
        <!-- お知らせトップ -->
        <section id="InfoList">
          <h2 class="rs-title-main">お知らせ</h2>
          <ItemNotify/>
          <p class="goto"><a href="information/index.html">お知らせ一覧へ&gt;&gt;</a></p>
        </section>
        <!-- お知らせトップ end -->
      </div>

      <div id="LowerContents">
        <!-- 公演一覧トップリスト -->
        <section id="EventList">
          <h2 class="rs-title-main">公演一覧</h2>
          <!-- 公演一覧テーブル -->
          <div id="eventListWrap" class="show-list">
            <ItemShow v-for="show in shows" v-bind:show="show" v-bind:key="show.id"/>
          </div>
          <!-- 公演一覧テーブルend -->
        </section>
        <!-- 公演一覧トップリスト end -->
      </div>
    </main>
    <!-- Main Contents end -->
  </div>
</template>
<script src="@/business/show/ListShowBusiness.js"></script>
<style lang="scss" scoped>
  @import "./assets/scss/show"
</style>

