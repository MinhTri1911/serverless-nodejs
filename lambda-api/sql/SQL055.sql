select
  case
    when count(*) = 1
      then '1'
    else '0'
    end as valid_flg
  , combine_member_id
from
  m_member
where
  client_id = $client_id
  and ninsyou_key = $ninsyou_key
  and now() between temp_regist_dtime and temp_regist_dtime + interval '1day'
  and admission_kb = '0'
group by
  combine_member_id
