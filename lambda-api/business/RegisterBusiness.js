/**
 * File RegisterBusiness.js
 * Define handler business when register
 *
 * @class RegisterBusiness
 * @author Rikkei.TriHNM
 * @date 2018-10-01
 */
class RegisterBusiness {

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
   * Function get list city
   *
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  getListCity() {
    return new Promise((resolve, reject) => {
      let sql = 'select code_no, code_nm, disp_seq from m_code where code_type_cd = $code_type order by disp_seq';

      this.db.query(sql, { bind: { code_type: '0001' }, type: this.db.QueryTypes.SELECT })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  /**
   * Function get list genre by clientId
   *
   * @param {String} clientId
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  getListGener(clientId) {
    return new Promise((resolve, reject) => {
      let sql = `select
          client_id
          , genre_no
          , genre_nm
          , genre_rk
          , disp_seq
        from
         m_genre
        where
          client_id = $client_id
        order by
        disp_seq`;

      this.db.query(sql, { bind: { client_id: clientId }, type: this.db.QueryTypes.SELECT })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  /**
   * Function handler common when init page input customer infomation
   *
   * @param {String} clientId
   * @memberof RegisterBusiness
   * @returns {Object}
   */
  handlerCommonInitPage(clientId) {
    return new Promise((resolve, reject) => {
      let sql = `select
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
          /*, member_terms_url*/
        from
          m_client
        where
          client_id = $client_id
          and enable_kb = '1'
          and to_char(now(), 'yyyymmdd') between apply_start_date and apply_end_date`;

      this.db.query(sql, { bind: { client_id: clientId }, type: this.db.QueryTypes.SELECT })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  /**
   * Function init page input customer infomation
   *
   * @param {String} clientId
   * @returns {Array}
   * @memberof RegisterBusiness
   */
  initPageRegister(clientId) {
    return new Promise((resolve, reject) => {
      let gener = null;
      let listCity = null;
      let handlerResult = null;

      // Async function get list city
      this.getListCity()
        .then(data => {
          listCity = data;
        })
        .catch(err => {
          reject(new Error(`Error function getListCity: ${err}`));
        });

      // Async function get list gener
      this.getListGener(clientId)
        .then(data => {
          gener = data;
        })
        .catch(err => {
          reject(new Error(`Error function getListGener: ${err}`));
        });

      // Async function get list city
      this.handlerCommonInitPage(clientId)
        .then(data => {
          handlerResult = data;

          // Return data after all query is done
          resolve({ genre: gener, listCity: listCity, flgHandler: handlerResult });
        })
        .catch(err => {

        });
    });
  }

  /**
   * Function search address by post code
   *
   * @param {String} post_no_1
   * @param {String} post_no_2
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  searchPostCode(post_no_1, post_no_2) {
    return new Promise((resolve, reject) => {
      let sql = "select post_no, todofuken_nm, shikuchoson_nm, choiki_nm from m_post_code where post_no = $post_no";
      let post_code = post_no_1 + post_no_2;

      this.db.query(sql, { bind: { post_no: post_code },type: this.db.QueryTypes.SELECT })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error(`Somethign Went Wrong ${err}`));
        });
    });
  }
}

export { RegisterBusiness }
