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
      </div>
    </header>
  </div>
  <!-- HEADER end -->
</template>

<script>
import constant from '@/constant';
import { mapActions,mapGetters} from "vuex"
import route from "@/constant/router"

export default {
  name: "TheHeaderOnlyLogo",
  components: {
  },
  data(){
    return {
      client_id: this.$route.params.client_id,
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
  },
  mounted() {

  },
  methods: {

  },
};
</script>


