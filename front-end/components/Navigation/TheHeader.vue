<template>
  <!-- HEADER -->
  <div id="HeadWrap">
    <header id="Header">
      <div class="head-top-row">
        <div class="HeaderLeft">
          <section id="Headlogo"><nuxt-link :to="{ name: 'client_id' }" ><img src="@/assets/images/headlogo.png" width="267" height="46" alt=""/></nuxt-link></section>
        </div>
        <div class="HeaderRight">
          <section id="Headsearch">
            <!-- 検索窓 -->
            <form action="" @submit.prevent="syncEventSearch" method="get">
              <input type="text" id="Headinput" :placeholder="$t('common.modal_search.lbl_key_placeholder')" name="q" v-model="keySearch">
              <button id="sbtn" type="submit"><i class="fa fa-search"></i></button>
            </form>
            <!-- /検索窓 -->
            <div id="soptxt"><a href="search/index.html" @click.prevent data-toggle="modal" data-target="#topHeaderSearch">{{ $t('common.links.search') }}&gt;&gt;</a></div>
          </section>
        </div>
      </div>
      <div class="head-top-row head-bottom">
        <div class="HeaderLeft">
          <a href="#">Kawaiさん</a>
        </div>
        <div class="HeaderRight">
          <nav id="Headmenupre">
            <ul id="TmenuGR">
              <li class="tmenu"><a href="#">{{ $t('common.links.help') }}</a></li>
              <li class="tmenu"><a href="#">{{ $t('common.links.list_show') }}</a></li>
              <li v-if="false"  class="tmenu"><a href="#">&nbsp;{{ $t('common.links.cart') }}</a></li>
              <li v-if="false"  class="tmenu"><a href="#">&nbsp;{{ $t('common.links.my_page') }}</a></li>
              <li  class="tmenu"><a href="#">{{ $t('common.links.register') }}</a></li>
              <li class="tlogin" v-if="!this.$store.state.auth.authenticated">
              <nuxt-link :to="{name: 'client_id-login' }">{{ $t('common.links.login') }}</nuxt-link>
            </li>
            <li class="tlogin" v-if="this.$store.state.auth.authenticated"  @click="logout()" >

              <a href=""><i class="fas fa-power-off"></i>{{ $t('login.lb_logout') }}</a>
            </li>
              <li class="tmenu"><a href="#">{{$t('common.links.faq') }}</a></li>
            </ul>
          </nav>
        </div>

      </div>
      <!--<div id="HeaderLeft">-->
        <!--<section id="Headlogo"><nuxt-link :to="{ name: 'client_id' }" ><img src="@/assets/images/headlogo.png" width="267" height="46" alt=""/></nuxt-link></section>-->
      <!--</div>-->
      <!--<div id="HeaderRight">-->
        <!--<section id="Headsearch">-->
          <!--&lt;!&ndash; 検索窓 &ndash;&gt;-->
          <!--<form action="" @submit.prevent="syncEventSearch" method="get">-->
            <!--<input type="text" id="Headinput" :placeholder="$t('common.modal_search.lbl_key_placeholder')" name="q" v-model="keySearch">-->
            <!--<button id="sbtn" type="submit"><i class="fas fa-search"></i>S</button>-->
          <!--</form>-->
          <!--&lt;!&ndash; /検索窓 &ndash;&gt;-->
          <!--<div id="soptxt"><a href="search/index.html" @click.prevent data-toggle="modal" data-target="#topHeaderSearch">{{ $t('common.links.search') }}&gt;&gt;</a></div>-->
        <!--</section>-->
        <!--<nav id="Headmenupre">-->
          <!--<ul id="TmenuGR">-->
            <!--<li class="tmenu"><a href="#">{{ $t('common.links.help') }}</a></li>-->
            <!--<li class="tmenu"><a href="#">{{ $t('common.links.list_show') }}</a></li>-->
            <!--<li v-if="false"  class="tmenu"><a href="#">&nbsp;{{ $t('common.links.cart') }}</a></li>-->
            <!--<li v-if="false"  class="tmenu"><a href="#">&nbsp;{{ $t('common.links.my_page') }}</a></li>-->
            <!--<li  class="tmenu"><a href="#">{{ $t('common.links.register') }}</a></li>-->
            <!--<li class="tlogin"><nuxt-link :to="{name: 'client_id-login' }">&nbsp;{{ $t('common.links.login') }}</nuxt-link></li>-->
            <!--<li v-if="false"  class="tlogin"><a href="logout.html">&nbsp;{{ $t('common.links.logout') }}</a></li>-->
            <!--<li class="tmenu"><a href="#">{{$t('common.links.faq') }}</a></li>-->
          <!--</ul>-->
        <!--</nav>-->
      <!--</div>-->
    </header>
    <ModalSearchShow :keySearchM="keySearch" @update_keySearchM="keySearchChange"/>
  </div>
  <!-- HEADER end -->
</template>

<script>
import constant from '@/constant';
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
import ModalSearchShow from "@/components/Navigation/TheHeaderModalSearch"
import { mapState, mapMutations, mapActions} from "vuex"

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle,
    ModalSearchShow
  },
  data(){
    return {
      keySearch: this.$route.query.q,

      // Display login/logout - DucVN 2018-10-11
      isLogin: this.$store.state.auth.authenticated?true:false
    }
  },
  computed: {
  },
  mounted() {
    // this.$store.dispatch('show/resetSearch', this)
  },
  methods: {
    ...mapActions('show', ['startSearch']),
    // Add condition to url and redirect to list show
    syncEventSearch() {
      let keySearch = this.keySearch ? this.keySearch.trim() : null
      this.$router.push({path: `/${this.$route.params.client_id}`, query: { q: keySearch}})
      this.$store.dispatch('show/startSearch');
    },
    keySearchChange(value) {
      this.keySearch = value;
    },

     // Logout - DucVN - 2018-10-11
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>


