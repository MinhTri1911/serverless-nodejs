select
  client_id
  , client_nm
  , client_kn
  , homepage_address
  , inquiry_nm
  , inquiry_tel_no
  , inquiry_url
  , inquiry_notes
  , send_mail_address
  , apply_start_date
  , apply_end_date
  , enable_kb
  , client_logo_image_kb
  , send_nm
  , system_type
  , guide
  , privacy
  , specified
  , terms
  , copyright
  , disp_member_nm
  , color1
  , color2
  , color3
  , member_nm_kb
  , tel_no_kb
  , mail_send_disp_kb
  , post_send_disp_kb
  , member_id_input_text
  , member_id_input_disp_kb
  , member_terms_url
from
  m_client
where
  client_id = $client_id
  /*and enable_kb = '1'*/
  /*and to_char(now(), 'yyyymmdd') between apply_start_date and apply_end_date*/
