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
  data() {
    return {
      // data: '123',
      bottom: false,
      page: 1,
      offset: 0,
      limit: Config.RECORD_PER_PAGE,
      notifyList: [],
      notify_page: {
        currentPage: 1,
        totalItems: 1,
        itemsPerPage: Config.RECORD_PER_PAGE
      }
    }
  },
  computed: {
    ...mapState({
      show: state => state.show
    }),
    ...mapGetters({
      totalRecord: 'show/getTotalRecordShow'
    }),
    shows() {
      return this.show.shows
    },
    searching() {
      return this.show.searching
    }
  },
  mounted() {
    // Add event scroll window
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible();
    });
    // When on url not include query search, access homepage normal, else handle search with query string
    this.$store.dispatch('show/changeIsSearch', this)
    // nextTick to call back after DOM already
    this.$nextTick(() => {
      // If not search, select show from database
      this.getNotifies(1);
      this.addShow();
    });
  },
  methods: {
    ...mapActions('show', ['searchShow', 'listShow']),
    // When scroll on bottom
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      // const pageHeight = document.documentElement.scrollHeight;
      const showItemEl = $('#eventListWrap .show-item')
      if (showItemEl.length > 0) {
        const lastShowItem = document.querySelector('#eventListWrap .show-item:last-child')

        const posScroll = lastShowItem.offsetTop + lastShowItem.clientHeight
        const bottomOfPage = visible + scrollY >= posScroll;

        // Check fixed footer scroll when loading
        if (showItemEl.length >= Config.MAX_RECORD_FIXED_FOOTER) {
          const posElementFixed = $('#eventListWrap .show-item:nth-child(' + (Config.MAX_RECORD_FIXED_FOOTER - 1) + ')')
          if (posElementFixed) {
            let ps = $("#eventListWrap .show-item:nth-child("+(Config.MAX_RECORD_FIXED_FOOTER - 1)+")")[0].offsetTop + $("#eventListWrap .show-item:nth-child("+(Config.MAX_RECORD_FIXED_FOOTER - 1)+")")[0].clientHeight;
            // When load max item show >= 15 item, then fixed footer
            if ($('#eventListWrap .show-item').length >= Config.MAX_RECORD_FIXED_FOOTER
              && ( ps <= visible + scrollY)) {
              $('#mainFooter').addClass('rs-fixed')
            } else {
              $('#mainFooter').removeClass('rs-fixed')
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
    addShow() {
      this.$store.dispatch('show/listShow', this)
    },

    /**
     * Get list notify
     * @return {Promise}
     */
    getNotifies(pageNum) {
      post(_api.NOTIFY_LIST, {
        client_id: this.$route.params.client_id,
        page: pageNum
      }).then(res => {
        const notifiesArray = [];
        for (var notifyItem in res.data.data.notify_list) {
          notifiesArray.push(res.data.data.notify_list[notifyItem]);
        }
        this.notifyList = notifiesArray;
        this.notify_page.totalItems = Number(res.data.data.record_num);
      }).catch(err => {

      })
    },
    pageChanged(pageNum) {
      // event change page , get posts in page
      this.notify_page.currentPage = pageNum;
      this.getNotifies(pageNum);
    }
  },
  watch: {
    // totalRecord(totalRecord){
    //   if (totalRecord) {
    //     this.totalRecord = totalRecord
    //   }
    // },
    searching(searching) {
      if (searching) {
        this.page = 1;
        this.offset = 0;
        this.addShow();
      }
    },
    bottom(bottom) {
      if (bottom) {
        this.page++;
        this.offset++;
        this.offset = (this.page - 1) * this.limit;
        this.addShow();
        console.log(this.shows)
      }
    }
  }
}
