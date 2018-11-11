update m_member
  set
    member_pass = $newPassword
    , password_ninsyou_key = ''
    , password_reset_dtime = null
  where
    client_id = $client_id
    and password_ninsyou_key = $key
