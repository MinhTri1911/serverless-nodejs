select
  case 
    when count(*) = 1 
      then '1' 
    else '0' 
    end as valid_flg 
from
  m_member 
where
  client_id = $client_id
  and password_ninsyou_key = $key
  and now() between password_reset_dtime and password_reset_dtime + interval '1day' 
  and admission_kb = '1' 
  and (black_cd = '' or black_cd = '0')