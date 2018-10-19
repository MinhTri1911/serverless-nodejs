update m_member
set
  admission_kb = '1'
  , admission_date = to_char(now(), 'yyyymmdd')
  , ninsyou_key = ''
where
  client_id = $client_id
  and ninsyou_key = $ninsyou_key
  and admission_kb = '0'
