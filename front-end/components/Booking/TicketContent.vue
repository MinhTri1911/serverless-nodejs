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
                <div class="d-flex flex-md-row flex-column pb-2 border-bottom ticket--marginT">
                    <div class="d-flex align-items-center info__title--medium">
                        <div>
                            Loai ghe A
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <div class="d-flex justify-content-between border py-3 ticket--paddingX ticket--marginY">
                            <div class="d-flex align-items-center col">
                                <div class="pr-5">
                                    Loai ve A
                                </div>
                                <div class="d-flex">
                                    <div class="pr-3">
                                        So tien
                                    </div>
                                    <div>
                                        100000
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <select class="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between border py-3 ticket--paddingX ticket--marginY">
                            <div class="d-flex align-items-center col">
                                <div class="pr-5">
                                    Loai ve B
                                </div>
                                <div class="d-flex">
                                    <div class="pr-3">
                                        So tien
                                    </div>
                                    <div>
                                        200000
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <select class="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-md-row flex-column pb-2 ticket--marginT">
                    <div class="d-flex align-items-center info__title--medium">
                        <div>
                            Loai ghe B
                        </div>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <div class="d-flex justify-content-between border py-3 ticket--paddingX ticket--marginY">
                            <div class="d-flex align-items-center col">
                                <div class="pr-5">
                                    Loai ve A
                                </div>
                                <div class="d-flex">
                                    <div class="pr-3">
                                        So tien
                                    </div>
                                    <div>
                                        100000
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <select class="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Ticket Type End-->

        <!--Total Ticket-->
        <section id="Total-Ticket">
            <div class="d-flex">
                <h2 class="col mb-0">
                    <a href="#TotalTicketDetail" data-toggle="collapse">
                        {{ $t('booking.lb_reservation_information') }}
                    </a>
                </h2>
            </div>
            <div id="TotalTicketDetail" class="collapse show info info--paddingX py-2">
                <div class="d-flex flex-md-row flex-column justify-content-between">
                    <div class="d-flex info__mobile">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_sum_number_ticket') }}
                        </div>
                        <div>
                            200
                        </div>
                    </div>
                    <div class="d-flex info__mobile">
                        <div class="info__title--medium">
                            {{ $t('booking.lb_sum_money') }}
                        </div>
                        <div>
                            1000000
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Total Ticket End-->

    </div>
</template>

<script>
export default {
  name: "ticket-content"
}
</script>

<style scoped>

</style>