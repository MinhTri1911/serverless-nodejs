/**
 * File RegisterBusiness.js
 * Define handler business when register
 *
 * @class RegisterBusiness
 * @author Rikkei.TriHNM
 * @date 2018-10-01
 */

import { Helper } from '../common/Helper';

class RegisterBusiness {

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
   * Function get list city
   *
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  getListCity() {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL001.sql');

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
      let sql = this.helper.loadSql('SQL002.sql');

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
      let sql = this.helper.loadSql('SQL060.sql');

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
      let genre = null;
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
          genre = data;
        })
        .catch(err => {
          reject(new Error(`Error function getListGener: ${err}`));
        });

      // Async function get list city
      this.handlerCommonInitPage(clientId)
        .then(data => {
          handlerResult = data;

          // Return data after all query is done
          resolve({ genre: genre, listCity: listCity, flgHandler: handlerResult });
        })
        .catch(err => {
          reject(new Error(`Error function handlerCommonInitPage: ${err}`));
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
      let sql = this.helper.loadSql('SQL009.sql');
      let post_code = post_no_1 + post_no_2;

      this.db.query(sql, { bind: { post_no: post_code }, type: this.db.QueryTypes.SELECT })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(new Error(`Error function searchPostCode: ${err}`));
        });
    });
  }

  /**
   * Function check exists mail when register
   *
   * @param {String} mail
   * @param {String} clientId
   * @memberof RegisterBusiness
   * @returns {Object}
   */
  checkExistsMail(mail, clientId) {
    return new Promise((resolve, reject) => {
      let sql = this.helper.loadSql('SQL008.sql');

      this.db.query(sql, { bind: { mail: mail, client_id: clientId }, type: this.db.QueryTypes.SELECT })
        .then(data => {
          // Data return one record kbn
          resolve(data[0]);
        })
        .catch(err => {
          reject(new Error(`Error function checkExistsMail: ${err}`));
        });
    });
  }

  /**
   * Function check exists member code
   *
   * @param {Object} data
   * @returns {Object}
   */
  checkExistsMemberCode(data) {
    return new Promise((resolve, reject) => {
      let { code, clientId, memberNm, memberKn, mobileNo, telNo } = data;
      let sql = this.helper.loadSql('SQL010.sql');
      let condition = null;

      if (mobileNo != '' && telNo != '') {
        condition = `and (
            replace (a.tel_no, '-', '') = replace ($tel_no, '-', '')
            or replace (a.mobile_no, '-', '') = replace ($mobile_no, '-', '')
          )`;
      }

      if (mobileNo == '' && telNo != '') {
        condition = `/*%if form.tel_no != "" and form.mobile_no == "" */
          and replace (a.tel_no, '-', '') = replace ($tel_no, '-', '')
          /*%end*/`;
      }

      if (mobileNo != '' && telNo == '') {
        condition = `/*%if form.tel_no == "" and form.mobile_no != "" */
          and replace (a.mobile_no, '-', '') = replace ($mobile_no, '-', '')
          /*%end*/`;
      }

      // Replace parameter $condition to string
      sql = sql.replace("$condition", condition);

      this.db.query(sql, {
        bind: {
          code: code,
          client_id: clientId,
          member_nm: memberNm,
          member_kn: memberKn,
          mobile_no: mobileNo,
          tel_no: telNo
        }, type: this.db.QueryTypes.SELECT
      }).then(data => {

          // Data return one record macth_flg
          resolve(data[0]);
        })
        .catch(err => {
          reject(new Error(`Error function checkExistsMemberCode: ${err}`));
        });
    });
  }

  /**
   * Function get id member by numbering_cd
   *
   * @param {String} clientId
   * @param {String} numberingCd
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  getIdMemberAndUpdate(clientId, numberingCd) {
    // return new Promise((resolve, reject) => {
      let sqlSelect = this.helper.loadSql('SQL052.sql');
      let sqlUpdate = this.helper.loadSql('SQL053.sql');
      let member = null;

      return this.db.query(sqlSelect, { bind: { client_id: clientId, numbering_cd: numberingCd }, type: this.db.QueryTypes.SELECT })
        .then(data => {
          member = data[0];

          let dataUpdate = this.db.query(sqlUpdate, {
            bind: {
              id_now: parseInt(member.id_now)  + 1,
              upd_pg_id: 'P0240CustomerRegist',
              upd_client_id: clientId,
              upd_employee_cd: 'test' + ' ' + (parseInt(member.id_now) + 1),
              client_id: clientId,
              numbering_cd: numberingCd
            },
          }).spread((results, metadata) => {
            console.log(results, metadata);

            return results;
          });

          return {
            member: member,
            dataUpdate: dataUpdate
          };
        })
        .catch(err => {
          throw new Error(err);
        });
  }

  createUser(clientId, numberingCd) {
    return new Promise((reslove, reject) => {
      // Create transaction
      this.db.transaction(t => {
        let memberId = this.getIdMemberAndUpdate(clientId, numberingCd)
          .then(data => {
            return data;
          });

        return memberId;
      })
      .then(data => {
        // Commit transaction
        console.log(data);

        reslove(data);
      })
      .catch(err => {
        // Rollback transaction
        console.log(err);

        reject(new Error(`Error function createUser: ${err}`));
      });
    });
  }
}

export { RegisterBusiness }
