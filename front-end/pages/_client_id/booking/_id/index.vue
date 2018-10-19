<template>
    <!-- Main Contents -->
    <div id="MainC">
        <!-- Main Contents -->
        <main id="ContentsPane">
            <h1 class="d-flex align-items-center pt-0"><span id="Pagetitle">{{$t('booking.header')}}</span></h1>
            <div id="SingleContents">
                <div id="InfoContents">
                    <!--Notice-->
                    <Warning :seats="dataSeatType.seats" :dataTicket="dataTicket"></Warning>
                    <!--Notice End-->
                    <!--Ticket Info -->
                    <TicketInfo :dataTicket="dataTicket"></TicketInfo>

                </div>
                <!--Ticket Booking Content -->
                <TicketContent :seats="dataSeatType.seats"></TicketContent>
                <!--Ticket Booking Content End -->

                <!--Ticket Summary -->
                <TicketSummary></TicketSummary>
                <!--Ticket Summary End-->
                <!--Notice-->
                <section id="Notice2">
                    <h2 class="mb-0">
                        <a href="">
                            Chu y 2
                        </a>
                    </h2>
                </section>
                <!--Notice End-->
                <div id="Pagination">
                    <div class="d-flex justify-content-between">
                        <button class="btn">
                            {{ $t('booking.btn_back') }}
                        </button>
                        <button class="btn" @click="">
                            {{ $t('booking.btn_next') }}
                        </button>
                    </div>
                </div>
            </div>
        </main>
        <!-- Main Contents end -->
    </div>
    <!-- Main Contents end -->
</template>
<script src="@/business/booking/BookingBusiness.js"></script>
<style lang="scss">
    @import "./assets/scss/booking";
</style>




