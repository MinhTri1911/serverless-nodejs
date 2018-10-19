/* begin; */

update m_numbering
set
  id_now = $id_now
  , upd_pg_id = $upd_pg_id
  , upd_client_id = $upd_client_id
  , upd_employee_cd = $upd_employee_cd
  , upd_dtime = now()
where
  client_id = $client_id
  and numbering_cd = '01';

/* commit; */
