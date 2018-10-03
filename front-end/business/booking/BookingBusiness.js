import Warning from  "@/components/Booking/Warning"
import TicketInfo from  "@/components/Booking/TicketInfo"
import TicketContent from "@/components/Booking/TicketContent"
import { mapState, mapGetters } from 'vuex';

export default {
  head() {
    return {
      title: this.$t('booking.title'),
    }
  },
  components: {
    Warning,
    TicketInfo,
    TicketContent
  },
  computed: {

  }
  // data() {
  //   return {
  //     loadedPosts: []
  //   };
  // },
};