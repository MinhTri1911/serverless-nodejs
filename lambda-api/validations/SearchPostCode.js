/**
 * File SearchPostCode.js
 * Define rules for passes request
 *
 * @return {Object}
 * @author Rikkei.TriHNM
 * @date 2018-10-02
 */

export default {
  post_code_1: 'required|numeric|digits:3',
  post_code_2: 'required|numeric|digits:4'
};
