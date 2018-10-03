import { Show } from "../models/Show"
import {ShowConfig} from "../config/Constant";

class ShowBusiness {
  constructor(db) {
    this.db = db;
    let show = new Show();
    this.showModel = show.defineShowSchema(this.db)
    return this;
  }

  getShows(page) {
    let limit = ShowConfig.RECORD_SHOW_PER_PAGE;
    let offset = page && page > 0 ? limit * (page - 1) : 0;
    return new Promise((resolve, reject) => {
      this.showModel.findAll({
        offset: offset,
        limit: limit
      })
        .then(data => {
          let response = {
            result: data,
          };
          resolve(response);
        })
        .catch(error => {
          reject(new Error(`Something Went Wrong ${error}`));
        });

    });
  }
}

export { ShowBusiness }