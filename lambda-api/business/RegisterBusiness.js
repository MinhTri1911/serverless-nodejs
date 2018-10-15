/**
 * File RegisterBusiness.js
 * Define handler business when register
 *
 * @class RegisterBusiness
 * @author Rikkei.TriHNM
 * @date 2018-10-01
 */

import { Helper } from '../common/Helper';
import crypto from 'crypto';

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
   * @param {Object} transaction
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  getIdMemberAndUpdate(clientId, numberingCd, transaction) {
    let sqlSelect = this.helper.loadSql('SQL052.sql');
    let sqlUpdate = this.helper.loadSql('SQL053.sql');
    let member = null;

    return this.db.query(sqlSelect, {
      bind: {
        client_id: clientId,
        numbering_cd: numberingCd
      },
      type: this.db.QueryTypes.SELECT
    }).then(data => {
      member = data[0];

      if ((parseInt(member.id_now) + 1) > member.id_max) {
        throw new Error('Member id is bigger than member_id max');
      }

      return this.db.query(sqlUpdate, {
        bind: {
          id_now: parseInt(member.id_now) + 1,
          upd_pg_id: 'P0240CustomerRegist',
          upd_client_id: clientId,
          upd_employee_cd: 'test' + ' ' + (parseInt(member.id_now) + 1),
          client_id: clientId,
          numbering_cd: numberingCd
        },
        type: this.db.QueryTypes.UPDATE,
        transaction: transaction
      }).spread((results, metadata) => {

        return {
          member: member,
          dataUpdate: results
        };
      }).catch(err => {
        throw new Error(err);
      });
    }).catch(err => {
      throw new Error(err);
    });
  }

  /**
   * Function insert member
   *
   * @param {Object} data
   * @param {Object} transaction
   * @returns {void}
   * @memberof RegisterBusiness
   */
  insertMember(data, transaction) {
    let {
      clientId,
      memberId,
      memberPass,
      memberNm,
      memberKn,
      postNo,
      prefecture,
      municipality,
      address1,
      address2,
      telNo,
      mobileNo,
      mailAddress,
      mailSendFlg,
      postSendFlg,
      sexType,
      birthday,
      ninsyouKey,
      insPgId,
      insClientId,
      insEmployeeCd,
      updPgId,
      updClientId,
      updEmployeeCd,
      combineMemberId
    } = data;

    let sql = this.helper.loadSql('SQL016.sql');

    return this.db.query(sql, {
      bind: {
        client_id: clientId,
        member_id: memberId,
        member_pass: memberPass,
        member_nm: memberNm,
        member_kn: memberKn,
        post_no: postNo,
        prefecture: prefecture,
        municipality: municipality,
        address1: address1,
        address2: address2,
        tel_no: telNo,
        mobile_no: mobileNo,
        mail_address: mailAddress,
        mail_send_flg: mailSendFlg,
        post_send_flg: postSendFlg,
        sex_type: sexType,
        birthday: birthday,
        ninsyou_key: ninsyouKey,
        ins_pg_id: insPgId,
        ins_client_id: insClientId,
        ins_employee_cd: insEmployeeCd,
        upd_pg_id: updPgId,
        upd_client_id: updClientId,
        upd_employee_cd: updEmployeeCd,
        combine_member_id: combineMemberId
      },
      type: this.db.QueryTypes.INSERT,
      transaction: transaction
    }).then(data => {
      return true;
    }).catch(err => {
      transaction.rollback();
      throw new Error(err);
    });
  }

  /**
   * Function create member
   *
   * @param {Object} parameter
   * @returns {boolean}
   * @memberof RegisterBusiness
   */
  createUser(parameter) {
    return new Promise((reslove, reject) => {
      let memberId = null;

      // Create transaction
      this.db.transaction(t => {
        // First get id member and update
        return this.getIdMemberAndUpdate(parameter.clientId, parameter.numberingCd, t)
          .then(data => {
            // Second then create member
            const secretKey = process.env.SECRET_KEY;
            let password = crypto.createHash('sha256').update(secretKey + parameter.password).digest('hex');

            let memberInf = {
              clientId: parameter.clientId,
              memberId: data.member.id_now,
              memberPass: password,
              memberNm: parameter.fullName,
              memberKn: parameter.furigana,
              postNo: parameter.postNo,
              prefecture: parameter.prefecture,
              municipality: parameter.municipality,
              address1: parameter.address1,
              address2: parameter.address2,
              telNo: parameter.telNo,
              mobileNo: parameter.mobileNo,
              mailAddress: parameter.mail,
              mailSendFlg: parameter.mailSendFlg,
              postSendFlg: parameter.postSendFlg,
              sexType: parameter.sexType,

              // Replace - in string
              birthday: parameter.birthday.replace(/-/g, ''),
              ninsyouKey: 'Test@MinhTri1911',
              insPgId: 'P0240CustomerRegist',
              insClientId: parameter.clientId,
              insEmployeeCd: 'test',
              updPgId: 'P0240CustomerRegist',
              updClientId: parameter.clientId,
              updEmployeeCd: 'test',
              combineMemberId: ''
            }

            memberId = data.member.id_now;

            return this.insertMember(memberInf, t);
          })
          .then(data => {
            // If have genre then insert to m_member_genre
            let listGenre = parameter.listGenre;

            if (!listGenre.length) {
              return true;
            }

            let sql = this.helper.loadSql('SQL062.sql');

            // Loop genre and insert
            return listGenre.forEach(element => {
              let value = {
                client_id: parameter.clientId,
                member_id: memberId,
                genre_no: element,
                ins_pg_id: 'test',
                ins_client_id: parameter.clientId,
                ins_employee_cd: 'test',
                upd_pg_id: 'test',
                upd_client_id: parameter.clientId,
                upd_employee_cd: 'test'
              }

              return this.db.query(sql, { bind: value, transaction: t, type: this.db.QueryTypes.INSERT });
            });
          }).then(data => {
            return this.helper.loadTemplate('temp-success-register', {
              link: process.env.URL_CLIENT + '/test1/temp-success-register/' + 'Test@MinhTri1911',
              content: '123123',
              head: 'Hello ' + parameter.mail
            });
          }).then(html => {
            t.rollback();
            return this.helper.sendEmail('trihnm@rikkeisoft.com', [parameter.mail], 'Send mail success register', '', html);
          });
      }).then(data => {
        t.rollback();
        // Commit transaction
        reslove(true);
      }).catch(err => {
        // Rollback transaction
        reject(new Error(`Error function createUser: ${err}`));
      });
    });
  }
}

export { RegisterBusiness }
