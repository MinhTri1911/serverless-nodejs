import ItemShow from "@/components/Show/ItemShow"
import NotifyList from "@/components/Show/NotifyList"
import {mapState, mapGetters, mapActions} from 'vuex'
import {post, get} from "@/plugins/api";
import _api from "@/constant/api"
import Config from "@/constant/config"

export default {
  name: "Index",
  middleware: 'guest',
  components: {
    ItemShow,
    NotifyList
  },
  head() {
    return {
      title: this.$t('show.title')
    }
  },
  data() {
    return {
      constant: {
        WITH_SELECT_SEAT: Config.LAYOUT_WITH_SEAT,
        NO_SELECT_SEAT: Config.LAYOUT_NO_SEAT,
        BUTTON_SELECT_SHOW: 1,
        BUTTON_SELECT_HIDE: 0
      },
      notifyList: [],
      notify_page: {
        currentPage: 1,
        totalItems: 1,
        itemsPerPage: Config.RECORD_PER_PAGE
      },
      showPage: {
        page: 1,
        bottom: false,
        limit: Config.RECORD_PER_PAGE
      }
    }
  },
  created() {
    this.initPrepareData()
  },
  computed: {
    ...mapState({
      show: state => state.show,
      admin_time: state => state.auth.admin_time
    }),
    ...mapGetters({
      totalRecord: 'show/getTotalRecordShow'
    }),
    shows() {
      return this.show.shows
    },
    searching() {
      return this.show.searching
    },
    isRefresh() {
      return this.show.refresh
    },
    isClickBtnSearch(){
      return this.show.isClickBtnSearch;
    }
  },
  mounted: async function() {
    // Add event scroll window
    window.addEventListener('scroll', () => {
      this.showPage.bottom = this.bottomVisible();
    });
    // nextTick to call back after DOM already
    await this.$nextTick(() => {
      // If not search, select show from database
      this.getNotifies(1);
      this.addShow();
    });
  },
  methods: {
    ...mapActions('show', ['searchShow', 'listShow']),

    /**
     * Check bottom visible scroll loading
     * @return {*}
     */
    bottomVisible() {
      const scrollY = window.pageYOffset;
      const visible = document.documentElement.clientHeight;
      const showItemEl = $('#eventListWrap .show-item');
      if (showItemEl.length > 0) {
        const lastShowItem = document.querySelector('#eventListWrap .show-item:last-child');

        const posScroll = lastShowItem.offsetTop + lastShowItem.clientHeight;
        const bottomOfPage = visible + scrollY >= posScroll;

        // Check fixed footer scroll when loading
        if (showItemEl.length >= Config.MAX_RECORD_FIXED_FOOTER) {
          const posElementFixed = $('#eventListWrap .show-item:nth-child(' + (Config.MAX_RECORD_FIXED_FOOTER - 1) + ')');
          if (posElementFixed) {
            let ps = $("#eventListWrap .show-item:nth-child(" + (Config.MAX_RECORD_FIXED_FOOTER - 1) + ")")[0].offsetTop + $("#eventListWrap .show-item:nth-child(" + (Config.MAX_RECORD_FIXED_FOOTER - 1) + ")")[0].clientHeight;
            // When load max item show >= 15 item, then fixed footer
            if ($('#eventListWrap .show-item').length >= Config.MAX_RECORD_FIXED_FOOTER
              && (ps <= visible + scrollY)) {
              $('#mainFooter').addClass('rs-fixed');
            } else {
              $('#mainFooter').removeClass('rs-fixed');
            }
          }
        }

        // Check scroll to load more show
        return scrollY && (bottomOfPage || posScroll < visible);
      }
      return false
    },

    /**
     * Add show when scroll
     * @return {mapActions}
     */
    async addShow() {
      let data = this.setData();
      this.$nuxt.$loading.start();
      await this.$store.dispatch('show/listShow', data)
        .then(res => {
          this.$nuxt.$loading.finish();
        })
        .catch(err => {
          this.$nuxt.$loading.finish();
        })
    },

    /**
     * Config data to search show
     * @return {object}
     */
    setData() {
      return {
        client_id: this.$route.params.client_id || null,
        key_search: this.$route.query.key_search || null,
        genre_no: this.$route.query.genre_no || null,
        from_show_date: this.$route.query.from_show_date || null,
        to_show_date: this.$route.query.to_show_date || null,
        from_sales_date: this.$route.query.from_sales_date || null,
        to_sales_date: this.$route.query.to_sales_date || null,
        showPage: this.showPage || null,
        admin_time: this.getAdminTime()
      }
    },

    /**
     * Prepare data to init page
     * @return void
     */
    initPrepareData() {
      this.showPage.page = 1;
      this.$store.dispatch('show/updatePage', this.showPage.page)
    },

    /**
     * Get list notify
     * @return {Promise}
     */
    getNotifies(pageNum) {
      get(_api.NOTIFY_LIST, {
        client_id: this.$route.params.client_id,
        admin_time: this.getAdminTime(),
        page: pageNum
      }).then(res => {
        const notifiesArray = [];
        for (var notifyItem in res.data.data.notify_list) {
          notifiesArray.push(res.data.data.notify_list[notifyItem]);
        }
        this.notifyList = notifiesArray;
        this.notify_page.totalItems = Number(res.data.data.record_num);
      }).catch(err => {
        console.log(err)
      })
    },
    pageChanged(pageNum) {
      // event change page , get posts in page
      this.notify_page.currentPage = pageNum;
      this.getNotifies(pageNum);
    },
    /**
     * Get time admin when user login admin screen
     * @return {*}
     */
    getAdminTime(){
      if (this.admin_time) {
        let adDate = this.admin_time.date ? this.admin_time.date : '';
        let adHour = this.admin_time.hour ? this.admin_time.hour : '';
        let adMinute = this.admin_time.minute ? this.admin_time.minute : '';
        let adDateTime = adDate + ' ' + adHour + ':' + adMinute;
        let fmReg = new RegExp(/^(([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{1,2}))$/);
        if (fmReg.test(adDateTime)) {
          return adDateTime
        }
      }
      return null;
    }
  },
  watch: {
    // searching(searching) {
    //   if (searching) {
    //     this.initPrepareData()
    //     this.addShow();
    //   }
    // },
    'showPage.bottom'(bottom) {
      if (bottom) {
        this.showPage.page++;
        this.$store.dispatch('show/updatePage', this.showPage.page);
        this.addShow();
      }
    },
    isRefresh(refresh) {
      if (refresh) {
        this.initPrepareData()
        this.addShow();
      }
    },
    isClickBtnSearch(isClick) {
      if (isClick) {
        this.initPrepareData();
        this.addShow();
        this.$store.dispatch('show/updateClickBtnSearch', false);
      }
    }
  }
}
