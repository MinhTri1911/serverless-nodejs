import state from './state'
export default {
  isLogin: (state) => {
    return state.authenticated;
  },

  getName: (state) => {
    let checkName = state.user.member_nm;
      if (state.user.member_nm) {
      if (checkName.length<11) {
        return state.user.member_nm;
      } else {
        checkName = checkName.substring(1,10) + '...';
        return checkName;
      }
    }
  },

  getMember: (state) => {
    if (state.user.member_kb_nm && state.user.member_kb_no != '0') {
      return 'の' + state.user.member_kb_nm;
    } else {
      return '';
    }
  },

  getMemberId: (state) => {
    if(state.user ) {
      return state.user.member_id;
    }
    return '';
  },

  getMemberKbNo: (state) => {
    if(state.user ) {
      return state.user.member_kb_no;
    }
    return 0;
  },

  getMemberTypeNo: (state) => {
    if(state.user ) {
      return state.user.member_type_no;
    }
    return 0;
  },

  getAdminTime: (state) => {
    if(state.admin_time ) {
      return state.admin_time.date + ' ' +state.admin_time.hour + ':'+ state.admin_time.minute ;
    }
    return '';
  },

  checkMemberValid: (state) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    let todayStr = ""+yyyy+mm+dd;
    let memberStart = state.user.member_start_date ;
    let memberEnd = state.user.member_end_date ;
    return ((parseInt(memberStart) <= parseInt(todayStr)) && (parseInt(todayStr) <= parseInt(memberEnd)) ) ;
  }
}
