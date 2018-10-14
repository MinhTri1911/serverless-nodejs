/**
 * File text_number_haftsize.js
 * Check string is valid with format phone number
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-05
 */

export default {
  getMessage(field, args) {
    return '';
  },
  validate(value, args) {
    let regex = /^([a-zA-Z0-9])+$/g;

    return value.search(regex) != -1;
  }
}
