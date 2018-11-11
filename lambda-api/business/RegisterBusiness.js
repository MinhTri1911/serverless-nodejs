/**
 * File RegisterBusiness.js
 * Define handler business when register
 *
 * @class RegisterBusiness
 * @author Rikkei.TriHNM
 * @date 2018-10-01
 */

import { Helper } from '../common/Helper';
import config from '../config/Constant';
import _ from 'lodash';
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
          resolve({ genre: genre, list_city: listCity, flg_handler: handlerResult });
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

      sql = sql.replace('$condition', '');

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
      let { code, client_id, member_nm, member_kn, mobile_no, tel_no } = data;
      let sql = this.helper.loadSql('SQL010.sql');
      let condition = null;

      if (mobile_no != '' && tel_no != '') {
        condition = `and (
            replace (a.tel_no, '-', '') = replace ($tel_no, '-', '')
            or replace (a.mobile_no, '-', '') = replace ($mobile_no, '-', '')
          )`;
      }

      if (mobile_no == '' && tel_no != '') {
        condition = `/*%if form.tel_no != "" and form.mobile_no == "" */
          and replace (a.tel_no, '-', '') = replace ($tel_no, '-', '')
          /*%end*/`;
      }

      if (mobile_no != '' && tel_no == '') {
        condition = `/*%if form.tel_no == "" and form.mobile_no != "" */
          and replace (a.mobile_no, '-', '') = replace ($mobile_no, '-', '')
          /*%end*/`;
      }

      // Replace parameter $condition to string
      sql = sql.replace("$condition", condition);

      console.log(data);

      this.db.query(sql, {
        bind: {
          code: code,
          client_id: client_id,
          member_nm: member_nm,
          member_kn: member_kn,
          mobile_no: mobile_no,
          tel_no: tel_no
        }, type: this.db.QueryTypes.SELECT
      }).then(data => {
        console.log(data);
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
   * @param {Object} transaction
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  getIdMemberAndUpdate(clientId, transaction) {
    let sqlSelect = this.helper.loadSql('SQL052.sql');
    let sqlUpdate = this.helper.loadSql('SQL053.sql');
    let member = null;

    return this.db.query(sqlSelect, {
      bind: {
        client_id: clientId
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
          upd_pg_id: process.env.UPD_PG_ID,
          upd_client_id: clientId,
          upd_employee_cd: process.env.UPD_EMPLOYEE_CD,
          client_id: clientId
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
      insClientId,
      updClientId,
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
        ins_pg_id: process.env.INS_PG_ID,
        ins_client_id: insClientId,
        ins_employee_cd: process.env.INS_EMPLOYEE_CD,
        upd_pg_id: process.env.UPD_PG_ID,
        upd_client_id: updClientId,
        upd_employee_cd: process.env.UPD_EMPLOYEE_CD,
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
      let ninsyouKey = null;
      let memberIdInsert = null;
      let sendNm = null;
      let sendAddress = null;
      let mailTitle = null;
      let mailContents = null;
      let contentSendMail = null;
      let memberInfo = null;

      // Create transaction
      this.db.transaction(t => {
        // First get id member and update
        return this.getIdMemberAndUpdate(parameter.client_id, t)
          .then(data => {
            // Second then create member
            const secretKey = process.env.SECRET_KEY;
            let password = crypto.createHash('sha256').update(secretKey + parameter.password).digest('hex');

            ninsyouKey = crypto.createHash('sha256').update(parameter.clientId + data.member.id_now).digest('hex');
            memberIdInsert = parameter.member_code ? parameter.member_code : data.member.id_now;

            let memberInf = {
              clientId: parameter.client_id,
              memberId: data.member.id_now,
              memberPass: password,
              memberNm: parameter.full_name,
              memberKn: parameter.furigana,
              postNo: parameter.post_no,
              prefecture: parameter.prefecture,
              municipality: parameter.municipality,
              address1: parameter.address1,
              address2: parameter.address2,
              telNo: parameter.tel_no,
              mobileNo: parameter.mobile_no,
              mailAddress: parameter.mail,
              mailSendFlg: parameter.mail_send_flg,
              postSendFlg: parameter.post_send_flg,
              sexType: parameter.sex_type,

              // Replace - in string
              birthday: parameter.birthday.replace(/-/g, ''),
              ninsyouKey: ninsyouKey,
              insClientId: parameter.client_id,
              updClientId: parameter.client_id,
              combineMemberId: parameter.member_code
            }

            memberId = data.member.id_now;

            return this.insertMember(memberInf, t);
          }).then(data => {
            // If have genre then insert to m_member_genre
            let listGenre = parameter.list_genre;

            if (!listGenre.length) {
              return true;
            }

            let sql = this.helper.loadSql('SQL062.sql');

            // Loop genre and insert
            return listGenre.forEach(element => {
              let value = {
                client_id: parameter.client_id,
                member_id: memberId,
                genre_no: element,
                ins_pg_id: process.env.INS_PG_ID,
                ins_client_id: parameter.client_id,
                ins_employee_cd: process.env.INS_EMPLOYEE_CD,
                upd_pg_id: process.env.UPD_PG_ID,
                upd_client_id: parameter.client_id,
                upd_employee_cd: process.env.INS_EMPLOYEE_CD
              }

              return this.db.query(sql, { bind: value, transaction: t, type: this.db.QueryTypes.INSERT });
            });
          }).then(data => {
            return this.helper.setApiKey(this.db);
          }).then(data => {
            // Load content mail from database
            return this.getTempletEmail(parameter.client_id, config.CodeTemplate.COMPLETE_REGISTER_TEMPORARY);
          }).then(data => {
            // Get infomation send name, send address
            contentSendMail = data;
            let sql060 = this.helper.loadSql('SQL060.sql');

            return this.db.query(sql060, { bind: { client_id: parameter.client_id }, type: this.db.QueryTypes.SELECT })
              .then(record => {
                contentSendMail.send_nm = record[0].send_nm;
                contentSendMail.send_mail_address = record[0].send_mail_address;
                sendNm = record[0].send_nm;
                sendAddress = record[0].send_mail_address;
                mailTitle = contentSendMail.mail_title;

                return contentSendMail;
              });
          }).then(data => {
            // Bind data to template mail
            let now = new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, '');
            let time = new Date().getHours() + ':' + new Date().getMinutes();

            return this.helper.loadTemplate('temp-success-register', {
              link: process.env.URL_CLIENT + parameter.client_id + '/register/complete?key=' + ninsyouKey,
              contents: this.helper.replaceTextToEndLine(data.mail_contents),
              signature: this.helper.replaceTextToEndLine(data.signature),
              mail: parameter.mail,
              year: now.slice(0, 4),
              month: now.slice(4, 6),
              day: now.slice(6, 8),
              time: time,
              nameFlg: contentSendMail.name_flg,
              memberNm: parameter.full_name
            });
          }).then(html => {
            // Get infomation member by sql104
            mailContents = html;
            let sqlLoadInfRegister = this.helper.loadSql('SQL104.sql');

            return this.db.query(sqlLoadInfRegister, {
              bind: {
                client_id: parameter.client_id,
                member_id: memberId
              },
              type: this.db.QueryTypes.SELECT
            }).then(record => {
              if (!record.length) {
                throw new Error('Member not found after register');
              }

              memberInfo = record[0];

              return record[0];
            }).then(infoMember => {
              // Send mail via api v3 sendgrid
              return this.helper.sendMailByApiV3(contentSendMail.send_mail_address,
                [infoMember.mail_address],
                contentSendMail.mail_title,
                '',
                html,
                contentSendMail.send_nm
              );
            }).then(responseSendMail => {
              // Get bounce
              return this.helper.getBounce(memberInfo.mail_address)
                .then(bounce => {
                  return this.setBounce(bounce, responseSendMail.response);
                });
            });
          }).then(data => {
            // Insert result after send mail success
            let sqlResultSendMail = this.helper.loadSql('SQL102.sql');

            return this.db.query(sqlResultSendMail, {
              bind: {
                client_id: parameter.client_id,
                template_type_cd: config.CodeTemplate.COMPLETE_REGISTER_TEMPORARY,
                from_nm: sendNm,
                from_mail_address: sendAddress,
                to_nm: memberInfo.member_nm,
                to_mail_address: memberInfo.mail_address,
                mail_title: mailTitle,
                mail_contents: mailContents,
                member_id: memberInfo.member_id,
                send_result: data.send_result,
                send_bounce: data.send_bounce,
                send_code: data.send_code,
                ins_pg_id: process.env.INS_PG_ID,
                ins_client_id: parameter.client_id,
                ins_employee_cd: process.env.INS_EMPLOYEE_CD,
                upd_pg_id: process.env.UPD_PG_ID,
                upd_client_id: parameter.client_id,
                upd_employee_cd: process.env.UPD_EMPLOYEE_CD
              },
              type: this.db.QueryTypes.INSERT,
              transaction: t
            });
          });
      }).then(data => {
        // Commit transaction
        reslove(true);
      }).catch(err => {
        // Rollback transaction
        reject(new Error(`Error function createUser: ${err}`));
      });
    });
  }

  /**
   * Function active account after register
   *
   * @param {String} clientId
   * @param {String} key
   * @returns {Promise}
   * @memberof RegisterBusiness
   */
  acctiveAccount(clientId, key) {
    let memberId = null;
    let clientInfomation = null;

    return new Promise((reslove, reject)  => {
      this.db.transaction(t => {
        return this.checkAccountIsAvaliable(clientId, key, t)
          .then(data => {
            if (!data.status) {
              reject({ status: data.status });
            }

            // Setting memberId
            memberId = data.result.member_id;

            // Check user is not a member
            if (data.result.valid_flg == '1' && data.result.combine_member_id == '') {
              return this.updateAccountActive(clientId, key, t);
            } else {
              // Have member code and intergrated member net
              return this.getInfMemberIntergrated(clientId, key)
                .then(result => {
                  let parameter = {
                    code: data.result.combine_member_id,
                    clientId: clientId,
                    memberNm: result.member_nm,
                    memberKn: result.member_kn,
                    mobileNo: result.mobile_no,
                    telNo: result.tel_no,
                    infMember: result
                  }

                  return this.intergrateMember(parameter, key, t);
                });
            }
          }).then(result => {
            let sql = this.helper.loadSql('SQL060.sql');

            return this.db.query(sql, { bind: { client_id: clientId }, type: this.db.QueryTypes.SELECT })
              .then(record => {
                return record[0];
              });
          }).then(clientInf => {
            // Send mail
            clientInfomation = clientInf;

            return this.sendMailAfterComplete(clientId, memberId, clientInf, t);
          }).then(data => {
            return clientInfomation;
          });
      }).then(data => {
        // Commit transaction
        reslove(data);
      }).catch(err => {
        // Rollback transaction
        reject(new Error(`Error function acctiveAccount: ${err}`));
      });
    });
  }

  /**
   * Function check account is avaliable by ninsyou key
   *
   * @param {String} clientId
   * @param {String} key
   * @param {Object} transaction
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  checkAccountIsAvaliable(clientId, key) {
    let sql = this.helper.loadSql('SQL055.sql');

    return new Promise((reslove, reject) => {
      this.db.query(sql, {
        bind: {
          client_id: clientId,
          ninsyou_key: key
        },
        type: this.db.QueryTypes.SELECT,
      }).then(res => {
        if (!res.length) {
          reslove({ status: false });
        }

        reslove({ status: true, result: res[0] });
      }).catch(err => {
        reject(new Error(`Error function checkAccountIsAvaliable ${err}`));
      });
    });
  }

  /**
   * Function update ninsyou key then active account
   *
   * @param {String} clientId
   * @param {String} key
   * @param {Object} transaction
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  updateAccountActive(clientId, key, transaction) {
    let sql = this.helper.loadSql('SQL017.sql');

    return this.db.query(sql, {
      bind: {
        client_id: clientId,
        ninsyou_key: key
      },
      type: this.db.QueryTypes.UPDATE,
      transaction: transaction
    }).then(data => {
      return data;
    }).catch(err => {
      throw new Error(err);
    });
  }

  /**
   * Function get infomation member net
   *
   * @param {String} clientId
   * @param {String} key
   * @returns {Object}
   * @throws {Error}
   * @memberof RegisterBusiness
   */
  getInfMemberIntergrated(clientId, key) {
    let sql = this.helper.loadSql('SQL056.sql');

    return this.db.query(sql, { bind: { client_id: clientId, ninsyou_key: key }, type: this.db.QueryTypes.SELECT })
      .then(data => {
        if (!data.length) {
          throw new Error('Member not found');
        }

        return data[0];
      }).catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Function intergrated member net
   *
   * @param {Object} data
   * @param {String} key
   * @param {Object} transaction
   * @returns {boolean}
   * @throws {Error}
   * @memberof RegisterBusiness
   */
  intergrateMember(data, key, transaction) {
    let member = {
      code: data.code,
      client_id: data.clientId,
      member_nm: data.memberNm,
      member_kn: data.memberKn,
      mobile_no: data.mobileNo,
      tel_no: data.telNo
    }

    let memberInf = data.infMember;

    let sqlUpdateMember = this.helper.loadSql('SQL018.sql');
    let sqlDeleteMember = this.helper.loadSql('SQL019.sql');
    let sqlUpdateGenre = this.helper.loadSql('SQL064.sql');
    let sqlDeleteGenre = this.helper.loadSql('SQL063.sql');

    return this.checkExistsMemberCode(member)
      .then(result => {
        if (!result) {
          throw new Error('Member not match');
        }

        return result;
      }).then(result => {
        // Setting data for update record
        memberInf.client_id = data.clientId;
        memberInf.combine_member_id = data.code;

        // Update member infomation
        return this.db.query(sqlUpdateMember, {
          bind: memberInf,
          type: this.db.QueryTypes.UPDATE,
          transaction: transaction
        });
      }).then(resultUpdate => {
        // Delete record
        return this.db.query(sqlDeleteMember, {
          bind: {
            client_id: data.clientId,
            ninsyou_key: key
          },
          type: this.db.QueryTypes.DELETE,
          transaction: transaction
        });
      }).then(result => {
        // Delete list genre of member
        return this.db.query(sqlDeleteGenre, {
          bind: {
            client_id: data.clientId,
            combine_member_id: data.code
          },
          type: this.db.QueryTypes.DELETE,
          transaction: transaction
        });
      }).then(resultDeleteGenre => {
        return this.db.query(sqlUpdateGenre, {
          bind: {
            combine_member_id: data.code,
            client_id: data.clientId,
            member_id: memberInf.member_id,
          },
          type: this.db.QueryTypes.DELETE,
          transaction: transaction
        });
      }).then(resultUpdateGenre => {
        return {
          status: true
        }
      }).catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Function send mail after complete register
   *
   * @param {String} clientId
   * @param {String} memberId
   * @param {Object} clientInf
   * @param {Object} transaction
   * @returns {void}
   * @memberof RegisterBusiness
   */
  sendMailAfterComplete(clientId, memberId, clientInf, transaction) {
    let memberMail = null;
    let subjectMail = null;
    let memberInfo = null;
    let mailContents = null;

    return this.getTempletEmail(clientId, config.CodeTemplate.COMPLETE_REGISTER_MEMBER)
      .then(contentMail => {
        subjectMail = contentMail.mail_title
        let sqlGetMemberInf = this.helper.loadSql('SQL105.sql');

        return this.db.query(sqlGetMemberInf, {
          bind: {
            client_id: clientId,
            member_id: memberId
          },
          type: this.db.QueryTypes.SELECT
        }).then(member => {
          let now = new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, '');
          let time = new Date().getHours() + ':' + new Date().getMinutes();

          memberMail = member[0].mail_address;
          memberInfo = member[0];

          return this.helper.loadTemplate('complete-register', {
            contents: this.helper.replaceTextToEndLine(contentMail.mail_contents),
            signature: this.helper.replaceTextToEndLine(contentMail.signature),
            mail: member[0].mail_address,
            year: now.slice(0, 4),
            month: now.slice(4, 6),
            day: now.slice(6, 8),
            time: time,
            nameFlg: contentMail.name_flg,
            name: member[0].member_nm
          });
        }).then(mailTemplete => {
          // Send mail
          mailContents = mailTemplete;

          return this.helper.sendMailByApiV3(
            clientInf.send_mail_address,
            [memberMail],
            subjectMail,
            '',
            mailTemplete,
            clientInf.send_nm
          );
        }).then(responseMail => {
          return this.helper.getBounce(memberMail)
            .then(bounce => {
              return this.setBounce(bounce, responseMail.response);
            });
        }).then(sendResult => {
          // Insert result after send mail success
          let sqlResultSendMail = this.helper.loadSql('SQL102.sql');

          return this.db.query(sqlResultSendMail, {
            bind: {
              client_id: clientId,
              template_type_cd: config.CodeTemplate.COMPLETE_REGISTER_MEMBER,
              from_nm: clientInf.send_nm,
              from_mail_address: clientInf.send_mail_address,
              to_nm: memberInfo.member_nm,
              to_mail_address: memberInfo.mail_address,
              mail_title: subjectMail,
              mail_contents: mailContents,
              member_id: memberInfo.member_id,
              send_result: sendResult.send_result,
              send_bounce: sendResult.send_bounce,
              send_code: sendResult.send_code,
              ins_pg_id: process.env.INS_PG_ID,
              ins_client_id: clientId,
              ins_employee_cd: process.env.INS_EMPLOYEE_CD,
              upd_pg_id: process.env.UPD_PG_ID,
              upd_client_id: clientId,
              upd_employee_cd: process.env.UPD_EMPLOYEE_CD
            },
            type: this.db.QueryTypes.INSERT,
            transaction: transaction
          });
        });
      });
  }

  /**
   * Function load template email by code and clientId
   *
   * @param {String} clientId
   * @param {String} code
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  getTempletEmail(clientId, code) {
    // Load content mail from database
    let sqlLoadContentTemplate = this.helper.loadSql('SQL101.sql');

    return this.db.query(sqlLoadContentTemplate, {
      bind: {
        client_id: clientId,
        template_type_cd: code
      },
      type: this.db.QueryTypes.SELECT
    }).then(record => {
      return record[0];
    });
  }

  /**
   * Function setting send result after send mail
   *
   * @param {Boolean} status
   * @param {Integer} code
   * @returns {Object}
   * @memberof RegisterBusiness
   */
  setBounce(status, code) {
    if (status) {
      return {
        send_result: config.MailResult.SEND_RESULT_FAIL,
        send_bounce: config.MailResult.SEND_BOUNCE_SUCCESS,
        send_code: ''
      }
    }

    if (code == config.MailResult.CODE_ACCEPT) {
      return {
        send_result: config.MailResult.SEND_BOUNCE_SUCCESS,
        send_bounce: config.MailResult.SEND_BOUNCE_FAIL,
        send_code: config.MailResult.CODE_ACCEPT,
      }
    }

    return {
      send_result: config.MailResult.SEND_RESULT_FAIL,
      send_bounce: config.MailResult.SEND_BOUNCE_FAIL,
      send_code: code
    }
  }
}

export { RegisterBusiness }
