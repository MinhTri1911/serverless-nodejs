insert into h_login(
  client_id
  , member_id
  , login_kb
  , login_dtime
  , result_kb
  , ip_address
  , login_rireki_no
) values (
  $client_id
  , $member_id
  , $login_kb
  , now()
  , $result_kb
  , $ip_address
  , nextval('seq_login_rireki_no'))
