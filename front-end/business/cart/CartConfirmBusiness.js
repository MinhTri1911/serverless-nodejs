import {mapState, mapGetters} from 'vuex';
import constant from '@/constant';
import {get, post} from '@/plugins/api';
import Breadcrumb from '@/components/Cart/Breadcrumb';
import ShowDetail from '@/components/Cart/ShowDetail';
import TotalPayment from '@/components/Cart/TotalPayment';
import ListFee from '@/components/Cart/ListFee';
import TotalPaymentAmount from '@/components/Cart/TotalPaymentAmount';
import InfoReceive from '@/components/Cart/InfoReceive';
import PaymentType from '@/components/Cart/PaymentType';

export default {
  components: {
    Breadcrumb,
    ShowDetail,
    TotalPayment,
    ListFee,
    TotalPaymentAmount,
    PaymentType,
    InfoReceive
  },
  data() {
    return {
      step: 3,
      type: 'confirm',
    }
  }
}