<template>
  <div id="MainC" class="show-list-page show-schedule">
    <!-- Main Contents -->
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{$t('show.title_schedule')}}</span></h1>
      <div id="LowerContents">
        <!-- 公演一覧トップリスト -->
        <section id="EventList">
          <!-- 公演一覧テーブル -->
          <div v-if="!loading">
            <div id="eventListWrap" class="show-list" v-if="schedule && schedule.schedule_list.length > 0">
              <ItemShowScheduleMain v-bind:schedule="schedule" v-bind:clientId="clientId" v-bind:showGroupId="showGroupId"/>
              <div class="mid-page">
                <input type="checkbox" id="chk-allow-expired" v-model="seeExpired"><label for="chk-allow-expired" class="rs-label">{{$t('show.lbl_allow_expired')}}</label>
              </div>
              <ItemShowSchedule v-for="(schedule, index) in schedule.schedule_list"
                                v-bind:key="index" v-bind:schedule="schedule" v-bind:clientId="clientId" v-bind:showGroupId="showGroupId"
                                v-bind:seeExpired="seeExpired" v-bind:rsRouter="rsRouter" v-bind:constant="constant"/>
            </div>
            <div id="eventListWrap" class="show-list" v-else>
              {{$t('message.msg_not_found_data')}}
            </div>
          </div>
          <div v-else>
            {{$t('common.lbl_loading')}}
          </div>
          <!-- 公演一覧テーブルend -->
          <!--Back to list show-->
          <div class="mid-page">
            <a href="javascript:void(0);" @click.prevent ="redirectToHome" class="rs-btn btn-green-dark btn-medium">{{$t('show.btn_back_list')}}</a>
          </div>
        </section>
        <!-- 公演一覧トップリスト end -->
      </div>
    </main>
    <!-- Main Contents end -->
  </div>
</template>
<script src="@/business/show/ListShowScheduleBusiness.js"></script>
<style lang="scss" scoped>
  @import "./assets/scss/show"
</style>
