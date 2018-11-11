select
  genre_no
from
  m_member_genre
where
  client_id = $client_id
  and member_id = $member_id
