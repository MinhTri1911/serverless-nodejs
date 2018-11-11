import Warning from "@/components/Booking/Warning"
import TicketInfo from "@/components/Booking/TicketInfo"
import TicketContent from "@/components/Booking/TicketContent"
import TicketContentSeat from "@/components/Booking/TicketContentSeat"
import TicketBookingSeat from "@/components/Booking/TicketBookingSeat"
import TicketSummary from "@/components/Booking/TicketSummary"
import LoginModal from "@/components/Navigation/TheLoginModal"
import WarningModal from "@/components/Navigation/TheWarningModal"
import {mapState, mapGetters} from 'vuex';
import constant from '@/constant';
import {get, post} from '@/plugins/api';

export default {
  middleware: 'guest',
  head() {
    return {
      title: this.$t('booking.header'),
    }
  },
  components: {
    Warning,
    LoginModal,
    WarningModal,
    TicketInfo,
    TicketContent,
    TicketContentSeat,
    TicketBookingSeat,
    TicketSummary
  },
  computed: {
    ...mapGetters({
      myTickets: 'booking/myTickets',
      isLogin: 'auth/isLogin',
      memberId: 'auth/getMemberId',
      memberKbNo: 'auth/getMemberKbNo',
      memberTypeNo: 'auth/getMemberTypeNo',
      cartId: 'booking/cartId',
      checkMemberValid: 'auth/checkMemberValid',
      adminTime: 'auth/getAdminTime'
    }),
    haveMemberDiscount() {
      let result = false;
      $.each(this.dataSeatType.seats, function (seatName, seatInfo) {
        if (seatInfo.member_discount_flag == 1) {
          result = true;
          return true;
        }
      });

      return result;
    },
    sumNumberTicket() {
      let numTicket = 0;
      let route = this.$route ;
      this.myTickets.forEach(function (el) {
        if (el.client_id == route.params.client_id
          && el.show_group_id == route.query.show_group_id
          && el.show_no == route.query.show_no
          && el.ticket_price > 0) {
          numTicket += el.number_ticket * 1;
        }
      });
      return numTicket;
    },

  },

  data() {
    return {
      dataTicket: {},
      dataSeatType: {},
      message: '',
      validate : true
    }
  },

  created() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

    });
    this.initPage();
    // TODO : enable check sales term
    this.checkSalesTerm();

  },
  methods: {
    /**
     * Function init page get ticket info
     *
     * @returns {Array}
     */
    initPage: function () {
      get(constant.api.BOOKING_INFO, {
        client_id: this.$route.params.client_id,
        show_group_id: this.$route.query.show_group_id,
        show_no: this.$route.query.show_no,
        admin_time : this.adminTime
      })
        .then(result => {
          this.dataTicket = result.data.data;
          //finish loading
          this.$nuxt.$loading.finish();
        })
        .catch(err => {
          // Will be redirect to page error 570 later
          console.log(err);
        });

      get(constant.api.TICKET_INFO, {
        client_id: this.$route.params.client_id,
        show_group_id: this.$route.query.show_group_id,
        show_no: this.$route.query.show_no,
        sales_no: this.$route.query.sales_no
      })
        .then(result => {
          this.dataSeatType = result.data.data;
        })
        .catch(err => {
          // Will be redirect to page error 570 later
          console.log(err);
        });
    },
    checkSalesTerm :function (){
      get(constant.api.BOOKING_SALES_TERM, {
        clientId: this.$route.params.client_id,
        showGroupId: this.$route.query.show_group_id,
        showNo: this.$route.query.show_no,
        salesNo: this.$route.query.sales_no
      })
        .then(result => {
          let sales_flg = result.data.data.sales_flg;
          if(sales_flg ==0) {
            this.$store.dispatch('auth/setError', [this.$t('message.msg004_error_sales_term')]);
            this.$router.push({name: constant.router.ERROR_NAME});
          }

        })
        .catch(err => {
          // Will be redirect to page error 570 later
          console.log(err);
        });

    },
    checkLimitTicket () {
      let valid = true;
      if(this.sumNumberTicket > 0) {
        return get(constant.api.BOOKING_CHECK_LIMIT, {
          client_id: this.$route.params.client_id,
          show_group_id: this.$route.query.show_group_id,
          show_no: this.$route.query.show_no,
          sales_no: this.$route.query.sales_no,
          seat_select_count: this.sumNumberTicket,
          member_id: this.memberId,
        })
          .then(result => {
            let data = result.data.data;

            if (data.day_entry_limit_count_ng_flg == 1) {
              this.message = data.day_entry_limit_count_ng_flg_msg;
              this.validate = false;
              valid = false;
              $('#theWarningModal').modal('show');
            } else if (data.once_purchase_limit_count_ng_flg == 1) {
              this.message = data.once_purchase_limit_count_ng_flg_msg;
              this.validate = false;
              valid = false;
              $('#theWarningModal').modal('show');
            } else if (data.purchase_limit_count_ng_flg == 1) {
              this.message = data.purchase_limit_count_ng_flg_msg;
              this.validate = false;
              valid = false;
              $('#theWarningModal').modal('show');
            } else if (data.first_limit_count_ng_flg == 1) {
              this.message = data.first_limit_count_ng_flg_msg;
              this.validate = false;
              valid = false;
              $('#theWarningModal').modal('show');
            }

            return valid;

          })
          .catch(err => {
            // Will be redirect to page error 570 later
            console.log(err);
          });
      }else{
        return false;
      }


    },
    getCartId(){

      return get(constant.api.BOOKING_GET_CART)
        .then(result => {
          let data = result.data.data.nextval ;
          this.$store.dispatch('booking/setCart', data);
          return true

        })

    },

    checkSeatBooking(){
      let valid = true;
      let seats = [];
      let route = this.$route ;
      this.myTickets.forEach(function (el) {
        if (el.client_id == route.params.client_id
          && el.show_group_id == route.query.show_group_id
          && el.show_no == route.query.show_no
          && el.ticket_price > 0) {
          seats.push(el);
        }
      });

      return post(constant.api.BOOKING_CHECK_SEAT, {
        client_id: this.$route.params.client_id,
        cart_id: this.cartId,
        show_group_id: this.$route.query.show_group_id,
        show_no: this.$route.query.show_no,
        sales_no: this.$route.query.sales_no,
        seats: seats,
        member_kb_no: this.memberKbNo,
        membertype_no: this.memberTypeNo,
        member_id: this.memberId
      })
        .then(result => {
          let data = result.data.data;

          if (data.result_code == 1) {
            valid = true;
          } else if (data.result_code == 3) {

            this.message = this.$t('message.msg044_save_designate_seat_fail.line_1')+ '\n' +this.$t('message.msg044_save_designate_seat_fail.line_2');
            this.validate = false;
            valid = false;
            $('#theWarningModal').modal('show');
          } else if (data.result_code == 8) {
            //TODO : unselect seat
            this.message = $t('message.msg043_save_free_seat_fail');
            this.validate = false;
            valid = false;
            $('#theWarningModal').modal('show');
          } else if (data.result_code == 9) {
            valid = false;
            this.$store.dispatch('auth/setError', ['']);
            this.$router.push({name: constant.router.ERROR_NAME});
          }

          return valid;

        })
        .catch(err => {
          // Will be redirect to page error 570 later
          console.log(err);
        });

    },

    onNextBtn: async function () {
      let checkLimit  =  await this.checkLimitTicket();

      if (checkLimit == true){
        //Get new cartId if dont have
        if(this.cartId == '') {
          let getCart = await this.getCartId();
        }
        let checkSeat = await this.checkSeatBooking();
        if (checkSeat ==  true){
          alert('Success');
        }
      }


      this.$emit('nextBtnClick', true);
    },
    onBackBtn: function () {
      if(this.dataTicket.show_group_disp_kb == 1){
        let path = this.$router.resolve({
          name: constant.router.LISTPERFORM,
          params: { client_id: this.$route.params.client_id   }
        });
        console.log(path);
        this.$router.push(path.href);

      }else {
        let path = this.$router.resolve({
          name: constant.router.SHOW_SCHEDULE_LIST,
          params: {client_id: this.$route.params.client_id, show_group_id: this.$route.query.show_group_id}
        });

        this.$router.push(path.href);
      }
      this.$emit('backBtnClick', true);
    },
    async validated(status) {
      alert(status);
    }
  }

};
