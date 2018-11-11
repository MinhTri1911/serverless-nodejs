/**
 * File ClientBussiness.js
 * Get info by client_id
 *
 * @class ClientBussiness
 * @author Rikkei.DucVN
 * @date 2018-10-05
 */

import { Helper } from "../../../common/Helper";
import _ from "lodash";

class ClientBusiness {
  /**
   * Constructor set instance sequelize
   *
   * @param {*} db
   * @returns { Object } - Returns the current object.
   */
  constructor(db) {
    this.db = db;
    this.helper = new Helper();
    return this;
  }

  /**
   * Function will get info client
   *
   * @param {*} data
   * @param {*}
   * @returns {result query}
   */
  getClient(data) {
    let { client_id } = data;
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql("SQL060.sql");
      this.db
        .query(sql, {
          bind: { client_id: client_id },
          type: this.db.QueryTypes.SELECT
        })
        .then(result => {
          resolve(this.getInfoClient(result));
        })
        .catch(err => {
          console.error(err);
          reject(new Error(`Something Went Wrong ${err}`));
        });
    });
  }

  getInfoClient(clientList) {
    var clientInfo = {};
    if (clientList.length > 0) {
      for (var i = 0; i < clientList.length; i++) {
        clientInfo['apply_end_date'] = clientList[i].apply_end_date;
        clientInfo['apply_start_date'] = clientList[i].apply_start_date;
        clientInfo['client_id'] = clientList[i].client_id;
        clientInfo['client_kn'] = clientList[i].client_kn;
        clientInfo['client_logo_image_kb'] = clientList[i].client_logo_image_kb;
        clientInfo['client_nm'] = clientList[i].client_nm;
        clientInfo['color1'] = clientList[i].color1;
        clientInfo['color2'] = clientList[i].color2;
        clientInfo['color3'] = clientList[i].color3;
        clientInfo['copyright'] = clientList[i].copyright;
        clientInfo['disp_member_nm'] = clientList[i].disp_member_nm;
        clientInfo['enable_kb'] = clientList[i].enable_kb;
        clientInfo['guide'] = clientList[i].guide;
        clientInfo['homepage_address'] = clientList[i].homepage_address;
        clientInfo['inquiry_nm'] = clientList[i].inquiry_nm;
        clientInfo['inquiry_notes'] = clientList[i].inquiry_notes;
        clientInfo['inquiry_tel_no'] = clientList[i].inquiry_tel_no;
        clientInfo['inquiry_url'] = clientList[i].inquiry_url;
        clientInfo['mail_send_disp_kb'] = clientList[i].mail_send_disp_kb;
        clientInfo['member_id_input_disp_kb'] = clientList[i].member_id_input_disp_kb;
        clientInfo['member_id_input_text'] = clientList[i].member_id_input_text;
        clientInfo['member_nm_kb'] = clientList[i].member_nm_kb;
        clientInfo['member_terms_url'] = clientList[i].member_terms_url;
        clientInfo['post_send_disp_kb'] = clientList[i].post_send_disp_kb;
        clientInfo['privacy'] = clientList[i].privacy;
        clientInfo['s3_bucket_name'] = clientList[i].s3_bucket_name;
        clientInfo['s3_service_end_point'] = clientList[i].s3_service_end_point;
        clientInfo['send_mail_address'] = clientList[i].send_mail_address;
        clientInfo['send_nm'] = clientList[i].send_nm;
        clientInfo['specified'] = clientList[i].specified;
        clientInfo['system_type'] = clientList[i].system_type;
        clientInfo['tel_no_kb'] = clientList[i].tel_no_kb;
        clientInfo['terms'] = clientList[i].terms;
        break;
      }
    }
    return clientInfo;
  }
}

export { ClientBusiness };
