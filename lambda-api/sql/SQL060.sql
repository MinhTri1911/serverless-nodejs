select
  mc.client_id
  , mc.client_nm
  , mc.client_kn
  , mc.homepage_address
  , mc.inquiry_nm
  , mc.inquiry_tel_no
  , mc.inquiry_url
  , mc.inquiry_notes
  , mc.send_mail_address
  , mc.apply_start_date
  , mc.apply_end_date
  , mc.enable_kb
  , mc.client_logo_image_kb
  , mc.send_nm
  , mc.system_type
  , mc.guide
  , mc.privacy
  , mc.specified
  , mc.terms
  , mc.copyright
  , mc.disp_member_nm
  , mc.color1
  , mc.color2
  , mc.color3
  , mc.member_nm_kb
  , mc.tel_no_kb
  , mc.mail_send_disp_kb
  , mc.post_send_disp_kb
  , mc.member_id_input_text
  , mc.member_id_input_disp_kb
  , mc.member_terms_url
  , ms.sendgrid_apikey
  , ms.s3_access_key
  , ms.s3_secret_key
  , ms.s3_service_end_point
  , ms.s3_region
  , ms.s3_bucket_name
  , ms.famipass_post_url
  , ms.famipass_pdf_url
  , ms.famipass_id
  , ms.famipass_password
from
  m_client mc
  inner join m_setting ms
    on mc.system_type = ms.system_type
where
  mc.client_id = $client_id
