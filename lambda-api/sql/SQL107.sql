select
  member_id
  , member_nm
  , password_ninsyou_key
  , mail_address
from
  m_member
where
  client_id = $client_id
  and member_id = $member_id
