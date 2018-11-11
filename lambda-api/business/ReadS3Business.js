/**
 * File ReadS3Business.js
 * Save on database when user logout
 *
 * @class ReadS3Business
 * @author Rikkei.DucVN
 * @date 2018-10-12
 */

import { Helper } from "../common/Helper";
import Axios from "axios";
const iconv = require("iconv-lite");

class ReadS3Business {
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
   * Function will insert table h_login
   *
   * @param {*} data
   * @param {*} ip
   * @returns {result query}
   */
  readS3(data) {
    let { file, client_id } = data;
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql("SQL060.sql");
      this.db
        .query(sql, {
          bind: {
            client_id: client_id
          },
          type: this.db.QueryTypes.SELECT
        })
        .then(result => {
          let url =
            result[0].s3_service_end_point +
            "/" +
            result[0].s3_bucket_name +
            "/" +
            file;
          return Axios.get(url, { responseType: "arraybuffer" })
            .then(function(response) {
              var ctype = response.headers["content-type"];
              var body = "";
              if (ctype == "binary/octet-stream") {
                body = iconv.decode(Buffer.from(response.data), "windows-31j");
              } else {
                body = iconv.decode(Buffer.from(response.data), "utf8");
              }
              resolve(body);
            })
            .catch(function(err) {
              console.error(err);
              reject(new Error(`Something Went Wrong ${err}`));
            });
        })
        .catch(function(err) {
          console.error(err);
          reject(new Error(`Something Went Wrong ${err}`));
        });
    }).catch(err => {
      console.error(err);
      reject(new Error(`Something Went Wrong ${err}`));
    });
  }
}

export { ReadS3Business };
