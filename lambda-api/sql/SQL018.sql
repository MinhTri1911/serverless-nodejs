update m_member
set
  member_pass = $member_pass
  , member_nm = $member_nm
  , member_kn = $member_kn
  , post_no = $post_no
  , prefecture = $prefecture
  , municipality = $municipality
  , address1 = $address1
  , address2 = $address2
  , tel_no = $tel_no
  , mobile_no = $mobile_no
  , mail_address = $mail_address
  , mail_send_flg = $mail_send_flg
  , post_send_flg = $post_send_flg
  , sex_type = $sex_type
  , birthday = $birthday
  , upd_pg_id = $upd_pg_id
  , upd_client_id = $upd_client_id
  , upd_employee_cd = $upd_employee_cd
  , upd_dtime = now()
  , temp_regist_dtime = $temp_regist_dtime
where
  client_id = $client_id
  and member_id = $combine_member_id
