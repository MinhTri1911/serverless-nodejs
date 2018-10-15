<template>
  <!-- HEADER -->
  <div id="HeadWrap">
    <header id="Header">
      <div class="head-top-row">
        <div class="HeaderLeft">
          <section id="Headlogo">
            <nuxt-link :to="{ name: 'client_id' }" >
              <img src="@/assets/images/headlogo.png" width="267" height="46" alt=""/>
            </nuxt-link>
          </section>
        </div>
        <div class="HeaderRight">
          <section id="Headsearch">
            <!-- 検索窓 -->
            <form action="" @submit.prevent="syncEventSearch" method="get">
              <input type="text" id="Headinput" :placeholder="$t('common.modal_search.lbl_key_placeholder')" name="q" v-model="keySearch">
              <button id="sbtn" type="submit"><i class="fa fa-search"></i></button>
            </form>
            <!-- /検索窓 -->
            <div id="soptxt">
              <a href="search/index.html" @click.prevent data-toggle="modal" data-target="#topHeaderSearch">
                {{ $t('common.links.search') }}
              </a>
            </div>
          </section>
        </div>
      </div>
      <div class="head-top-row head-bottom">
        <div class="HeaderLeft">
          <a href="javascript:void(0)">{{this.getName}}{{member}}</a>
        </div>
        <div class="HeaderRight">
          <nav id="Headmenupre">
            <ul id="TmenuGR">
              <li class="tmenu"><a href="#">{{ $t('common.links.help') }}</a></li>
              <li class="tmenu"><a href="#">{{ $t('common.links.list_show') }}</a></li>
              <li v-if="false" class="tmenu"><a href="#">{{ $t('common.links.cart') }}</a></li>
              <li v-if="false" class="tmenu"><a href="#">{{ $t('common.links.my_page') }}</a></li>
              <li  class="tmenu">
                <nuxt-link :to="pathToTerms">{{ $t('common.links.register') }}</nuxt-link>
              </li>
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
    </header>
    <ModalSearchShow :keySearchM="keySearch" @update_keySearchM="keySearchChange"/>
  </div>
  <!-- HEADER end -->
</template>

<script>
import constant from '@/constant';
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
import ModalSearchShow from "@/components/Navigation/TheHeaderModalSearch"
import { mapActions,mapGetters} from "vuex"
import route from "@/constant/router"


export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle,
    ModalSearchShow
  },
  data(){
    return {
      keySearch: this.$route.query.q,
      name:'' ,
      member: this.$store.state.auth.user.member_kb_nm?'の' + this.$store.state.auth.user.member_kb_nm:'',
      // Display login-logout - DucVN 2018-10-11
      isLogin: !!this.$store.state.auth.authenticated,
      pathToTerms: {
        name: constant.router.TERMS,
        params: { client_id: this.$route.params.client_id }
      }
    }
  },
  created() {
  },
  computed: {...mapGetters({
      getName: 'auth/getName'
    }),
    checkName(){
      return this.$store.state.auth.user.name ? this.$store.state.auth.user.name : null
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions('show', ['startSearch']),
    // Add condition to url and redirect to list show
    syncEventSearch() {
      let keySearch = this.keySearch ? this.keySearch.trim() : null;
      this.$router.push({path: `/${this.$route.params.client_id}`, query: { q: keySearch }});
      this.$store.dispatch('show/startSearch');
    },

    keySearchChange(value) {
      this.keySearch = value;
    },

    // Logout - DucVN - 2018-10-11
    logout() {
      this.$store.dispatch('auth/logout', {
        client_id: this.$route.params.client_id,
        member_id:  this.$store.state.auth.user.member_id
      });
    },
    displayUsername() {
      if (this.$store.state.auth.user.name) {
        let checkName = this.$store.state.auth.user.name;
        if(checkName.length<11) {
          this.name = this.$store.state.auth.user.name + '様';
        } else {
          this.name = checkName.substring(1, 10) + '様';
        }
      }
    }
  },
  watch: {
    '$route'(){
      if (this.$route.name != route.LISTPERFORM) {
        this.keySearch = ''
      }
    }
  }
};
</script>


