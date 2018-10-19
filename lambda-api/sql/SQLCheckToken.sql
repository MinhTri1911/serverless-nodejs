select
  a.client_id,
  a.member_id
  , a.member_pass
  , a.member_nm
  , a.member_kn
  , a.post_no
  , a.prefecture
  , a.municipality
  , a.address1
  , a.address2
  , a.tel_no
  , a.mobile_no
  , a.mail_address
  , a.mail_send_flg
  , a.post_send_flg
  , a.black_cd
  , a.sex_type
  , a.birthday
  , a.admission_kb
  , a.admission_date
  , a.withdraw_kb
  , a.withdraw_date
--   , b.member_kb_no
--   , b.member_type_no
--   , b.member_start_date
-- , case
--   when b.entry_cd = '1'
--     then b.member_end_date
--   when b.entry_cd = '2'
--     then e.max_member_end_date
--   else ''
--   end as member_end_date
--   , b.entry_cd
--   , b.unit
--   , c.member_kb_nm
--   , d.member_type_nm
--   , d.limit_kb
from
  m_member a
-- left join h_member b
--   on a.client_id = b.client_id
--   and a.member_id = b.member_id
--   and to_char(now(), 'yyyymmdd') between b.member_start_date and b.member_end_date
--   and b.nyukin_flg = '1'
-- inner join m_member_kb c
--   on b.client_id = c.client_id
--   and b.member_kb_no = c.member_kb_no
--   and c.del_flg = '0'
-- inner join m_member_type d
--   on b.client_id = d.client_id
--   and b.member_kb_no = d.member_kb_no
--   and b.member_type_no = d.member_type_no
--   and d.del_flg = '0'
-- inner join (
--   select
--     client_id
--       , h_member.member_id
--       , max(h_member.member_end_date) as max_member_end_date
--   from
--     h_member
--   where
--     client_id = $clientid
--     and nyukin_flg = '1'
--     and member_end_date >= to_char(now(), 'yyyymmdd')
--   group by
--     h_member.client_id
--     , h_member.member_id
--   ) e
--   on b.client_id = e.client_id
--   and b.member_id = e.member_id
where
  a.client_id = $clientid
and a.admission_kb = '1'
and (a.black_cd = '0' or a.black_cd = '')
and a.member_pass = $password
and (
  LOWER(a.mail_address) = LOWER($idlogin)
  or a.login_id = $idlogin
);
