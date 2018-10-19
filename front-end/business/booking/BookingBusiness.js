import Warning from "@/components/Booking/Warning"
import TicketInfo from "@/components/Booking/TicketInfo"
import TicketContent from "@/components/Booking/TicketContent"
import TicketContentSeat from "@/components/Booking/TicketContentSeat"
import TicketBookingSeat from "@/components/Booking/TicketBookingSeat"
import TicketSummary from "@/components/Booking/TicketSummary"
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
    TicketInfo,
    TicketContent,
    TicketContentSeat,
    TicketBookingSeat,
    TicketSummary
  },
  computed: {
    ...mapGetters({
      isLogin: 'auth/isLogin'
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
    }
  },
  data() {
    return {
      dataTicket: {},
      dataSeatType: {},

    }
  },
  beforeCreate: function () {
    // this.$store.state.auth.authenticated = true;
  },
  created() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

    });
    this.initPage();
  },
  methods: {
    /**
     * Function init page get ticket info
     *
     * @returns {Array}
     */
    initPage: function () {
      get(constant.api.BOOKING_INFO, {
          clientId: this.$route.params.client_id,
          showGroupId: this.$route.query.show_group_id,
          showNo: this.$route.query.show_no,
          salesNo: this.$route.query.sales_no
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
          clientId: this.$route.params.client_id,
          showGroupId: this.$route.query.show_group_id,
          showNo: this.$route.query.show_no,
          salesNo: this.$route.query.sales_no
        })
        .then(result => {

          this.dataSeatType = result.data.data;
        })
        .catch(err => {
          // Will be redirect to page error 570 later
          console.log(err);
        });
    },
    onNextBtn: function () {
      this.$emit('nextBtnClick', true);
    },
    validated(status) {
      alert(status);
    }
  }

};
