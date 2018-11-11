import Config from "../config/Constant";
import _ from "lodash"
import CommonClientId from "../common/ClientId"
import {Helper} from "../common/Helper"

class SendMailBusiness {
  /**
   *
   * @param db
   * @returns {SendMailBusiness}
   */
  constructor(db) {
    this.db = db;
    this.helper = new Helper();
    return this;
  }
  sendMailBookingComplete(event){
    return new Promise((resolve, reject) => {
      resolve(event)
    })
  }

}

export {
  SendMailBusiness
}