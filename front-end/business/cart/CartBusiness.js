import {mapState, mapGetters} from 'vuex';
import constant from '@/constant';
import {get, post} from '@/plugins/api';
import Breadcrumb from '@/components/Cart/Breadcrumb';
import ShowDetail from '@/components/Cart/ShowDetail';
import TotalPayment from '@/components/Cart/TotalPayment';

export default {
  components: {
    Breadcrumb,
    ShowDetail,
    TotalPayment,
  },
  middleware: 'guest',
  head() {
    return {
      title: this.$t('cart.lb_cart'),
    }
  },
  data() {
    return {
      step: 1,
      type: 'cart',
      cartDetail:[]
    }
  },
  computed: {
    cartDetailGroup(){
      let result = {} ;
      if(this.cartDetail.length >0) {

        this.cartDetail.forEach(function (el) {

          if (typeof(result[el.show_nm]) === 'undefined') {

            result[el.show_nm] = [];

          }

          result[el.show_nm].push(el);

        });
      }

      return result;
    }
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
        get(constant.api.CART_DETAIL, {
          client_id: this.$route.params.client_id,
          cart_id: this.$route.query.show_group_id
        })
        .then(result => {
          this.cartDetail = result.data.data;
          //finish loading
          this.$nuxt.$loading.finish();
        })
        .catch(err => {
          // Will be redirect to page error 570 later
          console.log(err);
        });


    }


  }
}