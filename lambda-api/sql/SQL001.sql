select
    code_no,
    code_nm,
    disp_seq
from
    m_code
where
    code_type_cd = $code_type
    order by disp_seq
