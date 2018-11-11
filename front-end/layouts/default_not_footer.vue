<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <nuxt/>
  </div>

</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader';

export default {

  components: {
    TheHeader
  },
  data() {
    return {
      displaySidenav: false
    }
  }
}
$(function() {
    $('.menu-trigger').click(function(){
        $('header').toggleClass('action');
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




