import { Helper } from '../common/Helper';

class ShowDetailBusiness {
    /**
     * Constructor set instance sequelize
     *
     * @param db
     * @returns {ShowDetailBusiness}
     */
    constructor(db) {
        this.db = db;
        this.helper = new Helper();
        return this;
    }

    /**
     * Function get shows detail
     *
     * @returns {Object}
     * @memberof ShowDetailBusiness
    */
    getShowsDetail(client_id, show_group_id, admin_time) {

        return new Promise((resolve, reject) => {

            let sql = this.getSqlStringScheduleShow(admin_time);

            this.db.query(sql, { bind:{client_id: client_id,show_group_id:show_group_id},type: this.db.QueryTypes.SELECT})
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(new Error(err));
                    });
        });
    }

  /**
   * Process replace string SQL admin time in sql027
   * @return {String}
   */
  getSqlStringScheduleShow(admin_time ="") {
    // Load file SQL
    let queryDb = this.helper.loadSql('SQL027.sql');

    // If user search with show group id, replace sub query from query string in file
    if (admin_time != '') {
      queryDb = queryDb.replace('#replace_admin_time', "TIMESTAMP '"+admin_time+"'");
    } else {
      queryDb = queryDb.replace('#replace_admin_time', 'now()')
    }
    // Replace all sub query in query string from file

    return queryDb;
  }
}

export {ShowDetailBusiness}