import ItemShowSchedule from "@/components/Show/ItemShowSchedule"
import ItemShowScheduleMain from "@/components/Show/ItemShowScheduleMain"
import {post, get} from "@/plugins/api"
import _api from "@/constant/api"
import Config from "@/constant/config"
import Router from "@/constant/router"
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'Schedule',
  middleware: "guest",
  components: {
    ItemShowSchedule,
    ItemShowScheduleMain
  },
  head() {
    return {
      title: this.$t('show.title_schedule')
    }
  },
  data() {
    return {
      constant: {
        EXPIRED_SHOW: 1,
        EXPIRED_HIDE: 0,
        SEAT_SELECTION: 1,
        BUTTON_SELECT_SHOW: 1,
        BUTTON_SELECT_HIDE: 0,
        WITH_SELECT_SEAT: Config.LAYOUT_WITH_SEAT,
        NO_SELECT_SEAT: Config.LAYOUT_NO_SEAT
      },
      schedule: null,
      loading: true,
      seeExpired: false,
      page: {
        offset: 0,
        limit: Config.RECORD_PER_PAGE
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getListShowSchedule()
    })
  },
  computed: {
    ...mapGetters({
      searchInfo: 'show/getSearchInfo'
    }),
    clientId() {
      return this.$route.params.client_id
    },
    showGroupId: {
      get: function () {
        return this.$route.params.show_group_id
      },
      set: function (newValue) {
        return newValue
      }
    },
    rsRouter() {
      return Router
    }
  },
  methods: {
    getListShowSchedule() {
      this.$nuxt.$loading.start()
      post(_api.SHOW_LIST_SCHEDULE, {
        client_id: this.clientId,
        show_group_id: this.showGroupId,
        see_expired: this.seeExpired,
        offset: this.page.offset,
        limit: this.page.limit
      })
        .then(res => {
          if (res.data.data && res.data.data.record_num > 0) {
            this.schedule = res.data.data
          }
          console.log(this.schedule.schedule_list)
          this.loading = false
          this.$nuxt.$loading.finish()
        })
        .catch(err => {
          this.loading = false
          this.$nuxt.$loading.finish()
        })
    },
    redirectToHome() {
      // When user click button search, then next page.
      // After redirect home page, get list show back from search
      if (this.$route.query.searching) {
        return this.$router.push({name: Router.LISTPERFORM, params: {client_id: this.clientId}, query: this.searchInfo})
      }
      return this.$router.push({name: Router.LISTPERFORM, params: {client_id: this.clientId}})
    }
  }
}
