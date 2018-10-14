<template>
  <div id="MainC" class="show-list-page">
    <!-- Main Contents -->
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{$t('show.title')}}</span></h1>
      <div id="UpperContents">
        <!-- お知らせトップ -->
        <section id="InfoList" v-if="notifyList && notifyList.length > 0">
          <h2 class="rs-title-main">{{$t('show.lbl_h_message')}}</h2>
          <NotifyList v-bind:notifyList = "notifyList" v-bind:notifyPage="notify_page" @page-changed="pageChanged"/>
        </section>
        <!-- お知らせトップ end -->
      </div>

      <div id="LowerContents">
        <div v-if="searching">{{ totalRecord ? $t('show.lbl_record_num', {'record': totalRecord}) : $t('show.lbl_record_zero')}}</div>
        <!-- 公演一覧トップリスト -->
        <section id="EventList">
          <h2 class="rs-title-main">{{$t('show.lbl_h_show')}}</h2>
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

    <!--<div id="MainC">-->
        <!--&lt;!&ndash; Main Contents &ndash;&gt;-->
        <!--<main id="ContentsPane">-->
            <!--<h1 class="rs-title-pg"><span id="Pagetitle">公演一覧</span></h1>-->

            <!--<div id="UpperContents">-->
                <!--&lt;!&ndash; お知らせトップ &ndash;&gt;-->
                <!--<section id="InfoList">-->
                    <!--<h2 class="rs-title-main">お知らせ</h2>-->
                    <!--<dl id="Info">-->
                        <!--<dt>2018.8.1</dt>-->
                        <!--<dd>-->
                            <!--<a href="#">{{ $t('common.home.title') }}</a>-->
                            <!--<span class="new">-->
                                <!--<img src="@/assets/images/icon_info_new.gif" alt="new" width="50" height="20">-->
                            <!--</span>-->
                        <!--</dd>-->
                        <!--<dt>2018.7.31</dt>-->
                        <!--<dd><a href="#">○○○○コンサートのアーティスト入院による公演延期のお知らせ。dev3</a></dd>-->
                        <!--<dt>2018.5.18</dt>-->
                        <!--<dd><a href="#">○○○○公演中止による払い戻しについて。ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</a>-->
                        <!--</dd>-->
                        <!--<dt>2018.3.20</dt>-->
                        <!--<dd><a href="#">○○○○コンサートのアーティスト入院による公演延期のお知らせ。</a></dd>-->
                        <!--<dt>2017.12.24</dt>-->
                        <!--<dd><a href="#">○○○○公演中止による払い戻しについて。</a></dd>-->
                    <!--</dl>-->
                    <!--<p class="goto"><a href="information/index.html">お知らせ一覧へ&gt;&gt;</a></p>-->
                <!--</section>-->
                <!--&lt;!&ndash; お知らせトップ end &ndash;&gt;-->
            <!--</div>-->

            <!--<div id="LowerContents">-->
                <!--&lt;!&ndash; 公演一覧トップリスト &ndash;&gt;-->
                <!--<section id="EventList">-->
                    <!--<h2 class="rs-title-main">公演一覧</h2>-->
                    <!--<Pagination :current-page="page.currentPage"-->
                                <!--:total-items="page.totalItems"-->
                                <!--:items-per-page="page.itemsPerPage"-->
                                <!--@page-changed="pageChanged">-->
                    <!--</Pagination>-->

                    <!--&lt;!&ndash;上部ページネーション end&ndash;&gt;-->

                    <!--&lt;!&ndash; 公演一覧テーブル &ndash;&gt;-->
                    <!--<div id="eventListWrap" v-if="postList.length >0">-->
                        <!--<PostHome :postList="postList"></PostHome>-->

                    <!--</div>-->
                    <!--<div  v-if="postList.length ==0">-->
                        <!--No result-->

                    <!--</div>-->
                    <!--&lt;!&ndash; 公演一覧テーブルend &ndash;&gt;-->

                    <!--&lt;!&ndash;下部ページネーション end&ndash;&gt;-->
                    <!--<Pagination :current-page="page.currentPage"-->
                                <!--:total-items="page.totalItems"-->
                                <!--:items-per-page="page.itemsPerPage"-->
                                <!--@page-changed="pageChanged">-->
                    <!--</Pagination>-->
                <!--</section>-->
                <!--&lt;!&ndash; 公演一覧トップリスト end &ndash;&gt;-->
            <!--</div>-->
        <!--</main>-->
        <!--&lt;!&ndash; Main Contents end &ndash;&gt;-->
    <!--</div>-->
</template>
<script src="@/business/show/ListShowBusiness.js"></script>
<style lang="scss">
  @import "./assets/scss/show"
</style>

