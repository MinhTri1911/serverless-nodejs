<template>
    <section id="Notice1" class="d-flex w-100">

        <div class="info--paddingX">

            <!--TODO: check login in common , member exp-->
            <div v-if="!isLogin"> {{$t("booking.lb_require_login")}}</div>
            <div v-if="haveSeleteSeat && !haveFreeSeat"> {{$t("booking.lb_warning_select_only.line_1")}} <br>
                {{$t("booking.lb_warning_select_only.line_2")}}
            </div>
            <div v-if="!haveSeleteSeat && haveFreeSeat"> {{$t("booking.lb_warning_free_only")}}</div>
            <div v-if="haveSeleteSeat && haveFreeSeat"> {{$t("booking.lb_warning_both_seat_type")}}</div>
            <div v-if="isLogin"> {{$t("booking.lb_warning_common_1")}}</div>
            <div v-if="!isLogin"> {{$t("booking.lb_warning_common_2.line_1")}} <br>
                {{$t("booking.lb_warning_common_2.line_2")}}
            </div>
        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Warning",
  props: ['seats'],
  computed: {
    ...mapGetters({
      isLogin: 'auth/isLogin'
    }),
    haveFreeSeat: function () {
      let result = false;
      $.each(this.seats, function (seatName, seatInfo) {
        if (seatInfo.seat_kind == 1) {
          result = true;
          return true;
        }
      });

      return result;
    },
    haveSeleteSeat: function () {
      let result = false;
      $.each(this.seats, function (seatName, seatInfo) {
        if (seatInfo.seat_kind == 2) {
          result = true;
          return true;
        }
      });
      return result;
    }
  }
}
</script>

<style scoped>

</style>