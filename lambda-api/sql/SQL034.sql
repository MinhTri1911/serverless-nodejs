select
  case
    when count(*) != 0
      then '1'
    else '0'
    end as dup_flg
from
  m_member
where
  client_id = $client_id
  and login_id = $login_id
  and member_id != $member_id
