select
  account_id
  , client_id
  , account_password
  , account_nm
  , account_kn
  , mail_address
  , apply_start_date
  , apply_end_date
  , enable_kb
  , web_permission_kb
from
  m_account
where
  client_id = $client_id
  and account_id = $account_id
  and account_password = $account_password
  and enable_kb = '1'
  and web_permission_kb = '1'
  and (
    (apply_start_date = '' and apply_end_date = '')
    or to_char(now(), 'yyyymmdd') between apply_start_date and apply_end_date
  )
