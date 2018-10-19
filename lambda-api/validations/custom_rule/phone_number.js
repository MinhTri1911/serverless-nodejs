/**
 * File phone_number.js
 * Handler validator format for phone number
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-17
 */

import Validator  from'validatorjs';

const ENTER_DASH = 1;
const REMOVE_DASH = 2;

export default Validator.register('phone_number', function(value, requirement, attribute) {
  // Regex format phone number
  let removeDash = /^[0][0-9]{9,9}$/g;
  let enterDashOption1 = /^([0]([0-9]{1,1})[\-]([0-9]{4,4})[\-]([0-9]{4,4}))$/g;
  let enterDashOption2 = /^([0]([0-9]{2,2})[\-]([0-9]{3,3})[\-]([0-9]{4,4}))$/g;
  let enterDashOption3 = /^([0]([0-9]{3,3})[\-]([0-9]{2,2})[\-]([0-9]{4,4}))$/g;
  let enterDashOption4 = /^([0]([0-9]{4,4})[\-]([0-9]{1,1})[\-]([0-9]{4,4}))$/g;

  if (requirement == ENTER_DASH) {
    // Regex check string is number and limit 10 to 11 charater with dash
    return value.search(enterDashOption1) != -1 || value.search(enterDashOption2) != -1
      || value.search(enterDashOption3) != -1 || value.search(enterDashOption4) != -1;
  } else if (requirement == REMOVE_DASH) {
    // Regex check string is number and limit 10 to 11 charater
    return value.search(removeDash) != -1;
  } else {
    // Regex check string is number or dash limit 10 to 11 charater
    return value.search(enterDashOption1) != -1 || value.search(enterDashOption2) != -1
      || value.search(enterDashOption3) != -1 || value.search(enterDashOption4) != -1
      || value.search(removeDash) != -1;
  }
}, 'The :attribute is not valid with format');
