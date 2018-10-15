update m_member
  set
    password_ninsyou_key = $ninsyoukey
    ,password_reset_dtime = now()
  where
    client_id = $clientid
    and member_id = $member_id
