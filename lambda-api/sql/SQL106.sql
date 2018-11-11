select
  member_id
  , member_nm
  , upd_dtime
  , mail_address
from
  m_member
where
  client_id = $client_id
  and member_id = $member_id
