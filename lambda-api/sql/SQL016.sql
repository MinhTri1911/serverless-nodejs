insert
into m_member(
  client_id
  , member_id
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
  , black_cd
  , sex_type
  , birthday
  , admission_kb
  , admission_date
  , ninsyou_key
  , ins_pg_id
  , ins_client_id
  , ins_employee_cd
  , ins_dtime
  , upd_pg_id
  , upd_client_id
  , upd_employee_cd
  , upd_dtime
  , temp_regist_dtime
  , combine_member_id
)
values (
  $client_id
  , $member_id
  , $member_pass
  , $member_nm
  , $member_kn
  , $post_no
  , $prefecture
  , $municipality
  , $address1
  , $address2
  , $tel_no
  , $mobile_no
  , $mail_address
  , $mail_send_flg
  , $post_send_flg
  , '0'
  , $sex_type
  , $birthday
  , '0'
  , to_char(now(), 'yyyymmdd')
  , $ninsyou_key
  , $ins_pg_id
  , $ins_client_id
  , $ins_employee_cd
  , now()
  , $upd_pg_id
  , $upd_client_id
  , $upd_employee_cd
  , now()
  , now()
  , $combine_member_id
)
