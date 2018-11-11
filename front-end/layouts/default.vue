<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" v-if="!hasError"/>
    <nuxt/>
    <TheFooter v-if="!hasError" />
    <TheSidenav
            :show="displaySidenav"
            @close="displaySidenav = false" v-if="!hasError"/>
    <div class="page_top"><a href="#HeadWrap"><i class="fas fa-chevron-circle-up scrollup"></i></a></div>
  </div>

</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheFooter from '@/components/Navigation/TheFooter'
import TheSidenav from '@/components/Navigation/TheSidenav'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    TheHeader,
    TheFooter,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false
    }
  },
  created(){
    // Reset error when loading DOM
    this.$store.dispatch('error/resetError');
  },
  computed: {
    // When happened error, change status error to true
    // Hide header and footer of page
    ...mapGetters({
      hasError: 'error/getStatusError'
    })
  },
  watch: {
    '$route'(){
      // this.$store.dispatch('error/resetError');
    }
  }
}
$(function() {
    $('.menu-trigger, header #TmenuGR a').click(function(e){
        $('header').toggleClass('action');
        e.preventDefault();
    });

    $(document).on('click', function(evnt){
      if (!$(evnt.target).is(".menu-trigger") && !$(evnt.target).is(".menu-trigger *")){
        $('header').removeClass('action');
      }
    });
});

$(document).ready(function() {
    var pagetop = $('.page_top');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    pagetop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
});

</script>




