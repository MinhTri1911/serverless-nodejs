update m_member_genre
set
  member_id = $combine_member_id
where
  client_id = $client_id
  and member_id = $member_id
