<template>
  <div id="MainC" class="show-list-page show-schedule">
    <!-- Main Contents -->
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{$t('show.title_schedule')}}</span></h1>
      <div id="LowerContents">
        <!-- 公演一覧トップリスト -->
        <section id="EventList">
          <!-- 公演一覧テーブル -->
          <div id="eventListWrap" class="show-list">
            <ItemShowScheduleMain/>
            <div class="mid-page">
              <input type="checkbox" id="chk-allow-expired"><label for="chk-allow-expired" class="rs-label">{{$t('show.lbl_allow_expired')}}</label>
            </div>
            <ItemShowSchedule v-bind:clientId = "clientId"/>
          </div>
          <!-- 公演一覧テーブルend -->
        </section>
        <!-- 公演一覧トップリスト end -->
      </div>
    </main>
    <!-- Main Contents end -->
  </div>
</template>
<script src="@/business/show/ListShowScheduleBusiness.js"></script>
<style lang="scss">
  @import "./assets/scss/show"
</style>
