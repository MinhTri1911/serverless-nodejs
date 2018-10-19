/**
 * File after_date.js
 * Handler validator format for date after
 * Fix bug rule after missing value in validatorjs
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-17
 */

import Validator from'validatorjs';

export default Validator.register('after_date', function(value, requirement, attribute) {
  if (new Date(value).getTime() > new Date(requirement).getTime()) {
    return true;
  }
  return false;
}, '');
