/**
 * File LoginBusiness.js
 * Check email and password to Login
 *
 * @class LoginBusiness
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import crypto from 'crypto';

const secretKey = process.env.SECRET_KEY;
class LoginBusiness {
  /**
   * Constructor set instance sequelize
   *
   * @param {*} db
   * @returns { Object } - Returns the current object.
   */
  constructor(db) {
    this.db = db;
    return this;
	}

  /**
   * Function will get data client by email and password and update table h_login
   *
   * @param {*} data
   * @param {*} ip
   * @returns {result query}
   */
  getUserByEmail(data, clientIp ) {
    let { mail, password, client_id } = data;
    let ip = clientIp;
    password = crypto.createHash('sha256').update(secretKey + password).digest('hex')
    return new Promise((resolve, reject) => {
      let sql = `
        select
          a.client_id,
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
          , b.member_kb_no
          , b.member_type_no
          , b.member_start_date
        , case
          when b.entry_cd = '1'
            then b.member_end_date
          when b.entry_cd = '2'
            then e.max_member_end_date
          else ''
          end as member_end_date
          , b.entry_cd
          , b.unit
          , c.member_kb_nm
          , d.member_type_nm
          , d.limit_kb
        from
        m_member a
        left join h_member b
          on a.client_id = b.client_id
          and a.member_id = b.member_id
          and to_char(now(), 'yyyymmdd') between b.member_start_date and b.member_end_date
          and b.nyukin_flg = '1'
        inner join m_member_kb c
          on b.client_id = c.client_id
          and b.member_kb_no = c.member_kb_no
          and c.del_flg = '0'
        inner join m_member_type d
          on b.client_id = d.client_id
          and b.member_kb_no = d.member_kb_no
          and b.member_type_no = d.member_type_no
          and d.del_flg = '0'
        inner join (
          select
          client_id
            , h_member.member_id
            , max(h_member.member_end_date) as max_member_end_date
          from
          h_member
          where
            client_id = $clientid
            and nyukin_flg = '1'
            and member_end_date >= to_char(now(), 'yyyymmdd')
          group by
          h_member.client_id
            , h_member.member_id
        ) e
          on b.client_id = e.client_id
          and b.member_id = e.member_id
      where
        a.client_id = $clientid
        and a.admission_kb = '1'
        and a.member_pass = $password
        and (
          LOWER(a.mail_address) = LOWER($idlogin)
          or a.login_id = $idlogin
        );`;

    this.db.query(sql, {bind: { clientid: client_id, idlogin: mail, password: password }, type: this.db.QueryTypes.SELECT})
      .then(result => {

				// Select successful we insert to h_login
        if (result!='' && result[0].black_cd!='1') {
          let sqlInsert = `
						insert into h_login(
							client_id
							, member_id
							, login_kb
							, login_dtime
							, result_kb
							, ip_address
						) values (
							$clientid
							, $memberid
							, $loginkb
							, now()
							, $result_kb
              , $ip_address)`;
  				this.db.query(sqlInsert, {
            bind: {
              result_kb: '1',
              loginkb: '1',
              clientid: client_id,
              memberid: result[0].member_id,
              ip_address: ip
            },
						type: this.db.QueryTypes.INSERT
						})
					.catch(function(err) {
            console.error(err);
          });
        }

        // Select fail we insert to h_login
        else {
					let sqlInsert = `insert into h_login(
            client_id
            , member_id
            , login_kb
            , login_dtime
            , result_kb
            , ip_address
          ) values (
            $clientid
            , $memberid
            , $loginkb
            , now()
            , $result_kb
            , $ip_address)`;
          this.db.query(sqlInsert, {
            bind: {
              result_kb: '2',
              loginkb: '1',
              clientid: client_id,
              memberid: '',
              ip_address: ip
            },
            type: this.db.QueryTypes.INSERT
          })
          .catch(function(err) {
          });
        }

      resolve(result);
      })
      .catch(err => {
        console.error(err);
        reject(new Error(`Something Went Wrong ${err}`));
      });
    });
	}

	/**
	 * Function to check data user by token
	 *
	 * @param {token} data
	 * @returns {result query} result
	 */
  getUserByToken(data) {
		let { client_id, member_id, member_pass, mail_address, iat, exp } = data;
    return new Promise((resolve, reject) => {
      let sql = `
        select
          client_id,
          member_id,
          member_pass,
          mail_address
        from m_member
        where
          client_id = $clientid
          and member_id = $memberid
          and member_pass = $password
          and (
            mail_address = $idlogin
            or login_id = $idlogin
          )`;
      this.db.query(sql, {
        bind: {
          idlogin: mail_address,
          password: member_pass,
          clientid: client_id ,
          memberid: member_id
        }, type: this.db.QueryTypes.SELECT
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        console.error(err);
        reject(new Error(`Something Went Wrong ${err}`));
      });
    });
  }
}

export { LoginBusiness }
