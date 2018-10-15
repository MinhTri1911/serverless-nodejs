import ItemShowSchedule from "@/components/Show/ItemShowSchedule"
import ItemShowScheduleMain from "@/components/Show/ItemShowScheduleMain"
import {post, get} from "@/plugins/api"
import _api from "@/constant/api"

export default {
  name: 'Schedule',
  middleware: "guest",
  components: {
    ItemShowSchedule,
    ItemShowScheduleMain
  },
  data() {
    return {
      schedules: []
    }
  },
  created() {
    this.getListShowSchedule()
  },
  computed: {
    clientId() {
      return this.$route.params.client_id
    }
  },
  methods: {
    getListShowSchedule() {
      post(_api.SHOW_LIST_SCHEDULE, {})
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
