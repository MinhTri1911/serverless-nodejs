/**
 * File HistoryOrderBusiness.js
 * Show history order
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-30
 */

import Pagination from '@/components/UI/Pagination';
import constant from '@/constant';
import { get } from '@/plugins/api';
import { mapState } from 'vuex';

export default {
  middleware: 'authenticated',
  head() {
    return {
      title: this.$t('common.links.my_page')
    }
  },
  data: () => ({
    dataInit: {
      orders: []
    },
    page: {
      currentPage: 0,
      totalItems: 0,
      itemsPerPage: 0
    },
    detail: {
      showName: '',
      seat: [],
      order: []
    },
    dataShow: {},
    url: 'http://google.com',
    linkToMyPage: constant.router.MY_PAGE,
    countDuplicate: {},
    isNotHaveHistory: true,
  }),
  created() {
    this.initPage();
  },
  computed: {
    ...mapState({
      auth: state => state.auth
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    })
  },
  methods: {
    /**
     * Function change page
     *
     * @param {Integer} pageNum
     * @returns {void}
     */
    pageChanged(pageNum) {
      this.callApiGetHistory(pageNum)
        .then(data => {
          this.getDetail(this.dataInit.orders[0].reserve_no, this.dataInit.orders[0].show_group_main_title);
        });
    },

    /**
     * Function init page
     *
     * @returns {void}
     */
    initPage() {
      this.callApiGetHistory(1)
        .then(data => {
          if (!this.dataInit.orders.length) {
            this.isNotHaveHistory = true;

            return;
          }

          this.getDetail(this.dataInit.orders[0].reserve_no, this.dataInit.orders[0].show_group_main_title);
          this.isNotHaveHistory = false;
        });
    },

    /**
     * Function call api get history order
     *
     * @param {Integer} page
     * @returns {void}
     */
    callApiGetHistory(page) {
      return get(constant.api.HISTORY_ORDER, {
        client_id: this.$route.params.client_id,
        member_id: this.auth.user.member_id,
        page: page
      }).then(res => {
        let data = res.data.data;

        // Setting data
        this.page.currentPage = data.paginate.current_page;
        this.page.totalItems = parseInt(data.paginate.total);
        this.page.itemsPerPage = data.paginate.item_per_page;
        this.dataInit.orders = data.paginate.items;

        let counter = {}

        // Remark duplicate reserve_no
        this.dataInit.orders.forEach((obj, index) => {
          let key = obj.reserve_no;
          counter[key] = {
            total: (counter[key] ? counter[key].total : 0) + 1,
            index: counter[key] ? counter[key].index : index
          };
        });

        this.countDuplicate = counter;
      }).catch(err => {
        // Redirect to page 570
        this.$store.dispatch('auth/setError', [
          this.$t('message.msg003_exception.line_1'),
          this.$t('message.msg003_exception.line_2'),
          this.$t('message.msg003_exception.line_3')
        ]);

        let path = this.$router.resolve({
          name: constant.router.ERROR_NAME,
          params: { client_id: this.$route.params.client_id }
        });

        this.$router.push(path.href);
      });
    },

    /**
     * Function get detail history order
     *
     * @returns {void}
     */
    getDetail(id, name) {
      this.dataInit.orders.forEach(element => {
        if (element.reserve_no == id) {
          this.dataShow = element;
        }
      });

      this.getDetailSeat(id, name);
    },

    /**
     * Function get detail order with seat
     *
     * @param {String} id
     * @param {String} name
     * @return {void}
     */
    getDetailSeat(id, name) {
      get(constant.api.DETAIL_ORDER, {
        client_id: this.$route.params.client_id,
        member_id: this.auth.user.member_id,
        reserve_no: id
      }).then(res => {
        this.detail.seat = res.data.data.detail.detail_seat;
        this.detail.order = res.data.data.detail.detail_order;
        this.detail.showName = name;
      }).catch(err => {
        // Redirect to page 570
        this.$store.dispatch('auth/setError', [
          this.$t('message.msg003_exception.line_1'),
          this.$t('message.msg003_exception.line_2'),
          this.$t('message.msg003_exception.line_3')
        ]);

        let path = this.$router.resolve({
          name: constant.router.ERROR_NAME,
          params: { client_id: this.$route.params.client_id }
        });

        this.$router.push(path.href);
      });
    }
  },
  components: {
    Pagination
  }
}
