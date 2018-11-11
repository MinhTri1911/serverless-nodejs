/**
 * BookingCompleteBusiness.js
 * Handle complete booking
 *
 * @author Rikkei.DungLV
 * @date 2018-10-22
 */
import _api from '@/constant/api';
import _router from '@/constant/router';
import {post} from "@/plugins/api"
import ClientInfo from "@/components/UI/ClientInfo"
import {mapState, mapGetters} from 'vuex'

export default {
  name: "index",
  // middleware: 'authenticated',
  components: {
    ClientInfo
  },
  head() {
    return {
      title: this.$t('booking.title_booking_complete')
    }
  },

  data() {
    return {
      clientInfo: null
    }
  },

  computed: {
    ...mapState({
      bookingCode: 'booking/bookingCode'
    }),
    ...mapGetters({
      clientInfoStore: 'client/getClient'
    }),

    /**
     * Get booking code from store or local storage
     * @return {*}
     */
    bookingCodeStore() {
      return this.bookingCode ? this.bookingCode : null;
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      if (!this.clientInfoStore) {
        this.setClientInfo();
        this.$nuxt.$loading.finish();
      } else {
        this.clientInfo = this.clientInfoStore;
        this.$nuxt.$loading.finish();
      }
    });
  },

  methods: {
    setClientInfo() {
      this.$nuxt.$loading.start();
      post(_api.GET_CLIENT_INFO, {
        client_id: this.$route.params.client_id
      })
        .then(res => {
          this.$nuxt.$loading.finish();
          this.clientInfo = res.data.data;
        })
        .catch(err => {
          this.$nuxt.$loading.finish();
        })
    },

    /**
     * Append booking code to text extract content
     *
     * @param content
     * @param bookingCode
     * @return {void | string | *}
     */
    appendBookingCode(content, bookingCode) {
      return content.replace('[予約番号]', bookingCode);
    },

    /**
     * Send mail to user
     * @return {boolean}
     */
    sendMailBookingComplete(type_cd) {
      return new Promise((resolve, reject) => {
        post(_api.SEND_MAIL_COMPLETE, {
          client_id: this.$route.params.client_id
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
            this.$nuxt.$loading.finish();
          });
      });
    },
    goToHome(){
      return this.$router.push({name: _router.LISTPERFORM, params: {'client_id': this.clientInfo.client_id}})
    }
  }
}
