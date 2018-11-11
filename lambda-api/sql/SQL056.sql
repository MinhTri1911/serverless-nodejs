select
  member_id
  , member_pass
  , member_nm
  , member_kn
  , post_no
  , prefecture
  , municipality
  , address1
  , address2
  , tel_no
  , mobile_no
  , mail_address
  , mail_send_flg
  , post_send_flg
  , sex_type
  , birthday
  , temp_regist_dtime
  , combine_member_id
  , upd_pg_id
  , upd_client_id
  , upd_employee_cd
from
  m_member
where
  client_id = $client_id
  and ninsyou_key = $ninsyou_key
  and admission_kb = '0'
