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
          <a href="javascript:void(0)" v-if="this.getName">
            {{$t('login.lb_display_name', { name: this.getName, member: this.getMember })}}
          </a>
        </div>
        <div class="HeaderRight">
          <nav id="Headmenupre">
            <ul id="TmenuGR">
              <li class="tmenu"><nuxt-link :to="{name: 'client_id-guide' }">{{ $t('common.links.help') }}</nuxt-link></li>
              <li class="tmenu"><nuxt-link :to="{name: 'client_id' }">{{ $t('common.links.list_show') }}</nuxt-link></li>
              <li v-if="false" class="tmenu"><a href="#">{{ $t('common.links.cart') }}</a></li>
              <li  class="tmenu"><nuxt-link v-if="this.$store.state.auth.authenticated" :to="{name: 'client_id-my-page' }"><i class="fas fa-user-alt"></i> {{ $t('common.links.my_page') }}</nuxt-link></li>
              <li  class="tmenu">
                <nuxt-link v-if="!this.$store.state.auth.authenticated" :to="pathToTerms">{{ $t('common.links.register') }}</nuxt-link>
              </li>
              <li class="tlogin" >
                <nuxt-link v-if="!this.$store.state.auth.authenticated" :to="{name: 'client_id-login' }">{{ $t('common.links.login') }}</nuxt-link>
              </li>
              <li class="tlogin"   @click="logout()" >
                <nuxt-link  v-if="this.$store.state.auth.authenticated" :to="{name: 'client_id' }"><i class="fas fa-power-off"></i>{{ $t('login.lb_logout') }}</nuxt-link>
              </li>
              <li class="tmenu"><nuxt-link :to="{name: 'client_id-help' }">{{$t('common.links.faq') }}</nuxt-link></li>
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
      member: '',
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
  computed: {
    ...mapGetters({
      getName: 'auth/getName',
      getMember: 'auth/getMember',
    }),
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
      this.$router.push({name: 'client_id'});
      this.$store.dispatch('auth/logout', {
        client_id: this.$route.params.client_id,
        member_id: this.$store.state.auth.user.member_id
      });
    },
  },
};
</script>


