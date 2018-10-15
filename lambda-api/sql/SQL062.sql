insert
into m_member_genre(
  client_id
  , member_id
  , genre_no
  , ins_pg_id
  , ins_client_id
  , ins_employee_cd
  , ins_dtime
  , upd_pg_id
  , upd_client_id
  , upd_employee_cd
  , upd_dtime
)
values (
  $client_id
  , $member_id
  , $genre_no
  , $ins_pg_id
  , $ins_client_id
  , $ins_employee_cd
  , now()
  , $upd_pg_id
  , $upd_client_id
  , $upd_employee_cd
  , now()
)
