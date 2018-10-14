/**
 * File api.js
 * Define constant for api url in lambda aws
 *
 * @author Rikkei.TriHNM
 * @date 2018-10-05
 */

const CONST = {
  INIT_PAGE_REGISTER: 'init-page',
  SEARCH_POST_CODE: 'search-post-code',
  // Login API link - DucVN
  LOGIN_API: 'login',
  BOOKING_INFO: 'booking-show-info',
  TICKET_INFO: 'booking-ticket-type',
  USER_INFO: 'user/info',
  // Forgor password API - DucVN
  FORGOT_PASSWORD_API: 'forgot-password',
  GET_CLIENT_INFO: 'client',
  SETTING_PASSWORD_API: 'setting-password',
  CHECK_KEY: 'check-key',
  CHECK_EXISTS_MAIL_REGISTER: 'exists-mail-register',
  CHECK_EXISTS_MEMBER_CODE: 'exists-member-code',
  GENRE_LIST: 'genres',
  SHOW_LIST: 'shows',
  NOTIFY_LIST: 'notifies'
};

export default CONST;
