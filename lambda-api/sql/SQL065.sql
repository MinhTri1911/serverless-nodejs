select
  case count(*)
    when 0 then '1'
    else '0'
    end as check_flg
from
  v_member_info
where
  client_id = $client_id
  and member_id = $member_id
  and member_start_date >= to_char(now(), 'yyyymmdd')
  /*if form.condition_kb = '1' */
  $condition
  /*end*/

