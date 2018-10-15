select
  member_id
from
  m_member
where
  client_id = $clientid
  and LOWER(mail_address) = LOWER($email)
  and (
replace (tel_no, '-', '') = replace ($phone, '-', '')
or replace (mobile_no, '-', '') = replace ($phone, '-', '')
)
