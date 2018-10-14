<template>
    <section id="Total-Ticket">
        <div id="TotalTicketDetail" class="collapse show py-2">
            <div class="d-flex flex-md-row flex-column justify-content-between info info--paddingX">
                <div class="d-flex info__mobile">
                    <div class="info__title--medium">
                        {{ $t("booking.lb_sum_number_ticket")}}
                    </div>
                    <div>
                        {{sumNumberTicket}}
                    </div>
                </div>
                <div class="d-flex info__mobile">
                    <div class="info__title--medium">
                        {{ $t("booking.lb_sum_money")}}
                    </div>
                    <div>
                        {{sumMoneyTicket}}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "ticket-summary",
  computed: {
    ...mapGetters({
      myTickets: 'booking/myTickets'
    }),
    sumNumberTicket() {
      let numTicket = 0;
      this.myTickets.forEach(function (el) {
        numTicket += el.number_ticket * 1;
      });
      return numTicket;
    },
    sumMoneyTicket() {
      let totalMoney = 0;
      this.myTickets.forEach(function (el) {
          totalMoney += el.number_ticket * el.ticket_price;
        }
      )
      return totalMoney;
    }
  }

}
</script>

<style scoped>

</style>