<template>
    <div id="TicketContent">
        <!--Ticket Type-->
        <section id="Ticket-Type">
            <div class="d-flex">
                <h2 class="col mb-0">
                    <a href="#TicketTypeDetail" data-toggle="collapse">
                        {{ $t('booking.lb_bill_information_type') }}
                    </a>
                </h2>
            </div>
            <div id="TicketTypeDetail" class="collapse show info--paddingX pt-2">
                <div class="d-flex flex-md-row flex-column pb-2 border-bottom ticket--marginT"
                     v-for="(seat, seatIndex) in seats">
                    <div class="d-flex align-items-center info__title--medium">
                        <div>
                            {{ seat.seat_type_nm}}
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <div class="d-flex justify-content-between border py-3 ticket--paddingX ticket--marginY"
                             v-for="(ticket, ticketIndex) in seat.tickets">
                            <div class="d-flex align-items-center col">
                                <div class="pr-5 col-4">
                                    {{ ticket.ticket_type_nm}}
                                </div>
                                <div class=" col-4">
                                    {{ ticket.ticket_price}}
                                </div>
                                <div class="d-flex col-4 float-right">
                                    <select class="form-control pull-right" style="width:80px;"
                                            @change="onChangeTicket($event.target.value,seat,ticket)"
                                            v-if="isLogin
                                                  && ticket.net_zan_maisu >= ticket.ticket_unit
                                                  && ticket.number_specified_flg == 1 "
                                            :key="number_ticket[seat.seat_type_nm+'_'+ticket.ticket_type_nm]">
                                        <option v-bind:value="0">{{$t('booking.lb_please_select')}}</option>
                                        <option v-for="ticketNumber  in (ticket.net_zan_maisu *1) "
                                                v-bind:value="ticketNumber"
                                                v-if="ticketNumber % ticket.ticket_unit ===0
                                                        && ticketNumber <= ticket.limit_count
                                                        && ticketNumber <= ticket.net_zan_maisu"
                                                :selected="loadMyTicket(seat.seat_type_no ,ticket.ticket_type_no ,ticketNumber )">
                                            {{ticketNumber}}
                                        </option>

                                    </select>
                                    <div v-if="ticket.net_zan_maisu == 0|| ticket.net_zan_maisu < ticket.ticket_unit">
                                        {{$t('booking.lb_sold_out')}}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
        <!--Ticket Type End-->

    </div>
</template>

<script>
import Config from "@/constant/config"
import {mapGetters} from 'vuex'

export default {
  name: "ticket-content",
  props: ['seats'],
  data() {
    return {
      number_ticket: [],
      ticket_price: 0,
      ticket_type_no: 0,
      seat_type_no: 0,
      seat_type_kb: 0
    }
  },
  computed: {
    ...mapGetters({
      myTickets: 'booking/myTickets',
      isLogin: 'auth/isLogin'
    }),

  },
  mounted: function () {

    },
  methods: {
    /**
     * Function init page get ticket info
     *
     * @returns {Array}
     */
    onChangeTicket: function (numTicket, seat, ticket) {

      let ticketInfo = {
        ticket_type_no: ticket.ticket_type_no,
        ticket_type_nm: ticket.ticket_type_nm,
        seat_type_no: seat.seat_type_no,
        seat_type_nm: seat.seat_type_nm,
        ticket_price: ticket.ticket_price,
        number_ticket: numTicket,
        seat_type_kb: Config.SEAT_FREE,
        show_group_id: this.$route.query.show_group_id,
        show_no: this.$route.query.show_no,
        client_id: this.$route.params.client_id,
        sales_no: this.$route.query.sales_no

      }

      if (ticketInfo.number_ticket > 0) {
        this.$store.dispatch("booking/addTicket", ticketInfo);
      }
      if (ticketInfo.number_ticket == 0) {
        this.$store.dispatch("booking/deleteTicket", ticketInfo);
      }
    },
    loadMyTicket(seat_type_no, ticket_type_no, ticketNumber) {
      let result = false;
      this.myTickets.forEach(function (el) {
        if (el.seat_type_no == seat_type_no && el.ticket_type_no == ticket_type_no && el.number_ticket == ticketNumber) {
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