/**
 * File MyPageBusiness.js
 * Show MyPage
 *
 * @author Rikkei.DucVN
 * @date 2018-10-12
 */

import constant from '@/constant';
import { get } from '@/plugins/api';
import { mapState } from 'vuex';

const CONBINI_TYPE = '103';

export default {
  name: 'MaintenanceBusiness',
  layout: 'default',
  middleware: 'authenticated',
  head() {
    return {
      title: this.$t('common.links.my_page')
    }
  },
  data: () => ({
    routerNameHistoryOrder: constant.router.HISTORY_ORDER,
    routerNameUpdateInfomation: constant.router.UPDATE_INFOMATION,
    dataInit: {
      listHistory: [],
      member: {},
      historyMember: [],
      memberCheck: {},
      orderCheck: {}
    },
    dataShow: [],
    flagShowRegisterMember: false,
    isConbiniType: false,
    flagShowMemberInfo: 0,
    flagShowButtonRegisterMember: false,
    flagShowMessage: false,
    message: '',
    flagShowHistoryMember: false
  }),
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    })
  },
  created() {
    this.initPage();
  },
  computed: {
    ...mapState({
      auth: state => state.auth
    })
  },
  methods: {
    /**
     * Function init page
     *
     * @returns {void}
     */
    initPage() {
      get(constant.api.MY_PAGE_INIT, { client_id: this.$route.params.client_id, member_id: this.auth.user.member_id })
        .then(res => {
          this.dataInit.listHistory = res.data.data.member_list_information;
          this.dataInit.member = res.data.data.member_information;
          this.dataInit.memberCheck = res.data.data.member_check;
          this.dataInit.orderCheck = res.data.data.check_exists_order;

          // Sort history member
          // this.sortArray(this.dataInit.listHistory);

          // Get first 5 record
          for (let index = 0; index < 5; index++) {
            if (this.dataInit.listHistory[index]) {
              this.dataInit.historyMember.push(this.dataInit.listHistory[index]);

              this.isConbiniType = this.dataInit.listHistory[index].settle_cd == CONBINI_TYPE;
            }
          }

          this.getInfToShowMember();
          this.flagShowMemberInfo = this.dataShow.length != 0;
          this.flagShowHistoryMember = this.dataInit.historyMember.length != 0;
          this.checkShowBtnJoinGroup();
        }).catch(err => {
          console.log(err);
          return;
          // Add message error
          this.$store.dispatch('auth/setError', [
            this.$t('message.msg003_exception.line_1'),
            this.$t('message.msg003_exception.line_2'),
            this.$t('message.msg003_exception.line_3')
          ]);

          // Redirect to page error 570
          let path = this.$router.resolve({
            name: constant.router.ERROR_NAME,
            params: { client_id: this.$route.params.client_id }
          });

          this.$router.push(path.href);
        });
    },

    /**
     * Function split string to date
     *
     * @param {String} str
     * @param {Boolean} option
     * @returns {String}
     */
    splitDate(str, option = false) {
      if (!str) return str;

      if (option) {
        return {
          year: str.slice(0, 4),
          month: str.slice(4, 6),
          day: str.slice(6, 8)
        }
      }

      return str.slice(0, 4) + '/' + str.slice(4, 6) + '/' + str.slice(6, 8);
    },

    /**
     * Function sort array by member_start_date
     *
     * @param {Array} arr
     * @returns {Array}
     */
    sortArray(arr) {
      return arr.sort((first, second) => {
        return parseInt(second.member_start_date) - parseInt(first.member_start_date);
      });
    },

    /**
     * Function return status history member
     *
     * @param {String} startDate
     * @param {String} endDate
     * @param {String} nyukinFlg
     * @returns {String}
     */
    returnStatus(startDate, endDate, nyukinFlg) {
      let now = new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, '');

      if (parseInt(now) > parseInt(endDate)) {
        return this.$t('myPage.lb_expired');
      }

      if (parseInt(startDate) <= parseInt(now) && parseInt(now) <= parseInt(endDate) && nyukinFlg == '1') {
        return this.$t('myPage.lb_member_enable');
      }

      if (parseInt(now) <= parseInt(endDate) && nyukinFlg == '0') {
        return this.$t('myPage.lb_had_register');
      }

      if (parseInt(now) <= parseInt(startDate) && nyukinFlg == '1') {
        return this.$t('myPage.lb_had_updated');
      }
    },

    /**
     * Function add member inf to array
     *
     * @return {void}
     */
    getInfToShowMember() {
      let now = parseInt(new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, ''));

      this.dataInit.listHistory.forEach(member => {
        let start = parseInt(member.member_start_date);
        let end = parseInt(member.member_end_date);

        if ((start <= now && now <= end)
          && (member.condition_kb == '1' || member.condition_kb == '2' || member.condition_kb == '3')
        ) {
          this.dataShow.push(member);
        }
      });
    },

    /**
     * Function check show button join group
     *
     * @returns {boolean}
     */
    checkShowBtnJoinGroup() {
      // Is not have join group
      if (!this.dataInit.listHistory.length) {
        this.flagShowButtonRegisterMember = true;

        return this.flagShowButtonRegisterMember;
      }

      let now = parseInt(new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, ''));

      // Check is update or expired
      this.dataShow.forEach(history => {
        let start = parseInt(history.member_end_date);
        let end = parseInt(history.member_end_date);

        if (!(start < now && now < end  && history.condition_kb != '2')
          || !(start <= now && now <= end && history.condition_kb == '2')
        ) {
          this.flagShowButtonRegisterMember = true;
        }
      });

      return this.flagShowButtonRegisterMember;
    },

    /**
     * Function return name button join group
     *
     * @returns {String}
     */
    renderNameButton() {
      // Is not have join group
      if (!this.dataInit.listHistory.length) {
        return this.$t('myPage.lb_register_join_group');
      }

      if (!this.dataShow.length) return '';

      let str = '';
      let now = parseInt(new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, ''));

      // Check is update or expired
      this.dataShow.forEach(history => {
        let start = parseInt(history.member_end_date);
        let end = parseInt(history.member_end_date);

        if (!(start < now && now < end && history.condition_kb != '2')) {
          str = this.$t('myPage.lb_register_join_group');
          return;
        }

        if (!(start <= now && now <= end && history.condition_kb == '2')) {
          str = this.$t('myPage.lb_register_update');
          return;
        }
      });

      return str;
    },

    /**
     * Function check member before join group
     *
     * @returns {String|void}
     */
    checkMember() {
      if (this.dataInit.memberCheck.check_flg == '0') {
        this.message = this.$t('message.msg083_can_not_update', { group: this.dataInit.member.disp_member_nm });
        this.flagShowMessage = true;

        return;
      } else if (this.dataInit.orderCheck.check_flg == '0') {
        $('#dialog-error').modal('show');
      } else {
        // Redirect to page 470 later
        alert('Redirect to page 470');
      }
    }
  }
}
