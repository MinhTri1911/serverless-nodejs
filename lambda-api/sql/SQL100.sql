update t_cart
set
  ticket_type_no = /* ticket_type_no */:ticket_type_no
  , upd_pg_id = /* upd_pg_id */:upd_pg_id
  , upd_client_id = /* upd_client_id */:client_id
  , upd_employee_cd = /* upd_employee_cd */:upd_employee_cd
  , upd_dtime = now()
where
  client_id = /* client_id */:client_id
  and cart_id = /* cart_id */:cart_id
  and show_group_id = /* show_group_id */:show_group_id
  and show_no = /* show_no */:show_no
  and seat_no = /* seat_no */:seat_no