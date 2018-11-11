select
  client_id
  , to_char( 
    to_date(apply_start_dtime, 'YYYYMMDDHH24MI')
    , 'yyyy/FMMM/FMdd'
  ) || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(apply_start_dtime,'YYYYMMDDHH24MI')) + 1]
   || ')' as apply_start_dtime
  , information_title
  , information_contents 
  , '0' as kanri_flg
  , priority_flg
from
  m_information 
where
  client_id = $clientId and #replace_admin_time
union all 
select
  'kanri' as client_id
  , to_char( 
    to_date(apply_start_dtime, 'YYYYMMDDHH24MI')
    , 'yyyy/FMMM/FMdd'
  ) || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(apply_start_dtime,'YYYYMMDDHH24MI')) + 1]
   || ')' as apply_start_dtime
  , information_title
  , information_contents 
  , '1' as kanri_flg
  , priority_flg
from
  m_information_common 
where #replace_admin_time
order by
  priority_flg,apply_start_dtime desc,kanri_flg asc
