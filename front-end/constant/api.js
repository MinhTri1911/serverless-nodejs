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
  LOGIN_ADMIN_API: 'login/admin',
  LOGOUT_API: 'logout',
  BOOKING_INFO: 'booking-show-info',
  TICKET_INFO: 'booking-ticket-type',
  //Booking
  BOOKING_MEMBERSHIP: 'booking-membership',
  BOOKING_SEAT_DETAIL: 'booking-seat-detail',
  BOOKING_SALES_TERM: 'booking-sales-term',
  BOOKING_CHECK_LIMIT: 'booking-check-limit',
  BOOKING_GET_CART: 'booking-get-cart',
  BOOKING_CHECK_SEAT: 'booking-check-seat',
  //Cart
  CART_DETAIL: 'cart-detail',
  READS3: 'reads3',
  USER_INFO: 'user/info',
  HELP: 'common/faq',
  SPEC: 'common/requirement',
  GUIDE: 'data/guide',
  KIKAKU: 'data/terms',
  PRIVACY: 'data/privacy',
  LAW: 'data/tokuteisho',
  // Forgor password API - DucVN
  FORGOT_PASSWORD_API: 'forgot-password',
  GET_CLIENT_INFO: 'client',
  SETTING_PASSWORD_API: 'setting-password',
  CHECK_KEY: 'check-key',
  CHECK_EXISTS_MAIL_REGISTER: 'exists-mail-register',
  CHECK_EXISTS_MEMBER_CODE: 'exists-member-code',
  GENRE_LIST: 'genre/get-list',
  // API get list show
  SHOW_LIST: 'show/get-list',
  // API get list notify show on show list screen
  NOTIFY_LIST: 'notify/get-list',
  // API Get list schedule of show
  SHOW_LIST_SCHEDULE: 'shows/schedule/get-list',
  REGISTER: 'register',
  BOOKING_DETAIL: 'shows/detail',
  INIT_PAGE_COMPLETE: 'init-complete-register',
  ACTIVE_ACCOUNT: 'active-account',
  MY_PAGE_INIT: 'my-page/index',
  // API send mail when complete booking
  SEND_MAIL_COMPLETE: 'sendmail-complete',
  HISTORY_ORDER: 'my-page/history-order',
  DETAIL_ORDER: 'my-page/detail-order',
  INIT_UPDATE_PROFILE: 'my-page/init-update-profile',
  CHECK_EXISTS_MAIL_UPDATE: 'my-page/exists-mail-update',
  CHECK_EXISTS_LOGIN_ID: 'my-page/exists-login-id',
  CHECK_EXISTS_ORDER: 'my-page/exists-order'
};

export default CONST;
