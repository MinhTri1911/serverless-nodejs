
insert into t_cart (
client_id
, cart_id
, cart_seq
, show_group_id
, sales_no
, show_no
, seat_no
, seat_type_no
, ticket_type_no
, sales_price
, handle_kb
, ins_pg_id
, ins_client_id
, ins_employee_cd
, ins_dtime
, upd_pg_id
, upd_client_id
, upd_employee_cd
, upd_dtime
, cart_dtime
, standard_ticket_price) 
SELECT
  /* client_id */:client_id
, /* cart_id */:cart_id
, COALESCE( MAX(cart_seq),0 )+ 1
, /* show_group_id */:show_group_id
, /* sales_no */:sales_no
, /* show_no */:show_no
, /* seat_no */:seat_no
, /* seat_type_no */:seat_type_no
, /* ticket_type_no */:ticket_type_no
, /* standard_ticket_price */:standard_ticket_price
, '2'
, /* ins_pg_id */:ins_pg_id
, /* client_id */:client_id
, 'NET'
, now()
, /* upd_pg_id */:upd_pg_id
, /* client_id */:client_id
, 'NET'
, now()
, now()
, /* standard_ticket_price */:standard_ticket_price
FROM t_cart
WHERE client_id=/* client_id */:client_id
AND cart_id=/* cart_id */:cart_id