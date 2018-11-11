/**
 * File MyPageBusiness.js
 * Define handler business in my page
 *
 * @class MyPageBusiness
 * @author Rikkei.TriHNM
 * @date 2018-10-01
 */

import { Helper } from '../common/Helper';
import _ from 'lodash';
import config from '../config/Constant';

class MyPageBusiness {
  /**
   * Creates an instance of MyPageBusiness.
   *
   * @param {Object} db
   * @returns {this}
   * @memberof MyPageBusiness
   */
  constructor(db) {
    this.db = db;
    this.helper = new Helper();

    return this;
  }

  /**
   * Function get data history member and member infomation
   *
   * @param {String} clientId
   * @param {String} memberId
   * @returns {Object}
   * @memberof MyPageBusiness
   * @throws {Error}
   */
  getInfoMember(clientId, memberId) {
    let sql = this.helper.loadSql('SQL032.sql');
    let sql060 = this.helper.loadSql('SQL060.sql');
    let sqlCheckIsUpdateMember = this.helper.loadSql('SQL065.sql');
    let sqlCheckExistOrder = this.helper.loadSql('SQL066.sql');

    return new Promise((resolve, reject) => {
      this.db.query(sql, {
        bind: {
          client_id: clientId,
          member_id: memberId
        },
        type: this.db.QueryTypes.SELECT
      }).then(data => {
        return this.db.query(sql060, { bind: { client_id: clientId }, type: this.db.QueryTypes.SELECT })
          .then(result => {
            return {
              member_list_information: data,
              member_information: {
                disp_member_nm: result[0].disp_member_nm
              }
            }
          });
      }).then(data => {
        let condition = '';
        let conditionKb = '';
        let now = parseInt(new Date().toISOString().replace(/T[0-9a-zA-Z:.]+/g, ' ').replace(/[-]+/g, ''));

        // QA125 get conditionKb if member_start_date <= now <= member_end_date
        data.member_list_information.forEach(element => {
          if (parseInt(element.member_start_date) <= now && now <= parseInt(element.member_end_date)) {
            conditionKb = element.condition_kb;
          }
        });

        if (data.member_list_information.length && conditionKb == '1') {
          condition = `and to_char(now(), 'yyyymmdd') not between notice_date and member_end_date`;
        }

        sqlCheckIsUpdateMember = sqlCheckIsUpdateMember.replace("$condition", condition);

        return this.db.query(sqlCheckIsUpdateMember, {
          bind: {
            client_id: clientId,
            member_id: memberId
          },
          type: this.db.QueryTypes.SELECT
        }).then(record => {
          data.member_check = record[0];

          return data;
        });
      }).then(data => {
        return this.db.query(sqlCheckExistOrder, {
          bind: {
            client_id: clientId,
            member_id: memberId
          },
          type: this.db.QueryTypes.SELECT
        }).then(record => {
          data.check_exists_order = record[0];

          return data;
        });
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(new Error(`Error get member infomation: ${err}`));
      });
    });
  }

  /**
   * Function get history order of member
   *
   * @param {String} clientId
   * @param {String} memberId
   * @param {Integer} page
   * @memberof MyPageBusiness
   * @throws {Error}
   */
  getHistoryOrder(clientId, memberId, page) {
    if (Number.isInteger(page)) {
      throw new Error('Page index is not a number');
    }

    let sql = this.helper.loadSql('SQL040.sql');
    let limit = config.GenreConfig.RECORD_SHOW_PER_PAGE;
    let minOffset = (page * limit) - (limit - 1);
    let maxOffset = (page * limit);

    return new Promise((resolve, reject) => {
      // Get items
      this.db.query(sql, {
        bind: {
          client_id: clientId,
          member_id: memberId,
          min_offset: minOffset,
          max_offset: maxOffset
        },
        type: this.db.QueryTypes.SELECT
      }).then(records => {
        let data = {
          total: records.length ? records[0].total_record : 0,
          current_page: parseInt(page),
          item_per_page: limit,
          items: records
        }

        resolve(data);
      }).catch(err => {
        reject(new Error(`Error function getHistoryOrder: ${err}`));
      });
    });
  }

  /**
   * Function get detail seat and order
   *
   * @param {String} clientId
   * @param {String} memberId
   * @param {String} reserveNo
   * @returns {Object}
   * @memberof MyPageBusiness
   * @throws {Error}
   */
  getDetailOrder(clientId, memberId, reserveNo) {
    return new Promise((resolve, reject) => {
      let sqlDetailSeat = this.helper.loadSql('SQL068.sql');
      let sqlDetailOrder = this.helper.loadSql('SQL069.sql');

      this.db.query(sqlDetailSeat, {
        bind: {
          client_id: clientId,
          member_id: memberId,
          reserve_no: reserveNo
        },
        type: this.db.QueryTypes.SELECT
      }).then(detailSeat => {
        this.db.query(sqlDetailOrder, {
          bind: {
            client_id: clientId,
            member_id: memberId,
            reserve_no: reserveNo
          },
          type: this.db.QueryTypes.SELECT
        }).then(detailOrder => {
          let data = {
            detail_seat: detailSeat,
            detail_order: detailOrder
          }

          resolve(data);
        });
      }).catch(err => {
        reject(new Error(`Error function getDetailOrder: ${err}`));
      });
    });
  }

  /**
   * Function get list city
   *
   * @returns {Array}
   * @memberof MyPageBusiness
   */
  async getListCity() {
    let sqlGetListCity = this.helper.loadSql('SQL001.sql');

    return await this.db.query(sqlGetListCity, { bind: { code_type: '0001' }, type: this.db.QueryTypes.SELECT })
      .then(record => {
        return record;
      }).catch(err => {
        throw new Error(`Error function getListCity: ${err}`);
      });
  }

  /**
   * Function get list gener
   *
   * @param {String} clientId
   * @returns {Array}
   * @memberof MyPageBusiness
   */
  async getListGener(clientId) {
    let sqlGetListGener = this.helper.loadSql('SQL002.sql');

    return await this.db.query(sqlGetListGener, { bind: { client_id: clientId }, type: this.db.QueryTypes.SELECT })
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(`Error function getListGener: ${err}`);
      });
  }

  /**
   * Function get list gener of member
   *
   * @param {String} clientId
   * @param {String} memberId
   * @returns {Array}
   * @memberof MyPageBusiness
   */
  async getListGenerOfMember(clientId, memberId) {
    let sqlGetListGenerOfMember = this.helper.loadSql('SQL116.sql');

    return await this.db.query(sqlGetListGenerOfMember, {
      bind: {
        client_id: clientId,
        member_id: memberId
      },
      type: this.db.QueryTypes.SELECT
    }).then(record => {
      return record;
    }).catch(err => {
      throw new Error(`Error function getListGenerOfMember: ${err}`);
    });
  }

  /**
   * Function init page update infomation
   *
   * @param {String} clientId
   * @param {String} memberId
   * @returns {Object}
   * @memberof MyPageBusiness
   */
  initPageUpdateInfomation(clientId, memberId) {
    return new Promise((resolve, reject) => {
      let listCity = null;
      let listGener = null;
      let listGenerOfMember = null;

      this.getListCity()
        .then(data => {
          listCity = data;

          return this.getListGener(clientId)
            .then(geners => {
              listGener = geners;

              return true;
            });
        }).then(data => {
          return this.getListGenerOfMember(clientId, memberId)
            .then(generMember => {
              listGenerOfMember = generMember;

              return true;
            });
        }).then(data => {
          resolve({
            list_city: listCity,
            list_gener: listGener,
            list_gener_member: listGenerOfMember
          })
        }).catch(err => {
          reject(new Error(err));
        });
    });
  }

  /**
   * Function check exists mail when update
   *
   * @param {String} clientId
   * @param {String} memberId
   * @param {String} mail
   * @returns {Object}
   * @memberof MyPageBusiness
   */
  checkExistsMailUpdate(clientId, memberId, mail) {
    return new Promise((resolve, reject) => {
      let sqlCheckExists = this.helper.loadSql('SQL008.sql');

      let condition = 'and member_id != $member_id';

      sqlCheckExists = sqlCheckExists.replace('$condition', condition);

      this.db.query(sqlCheckExists, {
        bind: {
          client_id: clientId,
          member_id: memberId,
          mail: mail
        },
        type: this.db.QueryTypes.SELECT
      }).then(record => {
        resolve(record[0]);
      }).catch(err => {
        reject(new Error(`Error function checkExistsMailUpdate: ${err}`));
      });
    });
  }

  /**
   * Function check exists login id
   *
   * @param {String} clientId
   * @param {String} memberId
   * @param {String} loginId
   * @returns {Object}
   * @memberof MyPageBusiness
   */
  checkExistsLoginId(clientId, memberId, loginId) {
    return new Promise((reslove, reject) => {
      let sql = this.helper.loadSql('SQL034.sql');

      this.db.query(sql, {
        bind: {
          client_id: clientId,
          member_id: memberId,
          login_id: loginId
        },
        type: this.db.QueryTypes.SELECT
      }).then(record => {
        reslove(record[0]);
      }).catch(err => {
        reject(new Error(`Error function checkExistsLoginId: ${err}`));
      });
    });
  }

  /**
   * Function
   *
   * @param {String} clientId
   * @param {String} membderId
   * @return {Object}
   * @memberof MyPageBusiness
   */
  checkExistsOrder(clientId, membderId) {
    return new Promise((reslove, reject) => {
      let sqlCheckExistsOrder = this.helper.loadSql('SQL066.sql');

      this.db.query(sqlCheckExistsOrder, {
        bind: {
          client_id: clientId,
          member_id: membderId
        },
        type: this.db.QueryTypes.SELECT
      }).then(record => {
        reslove(record[0]);
      }).catch(err => {
        reject(`Error function checkExistsOrder: ${err}`);
      });
    });
  }
}

export { MyPageBusiness }
