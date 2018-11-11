import Page404 from "@/components/Error/Page404"
import Page500 from "@/components/Error/Page500"
import PageError from "@/components/Error/PageError"
import Page41x from "@/components/Error/Page41x"
import {mapActions} from 'vuex'

export default  {
  name: "ErrorSystemBusines",
  layout: 'empty',
  components: {
    Page404,
    Page500,
    PageError,
    Page41x
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  created(){
    this.$store.dispatch('error/setError', this.error);
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || `<%= messages.client_error %>`
    }
  },
  methods: {
    ...mapActions('error', ['setError'])
  }
}
