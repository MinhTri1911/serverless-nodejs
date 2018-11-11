<template>
  <!-- HEADER -->
  <div id="HeadWrap">
    <header id="Header">
      <div class="head-top-row">
        <div :class="!isDetailBooking ? 'HeaderLeft' : 'HeaderCenter'">
          <section id="Headlogo">
            <nuxt-link @click.prevent.native="initHomePage" :to="{ name: routerNameListPerform }">
              <img src="@/assets/images/headlogo.png" width="267" height="46" alt=""/>
            </nuxt-link>
          </section>
        </div>
        <div class="HeaderRight" v-if="!isDetailBooking">
          <section id="Headsearch">
            <!-- 検索窓 -->
            <form action="" @submit.prevent="syncEventSearch" method="get">
              <input type="text" id="Headinput" :placeholder="$t('common.modal_search.lbl_key_placeholder')"
                     name="key_search" v-model="keySearch">
              <button id="sbtn" type="submit"><i class="fa fa-search"></i></button>
            </form>
            <!-- /検索窓 -->
            <div id="soptxt">
              <div @click.prevent data-toggle="modal" data-target="#topHeaderSearch" class="btn-search-detail">
                {{ $t('common.links.search') }}
              </div>
            </div>
          </section>
          <div v-if="this.$store.state.auth.admin_flag" class="AdminMode">
            <button v-if="this.$store.state.auth.admin_flag" class="btn btn-primary">管理者モード</button>&nbsp;
            <button @click="logoutAdmin()" v-if="this.$store.state.auth.admin_flag" class="btn btn-danger">管理者モード終了
            </button>
            <br>
            {{this.$store.state.auth.admin_time.date}} &nbsp;
            {{this.$store.state.auth.admin_time.hour}}:
            {{this.$store.state.auth.admin_time.minute}}'
          </div>
        </div>
      </div>

      <div class="head-top-row head-bottom">
        <div class="HeaderLeft" v-if="!isDetailBooking">
          <a href="javascript:void(0)" v-if="this.getName">
            {{$t('login.lb_display_name', { name: this.getName, member: this.getMember })}}
          </a>
        </div>
        <div class="HeaderRight" v-if="!isDetailBooking">
          <nav id="Headmenupre">
            <ul id="TmenuGR">
              <li class="tmenu">
                <nuxt-link class="i-menu" :to="{ name: routerNameGuide }"
                           :class="activeLink(routerNameGuide)">
                  {{ $t('common.links.guide') }}
                </nuxt-link>
              </li>
              <li class="tmenu">
                <nuxt-link class="i-menu" :to="{ name: routerNameListPerform }"
                           :class="activeLink(routerNameListPerform)">
                  {{ $t('common.links.list_show') }}
                </nuxt-link>
              </li>
              <li v-if="false" class="tmenu"><a href="#">{{ $t('common.links.cart') }}</a></li>
              <li class="tmenu">
                <nuxt-link class="i-menu" :class="activeLink(routerNameMyPage)"
                           v-if="this.$store.state.auth.authenticated"
                           :to="{ name: routerNameMyPage }">
                  <i class="fas fa-user-alt"></i>
                  {{ $t('common.links.my_page') }}
                </nuxt-link>
              </li>
              <li class="tmenu">
                <nuxt-link class="i-menu"
                           :class="activeLink(routerNameTerms)"
                           v-if="!this.$store.state.auth.authenticated"
                           :to="pathToTerms">
                  {{ $t('common.links.register') }}
                </nuxt-link>
              </li>
              <li class="tlogin">
                <nuxt-link class="i-menu" :class="activeLink(routerNameLogin)"
                           v-if="!this.$store.state.auth.authenticated"
                           :to="{ name: routerNameLogin }">
                  {{ $t('common.links.login') }}
                </nuxt-link>
              </li>
              <li class="tlogin" @click="logout()">
                <nuxt-link class="i-menu" v-if="this.$store.state.auth.authenticated"
                           :to="{ name: routerNameListPerform }">
                  <i class="fas fa-power-off"></i>
                  {{ $t('login.lb_logout') }}
                </nuxt-link>
              </li>
              <li class="tmenu cv-mobile">
                <div class="i-menu" data-toggle="modal" data-target="#topHeaderSearch">{{$t('common.links.search') }}
                </div>
              </li>
              <li class="tmenu">
                <nuxt-link class="i-menu" :to="{ name: routerNameFAQ }"
                           :class="activeLink(routerNameFAQ)">
                  {{$t('common.links.faq') }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <ModalSearchShow :searchInfo="searchInfo" :reset="reset" @update_reset="updateReset" :searching="searching"
                     :keySearchM="keySearch" @update_keySearchM="keySearchChange"/>
  </div>
  <!-- HEADER end -->
</template>

<script>
  import constant from '@/constant';
  import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
  import ModalSearchShow from "@/components/Navigation/TheHeaderModalSearch"
  import {mapActions, mapGetters} from "vuex"
  import route from "@/constant/router"

  export default {
    name: "TheHeader",
    components: {
      TheSideNavToggle,
      ModalSearchShow
    },
    data() {
      return {
        keySearch: this.$route.query.key_search ? this.$route.query.key_search : null,
        reset: false,
        name: '',
        member: '',
        // Display login-logout - DucVN 2018-10-11
        isLogin: !!this.$store.state.auth.authenticated,
        pathToTerms: {
          name: constant.router.TERMS,
          params: {client_id: this.$route.params.client_id}
        },
        routerNameMyPage: constant.router.MY_PAGE,
        routerNameTerms: constant.router.TERMS,
        routerNameLogin: constant.router.LOGIN_NAME,
        routerNameListPerform: constant.router.LISTPERFORM,
        routerNameGuide: constant.router.GUIDE,
        routerNameFAQ: constant.router.FAQ,
        isDetailBooking: false
      }
    },
    created() {
      let name = this.$route.name;
      this.isDetailBooking = this.$route.name === constant.router.BOOKING_DETAIL;
      this.$store.dispatch('show/initReloadSearch', this.$route);
    },
    beforeMount: function () {
      window.onbeforeunload = function () {
        localStorage.removeItem('tokenAdmin');
      };
    },
    computed: {
      ...mapGetters({
        getName: 'auth/getName',
        getMember: 'auth/getMember',
        searching: 'show/getSearching',
        searchInfo: 'show/getSearchInfo'
      }),
    },
    methods: {
      ...mapActions('show', ['startSearch']),

      // Add condition to url and redirect to list show
      syncEventSearch() {
        let keySearch = this.keySearch ? this.keySearch.trim() : null;
        this.$store.dispatch('show/addFormSearch', {key_search: keySearch});
        this.$store.dispatch('show/updateClickBtnSearch', true);
        this.reset = true;
        this.$router.push({name: route.LISTPERFORM, query: {key_search: keySearch}});
      },

      keySearchChange(value) {
        this.keySearch = value;
      },
      updateReset(value) {
        this.reset = value;
      },

      initHomePage() {
        this.keySearch = null;
        this.reset = true;
        this.$store.dispatch('show/reloadHomePage');
        this.$emit('update_reset', false);
      },
      // Logout - DucVN - 2018-10-11
      logout() {
        this.$router.push({name: 'client_id'});
        this.$store.dispatch('auth/logout', {
          client_id: this.$route.params.client_id,
          member_id: this.$store.state.auth.user.member_id
        });
      },
      // LogoutAdmin - DucVN - 2018-10-29
      logoutAdmin() {
        this.$router.push({name: 'client_id'});
        this.$store.dispatch('auth/logoutAdmin', {
          client_id: this.$route.params.client_id,
          member_id: this.$store.state.auth.admin.account_id
        });
      },

      /**
       * Function set class when access match link url
       *
       * @param {String} routerName
       * @return {String}
       */
      activeLink: function (routerName) {
        let path = this.$router.resolve({
          name: routerName,
          params: {client_id: this.$route.params.client_id}
        });

        return path.href === this.$route.path ? 'active-link' : '';
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.name != route.LISTPERFORM) {
          this.keySearch = '';
          this.$store.dispatch('show/changeStatusSearch', false);
        } else {
          if (this.searching) {
            this.keySearch = this.searchInfo.key_search ? this.searchInfo.key_search : null;
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .HeaderCenter {
    #Headlogo {
      width: auto;
      float: none;
      margin: auto;
      a {
        display: block;
        text-align: center;
      }
    }
  }
</style>
