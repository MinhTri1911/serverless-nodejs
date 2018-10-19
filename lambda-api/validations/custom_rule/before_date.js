/**
 * File before_date.js
 * Handler validator format for date before
 * Fix bug rule before missing value in validatorjs
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-17
 */

import Validator from'validatorjs';

export default Validator.register('before_date', function(value, requirement, attribute) {
  if (new Date(value).getTime() < new Date(requirement).getTime()) {
    return true;
  }

  return false;
}, '');
