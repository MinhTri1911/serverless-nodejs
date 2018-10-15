const CONFIG = {
  // Limit record show on a page
  RECORD_PER_PAGE: 5,
  // In list show, when user load max record then fixed footer to display footer on screen
  MAX_RECORD_FIXED_FOOTER: 5,

  // File logo show on header
  IMG_LOGO: 'logo_image',
  // Main image of show on page list show
  IMG_SHOW_MAIN: 'internet_pic1_image',
  // Main image of show on page list schedule show
  IMG_SHOW_MAIN_SCHEDULE: 'internet_pic1_image',
  // Main image hall pic from order ticket
  IMG_HALL_PIC: 'hall_pic',

  // Path image from S3
  PATH_IMG_SHOW_MAIN: '/:client_id/event/:show_group_id/internet_pic1_image',
  // Seat type
  SEAT_DESIGNATED: 1,
  SEAT_FREE: 2
};

export default CONFIG;
