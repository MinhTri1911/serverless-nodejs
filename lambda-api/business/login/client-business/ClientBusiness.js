/**
 * File ClientBussiness.js
 * Get info by client_id
 *
 * @class ClientBussiness
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import _ from 'lodash';

class ClientBusiness {
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
   * Function will get data of client
   *
   * @param {*} data
   * @param {*}
   * @returns {result query}
   */
  getClient(data) {
    let {client_id} = data;
    return new Promise((resolve, reject) => {
      let sql = `
        select
          client_id
          , client_nm
          , client_kn
          , homepage_address
          , inquiry_nm
          , inquiry_tel_no
          , inquiry_url
          , inquiry_notes
          , send_mail_address
          , apply_start_date
          , apply_end_date
          , enable_kb
          , client_logo_image_kb
          , send_nm
          , system_type
          , guide
          , privacy
          , specified
          , terms
          , copyright
          , disp_member_nm
          , color1
          , color2
          , color3
          , member_nm_kb
          , tel_no_kb
          , mail_send_disp_kb
          , post_send_disp_kb
          , member_id_input_text
          , member_id_input_disp_kb
          from
          m_client
        where
          client_id = $clientid
          and enable_kb = '1'
          and to_char(now(), 'yyyymmdd') between apply_start_date and apply_end_date`;
      this.db.query(sql, {bind: { clientid: client_id }, type: this.db.QueryTypes.SELECT})
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

export { ClientBusiness }
