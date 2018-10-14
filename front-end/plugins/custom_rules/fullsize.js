/**
 * File fullsize.js
 * Check string is fullsize
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-04
 */
export default {
  getMessage(field, args) {
    return '';
  },
  validate(value, args) {
    let regex = /^(\s*)[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf][^a-zA-Z0-9]+(\s*)$/;

    return  value.search(regex) != -1;
  }
}
