select
    post_no,
    todofuken_nm,
    shikuchoson_nm,
    choiki_nm
from
    m_post_code
where
    post_no = $post_no
