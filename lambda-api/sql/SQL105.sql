select
  member_id
  , member_nm
  , regist_dtime
  , mail_address
from
  m_member
where
  client_id = $client_id
  and member_id = $member_id
