select
  template_type_cd
  , mail_title
  , mail_contents
  , signature
  , name_flg
from
  m_mail_template
where
  client_id = $client_id
  and template_type_cd = $template_type_cd
