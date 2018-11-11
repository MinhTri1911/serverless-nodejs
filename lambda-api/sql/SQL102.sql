insert
into t_mail_result(
  client_id
  , mail_no
  , template_type_cd
  , from_nm
  , from_mail_address
  , to_nm
  , to_mail_address
  , mail_title
  , mail_text
  , member_id
  , send_dtime
  , send_result
  , send_bounce
  , send_code
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
  , nextval('seq_mail_no')
  , $template_type_cd
  , $from_nm
  , $from_mail_address
  , $to_nm
  , $to_mail_address
  , $mail_title
  , $mail_contents
  , $member_id
  , now()
  , $send_result
  , $send_bounce
  , $send_code
  , $ins_pg_id
  , $ins_client_id
  , $ins_employee_cd
  , now()
  , $upd_pg_id
  , $upd_client_id
  , $upd_employee_cd
  , now()
)
