/**
 * File space_fullsize.js
 * Handler validator format for space fullsize inside string
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-17
 */

import Validator from 'validatorjs';

const ENTER_SPACE = 1;
const REMOVE_SPACE = 2;

export default Validator.register('space_fullsize', function(value, requirement, attribute) {
  if (requirement == ENTER_SPACE) {
    // Regex check string is fullsize and have space fullsize inside
    let regex = /([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf])+(　)([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf])+/g;

    return value.search(regex) != -1;
  } else if (requirement == REMOVE_SPACE) {
    // Regex check string is fullsize and not have space inside
    let regex = /^(\s*)[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf][^\s]+(\s*)$/;

    return value.search(regex) != -1;

  } else {
    // Default alway true
    return true;
  }
}, 'The :attribute is not valid with format');
