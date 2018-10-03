import LambdaEnvVars from "lambda-env-vars";
import { Member } from "../models/Member";
const lambdaEnvVars = new LambdaEnvVars();

// const Member =  require ("../models/Member");

class MemberBusiness {
  /**
   * Constructor for Credits.
   *
   * @return  {object}  - Returns the current object.
   */
  constructor(db) {
    this.db = db;
    let member = new Member();
    this.memberModel = member.defineMemberSchema(this.db);

    return this;
  }

  getMember() {
    // let { client_id, account_id, account_password, mail_address, iat, exp } = data

    return new Promise((resolve, reject) => {
      this.db.query(`select
      a.member_id
      , a.member_pass
      , a.member_nm
      , a.member_kn
      , a.post_no
      , a.prefecture
      , a.municipality
      , a.address1
      , a.address2
      , a.tel_no
      , a.mobile_no
      , a.mail_address
      , a.mail_send_flg
      , a.post_send_flg
      , a.black_cd
      , a.sex_type
      , a.birthday
      , a.admission_kb
      , a.admission_date
      , a.withdraw_kb
      , a.withdraw_date

    from
      ticket2.m_member a

    where
      a.client_id = '1'

    `)
      .then(result => {
        console.log(result);

        resolve('123');
        // We don't need spread here, since only the results will be returned for select queries
      })

      // this.memberModel.findAll({

      // })
      // .then(data => {
      //   let result = {
      //     result: data
      //   }

      //   resolve(result);
      // })
      // .catch(err => {
      //   reject(new Error(`Something Went Wrong ${err}`));
      // });
    });
  }
}

export { MemberBusiness };
