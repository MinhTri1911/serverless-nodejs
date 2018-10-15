<template>
    <section id="Notice1" class="d-flex w-100">

        <div class="info--paddingX">

            <!--TODO: check login in common , member exp-->
            <p v-if="!isLogin"> {{$t("booking.lb_require_login")}}</p>
            <p v-if="haveSeleteSeat && !haveFreeSeat"> {{$t("booking.lb_warning_select_only.line_1")}} <br>
                {{$t("booking.lb_warning_select_only.line_2")}}
            </p>
            <p v-if="!haveSeleteSeat && haveFreeSeat"> {{$t("booking.lb_warning_free_only")}}</p>
            <p v-if="haveSeleteSeat && haveFreeSeat"> {{$t("booking.lb_warning_both_seat_type")}}</p>
            <p v-if="isLogin"> {{$t("booking.lb_warning_common_1")}}</p>
            <p v-if="!isLogin && this.dataTicket.sales_term !='' "> {{$t("booking.lb_warning_common_2.line_1")}} <br>
                {{$t("booking.lb_warning_common_2.line_2")}}
            </p>
        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import Config from "@/constant/config"

export default {
  name: "Warning",
  props: ['seats', 'dataTicket'],
  computed: {
    ...mapGetters({
      isLogin: 'auth/isLogin'
    }),
    haveFreeSeat: function () {
      let result = false;
      $.each(this.seats, function (seatName, seatInfo) {
        if (seatInfo.seat_type_kb == Config.SEAT_FREE) {
          result = true;
          return true;
        }
      });

      return result;
    },
    haveSeleteSeat: function () {
      let result = false;
      $.each(this.seats, function (seatName, seatInfo) {
        if (seatInfo.seat_type_kb == Config.SEAT_DESIGNATED) {
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