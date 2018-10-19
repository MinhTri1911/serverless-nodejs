/**
 * File fullsize.js
 * Handler validator format for string fullsize
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-17
 */

import Validator from'validatorjs';

export default Validator.register('fullsize', function(value, requirement, attribute) {
  let regex = /^(\s*)[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf][^a-zA-Z0-9]+(\s*)$/;

  return  value.search(regex) != -1;
}, 'The :attribute is not valid with format');
