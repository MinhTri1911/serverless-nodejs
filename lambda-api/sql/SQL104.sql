select
  member_id
  , member_nm
  , temp_regist_dtime
  , mail_address
  , ninsyou_key
from
  m_member
where
  client_id = $client_id
  and member_id = $member_id
