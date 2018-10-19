import state from './state'
export default {
  isLogin: (state) => {
    return state.authenticated;
  },

  getName: (state) => {
    let checkName = state.user.name;
      if (state.user.name) {
      if (checkName.length<11) {
        return state.user.name;
      } else {
        checkName = checkName.substring(1,10) + '...';
        return checkName;
      }
    }
  },

  getMember: (state) => {
    if (state.user.member_kb_nm && state.user.member_kb_no != '0') {
      return state.user.member_kb_nm;
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
