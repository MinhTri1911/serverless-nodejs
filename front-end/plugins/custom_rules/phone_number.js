/**
 * File phone_number.js
 * Check string is valid with format phone number
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-04
 */

const ENTER_DASH = 1;
const REMOVE_DASH = 2;

export default {
  getMessage(field, args) {
    return '';
  },
  validate(value, args) {
    let [type] = args;

    // Regex format phone number
    let removeDash = /^[0][0-9]{9,9}$/g;
    let enterDashOption1 = /^([0]([0-9]{1,1})[\-]([0-9]{4,4})[\-]([0-9]{4,4}))$/g;
    let enterDashOption2 = /^([0]([0-9]{2,2})[\-]([0-9]{3,3})[\-]([0-9]{4,4}))$/g;
    let enterDashOption3 = /^([0]([0-9]{3,3})[\-]([0-9]{2,2})[\-]([0-9]{4,4}))$/g;
    let enterDashOption4 = /^([0]([0-9]{4,4})[\-]([0-9]{1,1})[\-]([0-9]{4,4}))$/g;

    if (type == ENTER_DASH) {
      // Regex check string is number and limit 10 to 11 charater with dash
      return value.search(enterDashOption1) != -1 || value.search(enterDashOption2) != -1
        || value.search(enterDashOption3) != -1 || value.search(enterDashOption4) != -1;
    } else if (type == REMOVE_DASH) {
      // Regex check string is number and limit 10 to 11 charater
      return value.search(removeDash) != -1;
    } else {
      // Regex check string is number or dash limit 10 to 11 charater
      return value.search(enterDashOption1) != -1 || value.search(enterDashOption2) != -1
        || value.search(enterDashOption3) != -1 || value.search(enterDashOption4) != -1
        || value.search(removeDash) != -1;
    }
  }
}
