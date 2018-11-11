select
  case count(*)
    when 0 then '1'
    else '0'
    end as check_flg
from
  t_cart
where
  client_id = $client_id
  and member_id = $member_id
  and handle_kb = '2'
