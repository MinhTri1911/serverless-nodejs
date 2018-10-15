select
  client_id,
  member_id,
  member_pass,
  mail_address,

from m_member
where
  client_id = $clientid
  and member_id = $memberid
  and member_pass = $password
  and (
    mail_address = $idlogin
    or login_id = $idlogin
  )
