select
  b.client_id
  , b.member_id
  , b.member_kb_nm || '(' || b.member_type_nm || ')' as member_kb_type_nm
  , case
    when count(*) = 1
      then '1'
    else '0'
    end as macth_flg
from
  m_member a
  inner join v_member_info b
    on a.client_id = b.client_id
    and a.member_id = b.member_id
    and b.validity_flg = '1'
where
  a.client_id = $client_id
  and a.member_id = $code
  and replace (replace (a.member_nm, ' ', ''), '　', '') = replace (replace ($member_nm, ' ', ''), '　', '')
  and replace (replace (a.member_kn, ' ', ''), '　', '') = replace (replace ($member_kn, ' ', ''), '　', '')
  $condition
  and a.mail_address = ''
  and a.member_pass = ''
  and a.admission_kb = '1'
  and (a.black_cd = '' or a.black_cd = '0')
group by
  b.client_id
  , b.member_id
  , b.member_kb_nm || '(' || b.member_type_nm || ')'
