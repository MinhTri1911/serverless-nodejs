<template>
    <section id="Ticket-Type">
        <div class="d-flex">
            <h2 class="col mb-0">
                <a href="#TicketTypeDetail" data-toggle="collapse">
                    {{ $t('booking.lb_bill_information_type') }}
                </a>
            </h2>
        </div>
        <div style="padding: 20px">
            <table class="table ">
                <thead>
                <tr>
                    <th scope="col">{{ $t('booking.lb_seat_status') }}</th>
                    <th scope="col">{{ $t('booking.lb_seat_type') }}</th>
                    <th scope="col">{{ $t('booking.lb_seat_info') }}</th>
                    <th scope="col">{{ $t('booking.lb_seat_price') }}</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody v-for="(seat, seatIndex) in seats">

                <tr v-for="(ticket, ticketIndex) in seat.tickets">
                    <th v-if="ticketIndex ==0 " scope="row" :rowspan="seat.tickets.length">{{ seat.maisu_status}}</th>
                    <td v-if="ticketIndex ==0" :rowspan="seat.tickets.length">
                        <div class="square" v-bind:style="{background: seat.seat_type_color}"></div>
                        {{ seat.seat_type_nm}}
                    </td>
                    <td>{{ ticket.ticket_type_nm}}</td>
                    <td>{{ ticket.ticket_price}}</td>
                    <td>
                        <select class="form-control pull-right" style="width:80px;"
                                @change="onChangeTicket($event.target.value,seat,ticket)"
                                v-if="isLogin
                                    && ticket.net_zan_maisu >= ticket.ticket_unit
                                    && ticket.number_specified_flg == 1"
                                :key="number_ticket[seat.seat_type_nm+'_'+ticket.ticket_type_nm]">
                            <option v-bind:value="0">{{$t('booking.lb_please_select')}}</option>
                            <option v-for="ticketNumber  in (ticket.net_zan_maisu *1) "
                                    v-bind:value="ticketNumber"
                                    v-if="ticketNumber % ticket.ticket_unit == 0
                                            && ticketNumber <= ticket.limit_count
                                            && ticketNumber <= ticket.net_zan_maisu"
                                    :selected="loadMyTicket(seat.seat_type_no ,ticket.ticket_type_no ,ticketNumber )">
                                {{ticketNumber}}
                            </option>

                        </select>
                        <div v-if="ticket.net_zan_maisu == 0|| ticket.net_zan_maisu < ticket.ticket_unit">
                            {{$t('booking.lb_sold_out')}}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import Config from "@/constant/config"

export default {
  name: "ticket-content-seat",
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
        client_id: this.$route.query.client_id,
        show_group_id: this.$route.query.show_group_id,
        show_no: this.$route.query.show_no

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