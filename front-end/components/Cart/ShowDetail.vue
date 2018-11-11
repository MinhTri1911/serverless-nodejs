<template>
    <section class="border mb-3">
        <div class="d-flex justify-content-between p-2 bg-color-header mb-3">
            <h5 class="rs-title-block border-bottom-0">
                {{this.showName}} &nbsp {{this.showDate}}
            </h5>
            <button class="btn rounded-0 btn-booking" v-if="showGroup">
                {{$t("cart.btn_booking")}}
            </button>
        </div>
        <!--Loop sales term-->
        <div v-for="sale in saleList">
            <div class="border m-2 mb-3" v-if="designedSeat(sale).length >0">
                <h5 class="rs-title-block border-bottom-0">
                    {{sale}}
                </h5>
                <!-- Header -->
                <div class="d-flex justify-content-between m-2 mb-4">
                    <div class="d-flex bg-light justify-content-between align-items-center w-75 border">
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_seat_type")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_ticket_type")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_seat")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_price")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_price_discount")}}</div>
                    </div>
                    <button class="btn rounded-0">
                        {{$t("cart.btn_change")}}
                    </button>
                </div>

                <!-- End Header -->

                <!--List Item ticket -->
                <div class="d-flex justify-content-between m-2 border" v-for="seat in designedSeat(sale)">
                    <div class="d-flex justify-content-between align-items-center w-75">
                        <div class="text-center px-2 width-item-box col-md-2">{{seat.seat_type_nm}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{seat.ticket_type_nm}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{seatName(seat)}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{seat.standard_ticket_price}}</div>
                        <div class="text-center px-2 width-item-box text-danger col-md-2">{{salePrice(seat)}}</div>
                    </div>
                    <button class="btn rounded-0 m-2 btn-clear" @click="btnClearClick(seat)">
                        {{$t("cart.btn_cancel")}}
                    </button>
                </div>
                <!-- End List Item Ticket -->
            </div>

            <!--Free Seat-->
            <div class="border m-2 mb-3" v-if="freeSeat(sale).length >0">
                <h5 class="rs-title-block border-bottom-0">
                    {{sale}}
                </h5>
                <!-- Header -->
                <div class="d-flex justify-content-between m-2 mb-4">
                    <div class="d-flex bg-light justify-content-between align-items-center w-75 border">
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_seat_type")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_ticket_type")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_ticket_count")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_price")}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{$t("cart.lbl_price_discount")}}</div>
                    </div>
                    <button class="btn rounded-0">
                        {{$t("cart.btn_change")}}
                    </button>
                </div>

                <!-- End Header -->

                <!--List Item ticket -->
                <div class="d-flex justify-content-between m-2 border" v-for="seat in freeSeat(sale)">
                    <div class="d-flex justify-content-between align-items-center w-75">
                        <div class="text-center px-2 width-item-box col-md-2">{{seat.seat_type_nm}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{seat.ticket_type_nm}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{seat.ticket_count}}</div>
                        <div class="text-center px-2 width-item-box col-md-2">{{seat.standard_ticket_price}}</div>
                        <div class="text-center px-2 width-item-box text-danger col-md-2">{{salePrice(seat)}}</div>
                    </div>
                    <button class="btn rounded-0 m-2" @click="btnClearClick(seat)">
                        {{$t("cart.btn_cancel")}}
                    </button>
                </div>
                <!-- End List Item Ticket -->
            </div>
            <!--End Loop sales term -->
        </div>
        <!--Modal require validate-->
        <WarningModal :message="message"/>
        <DeleteSeatModal :message="message"/>
    </section>
</template>

<script>
import WarningModal from "@/components/Navigation/TheWarningModal"
import DeleteSeatModal from "@/components/Cart/TheDeleteSeatModal"
import constant from '@/constant/config';

export default {
  components: {
    WarningModal,
    DeleteSeatModal
  },
  props: [
    'tickets'
  ],
  data() {
    return {
      'message' : ''
    }
  },
  computed: {
    showGroup() {
      return this.tickets[0].show_group_disp_kb !=1;
    },
    showName() {
      return this.tickets[0].show_nm;
    },
    showDate() {
      return this.tickets[0].show_date_disp_char;
    },
    saleName() {
      return this.tickets[0].sales_nm;
    },
    saleList() {
      let result = this.tickets.map(ticket => ticket.sales_nm);
      // remove duplicate
      return result.filter(function (item, pos) {
        return result.indexOf(item) == pos;
      });
    },


  },
  methods: {
    seatName(seat) {
      let hall_view_flg = 0;
      let seat_type_kb = seat.seat_type_kb;
      let internet_seat_kb = seat.internet_seat_kb;
      let internet_seat_notice = seat.internet_seat_notice;
      let result = '';

      if (hall_view_flg == 0) {
        if (seat_type_kb == 1) {
          if (internet_seat_kb == 1) {
            result = seat.seat_nm;
          }
          if (internet_seat_kb == 2 || internet_seat_kb == 3) {
            if (internet_seat_notice == 0) {
              result = this.$t("cart.lb_info_in_ticket");
            }
            if (internet_seat_notice == 1) {
              result = this.$t("cart.lb_info_after_book");
            }
            if (internet_seat_notice == 2) {
              result = seat.seat_nm;
            }
          }
        }
      }
      return result;
    },
    salePrice(seat) {
      let price = '';
      if (seat.standard_ticket_price - seat.sales_price > 0) {

        price = seat.sales_price;
      }
      return price;
    },
    designedSeat(saleName) {
      let filter = this.tickets.filter(function (ticket) {

        return ticket.seat_type_kb == constant.SEAT_DESIGNATED
          && ticket.sales_nm == saleName;
      });
      return filter;
    },
    freeSeat(saleName) {
      let filter = this.tickets.filter(function (ticket) {
        return ticket.seat_type_kb == constant.SEAT_FREE
          && ticket.sales_nm == saleName;
      });
      return filter;
    },
    btnClearClick(seat) {
      console.log(Object.values(seat) );

      if(seat.unit_flg ==1) {
        this.message = this.$t("message.msg059_cancel_pair_ticket");
        $('#theWarningModal').modal('show');
      }else{

        this.message = this.$t("message.msg057_cancel_seat",{seattype : 1,tickettype:2,seatname:3});
        console.log(this.message );
        $('#TheDeleteSeatModal').modal('show');
      }
    }
  }
}
</script>

<style scoped>
    .bg-color-header {
        background-color: #cecebf;
    }
</style>