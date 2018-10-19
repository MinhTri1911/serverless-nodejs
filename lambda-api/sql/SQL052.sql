select
  id_now
  , id_max
  , pre_fix
  , id_len
from
  m_numbering
where
  client_id = $client_id
  and numbering_cd = '01'
