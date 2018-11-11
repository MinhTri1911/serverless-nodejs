<template>
    <div>
        <!--Diagram-->
        <section id="Diagram" class="w-100">
            <div class="d-flex">
                <h2 class="col mt-0 mb-0">
                    <a href="#DiagramDetail" data-toggle="collapse">

                    </a>
                </h2>
                <div class="info__button d-flex justify-content-center align-items-center mb-0">
                    <button id="panzoom-in" class="btn btn-primary mr-2">
                        <i class="fa fa-search-plus"></i>
                    </button>
                    <button id="panzoom-out" class="btn btn-primary mr-2">
                        <i class="fa fa-search-minus"></i>
                    </button>
                    <button id="panzoom-reset" class="btn btn-primary">
                        100%
                    </button>
                </div>
            </div>
            <div id="DiagramDetail" class="parent border mt-0 collapse show" style="min-height: 500px">
                <div class="panzoom w-100 h-100" style="overflow: hidden">
                    <div id="diagram_wrap"></div>
                    <!--<svg id="diagram" version="1.1"-->
                    <!--baseProfile="full"-->
                    <!--width="628" height="535"-->
                    <!--xmlns="http://www.w3.org/2000/svg"-->
                    <!--class="d-flex justify-content-center align-items-center"-->

                    <!--&gt;-->
                    <!---->
                    <!--</svg>-->

                </div>
            </div>
        </section>
        <!--Diagram End-->

        <!--BookTicket-->
        <section id="Book-Ticket">
            <div class="d-flex">
                <h2 class="col mb-0">
                    <a href="#BookTicketDetail" data-toggle="collapse">
                        {{ $t('booking.lb_reservation_information') }}
                    </a>
                </h2>
                <div class="d-md-flex d-none justify-content-center align-items-center info__button mb-0">

                    <button id="btn-cancel-all" type="button" class="btn btn-primary btn-cancel-all"
                            v-if="selectSeats.length >0" data-target="#theLoginModal">
                        {{ $t('booking.btn_cancel_all') }}
                    </button>

                </div>
            </div>
            <div id="BookTicketDetail" class="collapse show mt-3" v-if="selectSeats.length >0">
                <div class="d-flex justify-content-between mx-2 mb-3  p-3 row">
                    <div class="col-3">
                        {{ $t('booking.lb_seat_type') }}
                    </div>
                    <div class="col-3">
                        {{ $t('booking.lb_seat_info') }}
                    </div>
                    <div class="col-2">
                        {{ $t('booking.lb_seat_name') }}
                    </div>
                    <div class="col-2">
                        {{ $t('booking.lb_price') }}
                    </div>
                    <div class="col-2">
                        <button class="btn btn-primary py-0" style="visibility: hidden">
                            &nbsp
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-content-between mx-2 mb-3 border p-3"
                     v-for="(seat,seatSelectIndex) in myTickets"
                     v-if="isDesignatedSeat(seat)"
                >
                    <div class="col-3">
                        {{seat.seat_type_nm}}
                    </div>
                    <div class="col-3">

                        <select v-for="(seatInfo, seatInfoIndex) in seats"
                                v-if="seat.seat_type_no == seatInfo.seat_type_no "
                                @change="onChooseTicket(seat.seat_no ,$event.target )"
                                class="w-100">
                            <option v-bind:value="0" v-bind:data-ticket_price="0">{{$t('booking.lb_please_select')}}
                            </option>
                            <option v-for="(ticket, ticketIndex) in seatInfo.tickets"
                                    v-bind:value="ticket.ticket_type_no"
                                    v-bind:data-ticket_type_nm="ticket.ticket_type_nm"
                                    v-bind:data-ticket_type_no="ticket.ticket_type_no"
                                    v-bind:data-seat_type_no="seat.seat_type_no"
                                    v-bind:data-ticket_price="ticket.ticket_price"
                                    :selected=" ticket.ticket_type_no == seat.ticket_type_no"

                            >
                                {{ticket.ticket_type_nm }}
                            </option>
                        </select>

                    </div>
                    <div class="col-2">
                        {{seat.seat_nm}}
                    </div>
                    <div class="col-2">
                        {{seat.ticket_price}}円
                    </div>
                    <div class="col-2">
                        <button id="btn-cancel" class="btn btn-primary py-0 btn-cancel"
                                v-bind:data-seat_no="seat.seat_no">
                            {{ $t('booking.btn_cancel') }}
                        </button>
                    </div>
                </div>
                <div class="mx-2">
                    <button type="button" class="d-md-none d-block btn btn-primary btn-cancel-all my-2 w-100">
                        {{ $t('booking.btn_cancel_all') }}
                    </button>
                </div>
            </div>
            <!--validate booking seat -->
            <div id="BookTicketValidate" class="collapse show mt-3 align-items-center red">
                <p class="align-items-center text-center" v-if="selectSeats.length ==0">
                    {{$t("message.msg029_empty_designate_seat")}}</p>
                <p class="align-items-center text-center" v-if="validTicketType == false && nextBtnCLick">
                    {{$t("message.msg030_require_select_ticket_type")}}</p>
            </div>

            <input type="hidden" id="select-seat" v-bind:value="selectSeatString"
                   @change="selectSeats=$event.target.value">
        </section>
        <!--BookTicket End-->

    </div>
</template>

<script>
import Config from "@/constant/config"

import diagram from "@/static/js/build-diagram-seat.js"
import {mapActions, mapGetters} from 'vuex'
import constant from '@/constant';
import {get} from '@/plugins/api';

export default {
  name: "ticket-booking-seat",
  components: {

  },
  props: ['seats'],
  head: {
    script: [
      {src: '/js/svg-pan-zoom.js'}
    ]
  },
  data() {
    // TODO : valid member
    return {
      selectSeats: "",
      validTicketType: "",
      validMember: "",
      nextBtnCLick : false
    }
  },
  computed: {
    ...mapGetters({
      myTickets: 'booking/myTickets',
      isLogin: 'auth/isLogin',
      memberId: 'auth/getMemberId',
      memberKbNo: 'auth/getMemberKbNo',
      checkMemberValid: 'auth/checkMemberValid'
    }),
    selectSeatString() {
      let selectSeatJson = [];
      var that = this;
      this.myTickets.forEach(function (itemSeat) {
        //{"seat_no":215,"seat_nm":"9列 25版","seat_type_nm":"S席"}
        if (
          itemSeat.client_id == that.$route.params.client_id
          && itemSeat.show_group_id == that.$route.query.show_group_id
          && itemSeat.show_no == that.$route.query.show_no
          && itemSeat.seat_type_kb == Config.SEAT_DESIGNATED
        ) {

          let seat = {
            seat_no: itemSeat.seat_no,
            seat_nm: itemSeat.seat_nm,
            seat_type_nm: itemSeat.seat_type_nm,
            seat_type_no: itemSeat.seat_type_no,
          };

          selectSeatJson.push(seat);
        }
      });
      this.selectSeats = selectSeatJson;
      return JSON.stringify(selectSeatJson);
    },


  },
  created() {

    // this.validateMemberTime();
  },
  mounted: function () {

    let clientId = this.$route.params.client_id;
    let hallNo = 1;
    let hallLayoutNo = 1;
    let isLogin = this.isLogin;
    let srcImage = process.env.baseS3Url + Config.PATH_IMG_SEAT_MAP
                  .replace(':client_id', clientId)
                  .replace(':hall_no', hallNo)
                  .replace(':hall_layout_no', hallLayoutNo);
    get(constant.api.BOOKING_SEAT_DETAIL, {
          client_id: this.$route.params.client_id,
          show_group_id: this.$route.query.show_group_id,
          show_no: this.$route.query.show_no,
          sales_no: this.$route.query.sales_no,
          member_kb_no: this.memberKbNo
        })
      .then(result => {
        const matrix = result.data.data;
        // Disable event click choose seat
        $(document).off('click', 'rect,text');
        diagram.initDiagram(srcImage, matrix);
        // check seat svg exit for load selected seat
        var checkExist = setInterval(function () {
          if ($('#diagram').find('#map-bg')) {
            $(document).trigger('load-select-seat');
            if (!isLogin) {
              $(document).off('click', 'rect,text');
              $(document).on('click', 'rect,text', function () {
                $('#theLoginModal').modal('show');
              });
            }

            clearInterval(checkExist);
          }
        }, 500);

        $('#select-seat').on("change", this.onSelectedSeat);

      })
      .catch(err => {
        // Will be redirect to page error 570 later
        console.log(err);
      });


    // click next btn
    this.$parent.$on('nextBtnClick', this.validate);

  },

  methods: {
    validate() {
      this.nextBtnCLick = true;
      this.validateTicketType();
      // alert("next2");
      // this.$emit('validate', false);
    },
    validateTicketType() {
      let result = true;
      var that = this;

      this.myTickets.forEach(function (itemSeat) {
        //{"seat_no":215,"seat_nm":"9列 25版","seat_type_nm":"S席"}
        if (
          itemSeat.client_id == that.$route.params.client_id
          && itemSeat.show_group_id == that.$route.query.show_group_id
          && itemSeat.show_no == that.$route.query.show_no
          && (typeof(itemSeat.ticket_type_no) === "undefined" || itemSeat.ticket_type_no == 0)
        ) {

          result = false;
        }
      });
      this.validTicketType = result;
      return result;
    },
    validateMemberTime() {
      get(constant.api.BOOKING_MEMBERSHIP, {clientId: this.$route.params.client_id, memberId: this.memberId})
        .then(result => {

          this.validMember = result.data.isValidMember;
        })
        .catch(err => {
          // Will be redirect to page error 570 later
          console.log(err);
        });

    },

    isDesignatedSeat(seat) {
      return (
        seat.client_id == this.$route.params.client_id
        && seat.show_group_id == this.$route.query.show_group_id
        && seat.show_no == this.$route.query.show_no
        && seat.seat_type_kb == Config.SEAT_DESIGNATED)
    },

    onSelectedSeat(event) {
      this.selectSeats = event.target.value;
      let selectSeatJson = JSON.parse(event.target.value);

      let deleteTicketData = {
        show_group_id: this.$route.query.show_group_id,
        show_no: this.$route.query.show_no,
        client_id: this.$route.params.client_id,
        sales_no: this.$route.query.sales_no,
        seat_type_kb: Config.SEAT_DESIGNATED
      };
      var that = this;

      this.$store.dispatch("booking/deleteTicketDesignated", deleteTicketData);
      selectSeatJson.forEach(function (itemSeat) {
        //{"seat_no":215,"seat_nm":"9列 25版","seat_type_nm":"S席"}
        let seat = {};
        let ticket = {};
        seat.seat_no = itemSeat.seat_no;
        seat.seat_nm = itemSeat.seat_nm;
        seat.seat_type_no = itemSeat.seat_type_no;
        seat.seat_type_nm = itemSeat.seat_type_nm;
        ticket.ticket_type_no = 0;
        ticket.ticket_type_nm = 0;
        ticket.ticket_price = 0;

        that.addNewSeat(1, seat, ticket);
      });

    },
    /**
     * Function init page get ticket info
     *
     * @returns {Array}
     */
    addNewSeat: function (numTicket, seat, ticket) {
      let ticketInfo = {
        ticket_type_no: ticket.ticket_type_no,
        ticket_type_nm: ticket.ticket_type_nm,

        seat_no: seat.seat_no,
        seat_nm: seat.seat_nm,

        seat_type_no: seat.seat_type_no,
        seat_type_nm: seat.seat_type_nm,
        ticket_price: ticket.ticket_price,
        number_ticket: numTicket,
        seat_type_kb: Config.SEAT_DESIGNATED,
        show_group_id: this.$route.query.show_group_id,
        show_no: this.$route.query.show_no,
        client_id: this.$route.params.client_id,
        sales_no: this.$route.query.sales_no,
        auto_alloc: false

      }

      if (ticketInfo.number_ticket >= 1) {
        this.$store.dispatch("booking/addTicket", ticketInfo);
      }
    },

    onChooseTicket: function (seatNo, optionSelect) {
      let TicketPrice = $('option:selected', optionSelect).data('ticket_price');
      let ticketTypeNo = $('option:selected', optionSelect).data('ticket_type_no');
      let ticketTypeName = $('option:selected', optionSelect).data('ticket_type_nm');
      let seatTypeNo = $('option:selected', optionSelect).data('seat_type_no');
      let ticketInfo = {
        ticket_type_no: ticketTypeNo,
        ticket_type_nm: ticketTypeName,
        seat_no: seatNo,
        seat_type_no: seatTypeNo,
        ticket_price: TicketPrice,
      };
      // save choose ticket
      this.$store.dispatch("booking/chooseTicketType", ticketInfo);
      this.validateTicketType();
    }
  },
  // watch:{
  //   'myTickets.someOtherProp': function (newVal, oldVal){
  //     //to work with changes in someOtherProp
  //   }
  //
  // }
}
</script>

<style scoped>

</style>