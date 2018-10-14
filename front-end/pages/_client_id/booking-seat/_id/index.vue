<template>
    <!-- Main Contents -->
    <div id="MainC">
        <!-- Main Contents -->
        <main id="ContentsPane">
            <h1 class="d-flex align-items-center pt-0"><span id="Pagetitle">{{$t('booking.header')}}</span></h1>

            <div id="SingleContents">
                <div class="d-flex flex-md-row flex-column justify-content-between w-100">
                    <div class="w-md-50 w-100">
                        <div id="InfoContents">
                            <!--Notice-->
                            <Warning></Warning>
                            <!--Notice End-->

                            <!--Info Ticket-->
                            <TicketInfo :seat-type="true" :dataTicket="dataTicket" ></TicketInfo>
                            <!--Info Ticket End-->
                        </div>

                        <div id="TicketContent">
                            <!--Ticket Type-->
                            <TicketContentSeat :seats="dataSeatType.seats"></TicketContentSeat>
                            <!--Ticket Type End-->
                        </div>
                    </div>
                    <div class="ml-md-3 d-flex w-md-50 w-100 flex-column">
                        <TicketBookingSeat></TicketBookingSeat>
                    </div>
                </div>

                <div id="Total">
                    <!--Total Ticket-->
                    <TicketSummary></TicketSummary>
                    <!--Total Ticket End-->

                </div>
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
                            {{ $t("booking.btn_back")}}
                        </button>
                        <button class="btn">
                            {{ $t("booking.btn_next")}}
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
<style>
    /*td:last-child {*/
    /*border :none;*/
    /*background-color: #ffffff;*/
    /*}*/
    /*th:last-child {*/
    /*border :none;*/
    /*background-color: #ffffff;*/

    /*}*/
</style>



