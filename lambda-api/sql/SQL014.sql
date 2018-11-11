update m_member
  set
    password_ninsyou_key = $ninsyoukey
    ,password_reset_dtime = now()
  where
    client_id = $client_id
    and member_id = $member_id
