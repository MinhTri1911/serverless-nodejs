import {mapState, mapGetters} from 'vuex';
import constant from '@/constant';
import {get, post} from '@/plugins/api';
import Config from '@/constant/config'

export default {
    middleware: 'guest',
    layout: 'default_not_footer',
    head() {
        return {
            title: this.$t('booking_detail.title')
        }
    },
    data() {
        return {
            dataBookingDetail: {}
        }
    },
    computed: {
      ...mapGetters({
        adminTime: 'auth/getAdminTime',
      })
    },
    created() {
        this.initPage();
    },
    methods: {
        
        /**
         * Function init page get show detail info
         *
         * @returns {Array}
        */
        initPage: function () {

            get(constant.api.BOOKING_DETAIL, {
                client_id: this.$route.params.client_id,
                show_group_id: this.$route.query.show_group_id,
                admin_time : this.adminTime
            })
            .then(result => {

                let data = result.data.data;

                if ( data.length == 0) {
                   this.returnPageError();
                } 
                this.dataBookingDetail = data;
            })
            .catch(err => {

                // Will be redirect to page error 570 later
                // this.returnPageError();
            });
        },
        
        returnPageError : function () {
            let path = this.$router.resolve({
                name: constant.router.ERROR_NAME,
                params: {client_id: this.$route.params.client_id}
            });
            this.$router.push(path.href);
        },

        imageMainUrl: function (client_id, show_group_id) {
            return process.env.baseS3Url + Config.PATH_IMG_SHOW_MAIN.replace(':client_id', client_id).replace(':show_group_id', show_group_id)
        },
        
        closeTabWindow() {
            window.close();
        }
    }
};
