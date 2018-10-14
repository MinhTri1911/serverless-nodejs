select
    client_id,
    genre_no,
    genre_nm,
    disp_seq
from
    m_genre
where
    client_id = $client_id
order by
disp_seq
