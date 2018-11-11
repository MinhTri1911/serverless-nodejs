select
  member_kb_no
  , member_type_no
  , member_start_date
  , member_end_date
  , unit
  , nyukin_flg
  , member_kb_nm
  , internet_enter_flg
  , member_type_nm
  , limit_kb
  , limit_condition_month
  , limit_condition_kb
  , continue_flg
  , continue_notice_days
  , limit_closing_month
  , code_nm
  , settle_cd
  , shiharai_deadline
  , fami_pass_receipt_no
  , condition_kb
  , condition_text
  , notice_date
from
  v_member_info
where
  client_id = $client_id
  and member_id = $member_id
order by
  member_start_date desc
