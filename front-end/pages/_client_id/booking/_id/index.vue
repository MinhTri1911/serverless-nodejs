<template>
    <!-- Main Contents -->
    <div id="MainC">
        <!-- Main Contents -->
        <main id="ContentsPane">
            <h1 class="d-flex align-items-center pt-0"><span id="Pagetitle">BookTicket</span></h1>
            <div id="SingleContents">
                <div id="InfoContents">
                    <!--Notice-->
                    <Warning></Warning>
                    <!--Notice End-->
                    <!--Ticket Info -->
                    <TicketInfo></TicketInfo>

                </div>
                    <TicketContent></TicketContent>

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
                        <button class="btn">

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
<style lang="scss" >
    @import "./assets/scss/booking";
</style>




