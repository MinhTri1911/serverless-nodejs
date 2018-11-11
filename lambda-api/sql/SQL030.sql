update t_reserve_seat_info
set
  cart_id = /* cart_id */:cart_id
  , upd_pg_id = 'TEST'
  , upd_client_id = /* client_id */:client_id
  , upd_employee_cd = 'NET'
  , upd_dtime = now()
where
  client_id = /* client_id */:client_id
  and show_group_id = /* show_group_id */:show_group_id
  and show_no = /* show_no */ :show_no
  and seat_no = /* seat_no */:seat_no
  and (cart_id = /* cart_id */:cart_id or cart_id = '')
  and reserve_no = ''
  and customer_id = ''