/**
 * File password_regex.js
 * Handler validator format for password
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-17
 */

import Validator  from'validatorjs';

export default Validator.register('password_regex', function(value, requirement, attribute) {
  let regexLoseCaseAndUpCase = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,16}$/g;
  let regexLoseCaseAndNumber = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/g;
  let regexLoseCaseAndSymbol = /^(?=.*[a-z])(?=.*[-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/])[a-z-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,16}$/g;
  let regexUpCaseAndNumber = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,16}$/g;
  let regexUpCaseAndSymbol = /^(?=.*[A-Z])(?=.*[-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/])[A-Z-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,16}$/g;
  let regexNumberAndSymbol = /^(?=.*\d)(?=.*[-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/])[\d-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,16}$/g;

  let flag = value.search(regexLoseCaseAndUpCase) != -1 || value.search(regexLoseCaseAndNumber) != -1
    || value.search(regexLoseCaseAndSymbol) != -1 || value.search(regexUpCaseAndNumber) != -1
    || value.search(regexUpCaseAndSymbol) != -1 || value.search(regexNumberAndSymbol) != -1;

  if (flag) {
    return flag;
  } else {
    let regexLoseCaseUpCaseNumber = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/g;
    let regexLoseCaseUpCaseSymbol = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/])[a-zA-Z-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,16}$/g;
    let regexLoseCaseNumberSymbol = /^(?=.*[a-z])(?=.*\d)(?=.*[-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/])[a-z\d-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,16}$/g;
    let regexUpCaseNumberSymbol = /^(?=.*[A-Z])(?=,*\d)(?=.*[-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/])[A-Z\d-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,16}$/g;

    flag = value.search(regexLoseCaseUpCaseNumber) != -1 || value.search(regexLoseCaseUpCaseSymbol) != -1
      ||  value.search(regexLoseCaseNumberSymbol) != -1 || value.search(regexUpCaseNumberSymbol) != -1;

    if (!flag) {
      let regexLoseCaseUpCaseNumberAndSymbol = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/])[a-zA-Z\d-!$%`@#^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,16}$/g;

      flag = value.search(regexLoseCaseUpCaseNumberAndSymbol);
    }
  }

  return flag != -1;
}, 'The :attribute is not valid with format');
