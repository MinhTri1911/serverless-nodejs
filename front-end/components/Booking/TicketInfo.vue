<template>
    <div>
        <!--Info Ticket-->
        <section id="Info-Performance">

            <div id="InfoPerformanceDetail" class="collapse show info--paddingX pt-2">
                <div class="d-md-flex justify-content-md-between info border-bottom">
                    <div class="d-flex ">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_show_name') }}
                        </div>
                        <div>
                            {{this.dataTicket.show_nm}}
                        </div>
                    </div>

                </div>
                <div class="d-md-flex justify-content-md-between info border-bottom">
                    <div class="d-flex ">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_show_date') }}
                        </div>
                        <div>
                            {{this.dataTicket.show_date}}
                        </div>
                    </div>
                </div>
                <div class="d-flex info">
                    <div class="info__title--medium">
                        {{ $t('booking.lb_hall') }}
                    </div>
                    <div class="d-flex align-items-center col " style="padding-left: 0px;">
                        {{this.dataTicket.hall_nm}}
                    </div>
                    <div class=" d-none d-md-block d-lg-block ">
                        <button type="button" class="btn btn-primary">
                            {{ $t('booking.btn_show_detail') }}
                        </button>
                    </div>
                </div>
                <button type="button" class="d-md-none d-block btn btn-primary my-2 w-100">
                    {{ $t('booking.btn_show_detail') }}
                </button>
            </div>
        </section>
        <!--Info Ticket End-->

        <!--Info Reception-->
        <section id="Info-Reception">

            <div id="InfoReception" class="collapse show info--paddingX pt-2">
                <!--Not have seat map-->
                <div v-if="!seatType" class="d-md-flex justify-content-md-between info border-bottom">
                    <div class="d-flex info__mobile">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_reception_period_name') }}
                        </div>
                        <div>
                            {{this.dataTicket.sales_nm}}
                        </div>
                    </div>
                    <div class="d-flex info__mobile">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_reception_period') }}
                        </div>
                        <div>
                            {{this.dataTicket.sales_term}}
                        </div>
                    </div>
                </div>

                <!--Have seat map-->
                <div v-if="seatType">
                    <div class="d-flex info border-bottom">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_reception_period_name') }}
                        </div>
                        <div>
                            {{this.dataTicket.sales_nm}}
                        </div>
                    </div>
                    <div class="d-flex info border-bottom">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_reception_period') }}
                        </div>
                        <div>
                            {{this.dataTicket.sales_term}}
                        </div>
                    </div>
                </div>

                <div class="d-flex info">
                    <div class="info__title--medium">
                        {{ $t('booking.lb_payment_receipt_method') }}
                    </div>
                    <div>
                        {{this.dataTicket.sales_explanation}}
                    </div>
                </div>
            </div>
        </section>
        <!--Info Reception End-->
    </div>
</template>

<script>
export default {
  name: "ticket-info",
  props: {
    seatType: {
      default: false,
      type: Boolean
    },
    dataTicket:{
      type : Object
    }
  }
}
</script>

<style scoped>

</style>