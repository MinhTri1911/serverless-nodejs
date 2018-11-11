select
    max(
    case
        when LOWER(mail_address) = LOWER($mail)
        and admission_kb = '1'
        then '1'
        when LOWER(mail_address) = LOWER($mail)
        and admission_kb = '0'
        then '2'
        else '0'
        end
    ) as kbn
from
    m_member
where
    client_id = $client_id
    /*%if f.member_id != '' */
    $condition
    /*%end*/
