<template lang="html">
  <div id="MainC" class="register-step-2">
    <main id="ContentsPane">
      <h1 class="rs-title-pg"><span id="Pagetitle">{{ $t('register.lb_title_confirm_inf') }}</span></h1>

      <!-- Show text explain -->
      <div class="container">
        {{ $t('register.lb_confirm_input') }}
        <div class="block">
          <div class="msg-inline">
            {{ $t('message.msg019_explant_confirm_input.line_1') }}
          </div>
          <div class="msg-inline">
            {{ $t('message.msg019_explant_confirm_input.line_2') }}
            {{ $t('message.msg019_explant_confirm_input.line_3') }}
          </div>
        </div>
      </div>
      <!-- End show text explain -->

      <!-- Show infomation -->
      <div class="container">
        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_mail') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
             <label>{{ model.mail }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_full_name') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.fullName }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_furigana') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.furigana }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_phone_number') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.phoneNumber }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_cell_phone') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.cellPhone }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_zipcode') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.postCode1 }}-{{ model.postCode2 }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_city') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.slbCity }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_district') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.district }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_detail_address') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.address }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_building_room') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ model.buildingRoom }}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_birthday') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>
              {{ $t('register.lb_calendar') + ' ' + model.year + ' '
                + $t('register.lb_year') + ' ' + model.month + ' '
                + $t('register.lb_day') + ' ' + model.day
              }}
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_gender') }}</label>
          </div>
          <div class="col-md-6 flex-block lbl-content">
            <span class="between" v-if="model.gender == 'male'">{{ $t('register.lb_male') }}</span>
            <span class="between" v-if="model.gender == 'female'">{{ $t('register.lb_female') }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_password') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label>{{ $t('message.msg020_password_security') }}</label>
          </div>
        </div>

        <div class="row" v-if="model.flagShowMemberCode">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_member_code') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <label v-if="dataInit.memberInf">{{ dataInit.memberInf.member_id }}</label>
            <label class="ml-4" v-if="dataInit.memberInf">{{ dataInit.memberInf.member_kb_type_nm }}</label>
          </div>
        </div>

        <div class="row" v-if="model.flagShowMagazineMail">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_magazine_mail') }}</label>
          </div>
          <div class="col-md-6 flex-block lbl-content">
            <span class="between" v-if="model.magazineMail == 1">{{ $t('register.lb_get') }}</span>
            <span class="between"  v-if="model.magazineMail == 0">{{ $t('register.lb_not_get') }}</span>
          </div>
        </div>

        <div class="row" v-if="model.flagShowDirectMail">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_direct_mail') }}</label>
          </div>
          <div class="col-md-6 flex-block lbl-content">
            <span class="between" v-if="model.directMail == 1">{{ $t('register.lb_get') }}</span>
            <span class="between" v-if="model.directMail == 0">{{ $t('register.lb_not_get') }}</span>
          </div>
        </div>

        <div class="row" v-if="model.flagShowGenre">
          <div class="col-md-3 lbl-inf">
            <label>{{ $t('register.lb_favorite_genres') }}</label>
          </div>
          <div class="col-md-6 lbl-content">
            <div class="inline" v-for="line in dataInit.countLineGenre">
              <div class="inline" v-for="(genre, index) in dataInit.listGenre[line - 1]" :key="index">
                <label v-if="model.genre.find(e => e == genre.genre_no)" class="label-checkbox">{{ genre.genre_nm }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="block-action">
            <button class="rs-btn btn-large btn-green-dark block-left"
              data-toggle="modal" data-target="#confirm-stop-register" @click.prevent="backToPrevPage()">
              {{ $t('register.btn_edit') }}
            </button>
            <button @click.prevent="postRegister()" class="rs-btn btn-large btn-green-dark block-right">
              {{ $t('register.btn_register') }}
            </button>
          </div>
        </div>
      </div>
      <!-- End show infomation -->
    </main>
  </div>
</template>

<script src="@@/business/register/ConfirmBusiness.js">
</script>

<style lang="scss" scoped>
  @import "assets/scss/register";
</style>
