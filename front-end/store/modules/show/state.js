import Config from "@/constant/config"
export default {
  isClickBtnSearch: false,
  searchInfo: {},
  searching: false,
  shows: [],
  refresh: false,
  totalRecord: 0,
  paginate: {
    page: 1,
    limit: Config.RECORD_PER_PAGE
  }
}
