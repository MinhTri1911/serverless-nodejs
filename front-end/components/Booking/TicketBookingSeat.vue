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
            <div id="DiagramDetail" class="parent border mt-0 collapse show">
                <div class="panzoom w-100 h-100" style="overflow: hidden">
                    <svg id="diagram" version="1.1"
                         baseProfile="full"
                         width="628" height="535"
                         xmlns="http://www.w3.org/2000/svg"
                         class="d-flex justify-content-center align-items-center"
                         @click="getSeat"
                    >
                    </svg>
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
                    <button type="button" class="btn btn-primary" >
                        {{ $t('booking.btn_cancel_all') }}
                    </button>
                    <button type="button" class="btn btn-primary"  id="get-seat">
                        Get seat
                    </button>
                </div>
            </div>
            <div id="BookTicketDetail" class="collapse show mt-3">
                <div class="d-flex justify-content-between mx-2 mb-3  p-3">
                    <div>
                        {{ $t('booking.lb_seat_type') }}
                    </div>
                    <div>
                        {{ $t('booking.lb_seat_info') }}
                    </div>
                    <div>

                        {{ $t('booking.lb_seat_name') }}
                    </div>
                    <div>

                        {{ $t('booking.lb_price') }}
                    </div>
                    <div>
                        <button class="btn btn-primary py-0" style="visibility: hidden">
                            &nbsp
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-content-between mx-2 mb-3 border p-3">
                    <div id="test">
                        Ghe test
                    </div>
                    <div>
                        Ve test
                    </div>
                    <div>
                        10A2B
                    </div>
                    <div>
                        1000 yen
                    </div>
                    <div>
                        <button class="btn btn-primary py-0">
                            {{ $t('booking.btn_cancel') }}
                        </button>
                    </div>
                </div>
                <div class="mx-2">
                    <button type="button" class="d-md-none d-block btn btn-primary my-2 w-100">
                        {{ $t('booking.btn_cancel_all') }}
                    </button>
                </div>
            </div>
            <input type="text" id="select-seat" :value="selectSeat" @change="selectSeat=$event.target.value">
        </section>
        <!--BookTicket End-->
    </div>
</template>

<script>
import diagram from "@/static/js/build-diagram-seat.js"
import { mapActions, mapState } from 'vuex'
export default {
  name: "ticket-booking-seat",
    head: {
    script: [
      { src: '/js/svg-pan-zoom.js' }
    ]
  },
  data(){
    return {
      selectSeat : ''
    }
  },
  mounted: () => {
    let srcImage = "https://s3-ap-northeast-1.amazonaws.com/ticket-data-dev/test1/layout/1/1/hall_pic";
    diagram.initDiagram(srcImage);
    $("#select-seat").on("change", this.getSeat)

  },
  methods: {
    getSeat() {
        this.$store.dispatch("post/increment");
        // alert('a')
    }
  },
  watch: {

    selectSeat: function () {
      alert(JSON.parse(this.selectSeat));
    }
  },
}
</script>

<style scoped>

</style>