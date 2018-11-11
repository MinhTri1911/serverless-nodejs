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
                <section id="Notice2" v-if="isLogin && haveMemberDiscount">
                    <p class="text-center">{{$t("booking.lb_warning_common_3")}}</p>

                </section>
                <!--Notice End-->
                <div id="Pagination">
                    <div class="d-flex justify-content-between">
                        <button class="btn" @click="onBackBtn">
                            {{ $t('booking.btn_back') }}
                        </button>
                        <button class="btn" @click="onNextBtn">
                            {{ $t('booking.btn_next') }}
                        </button>
                    </div>
                </div>
            </div>
            <!--Modal require login-->
            <LoginModal/>
            <!--Modal require validate-->
            <WarningModal :message="message"/>
        </main>
        <!-- Main Contents end -->
    </div>
    <!-- Main Contents end -->
</template>
<script  src="@/business/booking/BookingBusiness.js"></script>
<style lang="scss" >
    @import "./assets/scss/booking";
</style>




