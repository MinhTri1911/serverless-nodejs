select
 *
from
 (
   select
     tri.reserve_no
     , to_char(to_timestamp(tri.reserve_dtime, 'yyyymmddhh24mi'), 'yyyy/mm/dd hh24:mi') as reserve_dtime
     , hrsi.show_group_id
     , tsg.show_group_main_title
     , to_char(to_date(ts.show_date, 'yyyymmdd'), 'yyyy/mm/dd') || ' ' || to_char(to_timestamp(ts.show_start_time, 'hh24mi'), 'hh24:mi') as show_dtime
     , tri.settle_cd
     , mc1.code_nm as settle_nm
     , tri.depart_cd
     , mc2.code_nm as depart_nm
     , mc1.code_nm || '/' || mc2.code_nm as settle_depart_nm
     , tri.cancel_flg
     , tu.nyukin_date
     , case
       when tri.cancel_flg = '1'
         then 'キャンセル'
       when tu.nyukin_date != ''
         then '支払済み'
       when tu.nyukin_date = ''
       and to_char(now(), 'yyyymmdd') <= tu.shiharai_deadline
         then '未払い'
       when tu.nyukin_date = ''
       and to_char(now(), 'yyyymmdd') > tu.shiharai_deadline
         then '支払期限切れ'
       else ''
       end as payment_condition
     , tri.entry_media
     , mc3.code_nm as entry_nm
     , to_char(tu.urikake_gaku, 'fm999,999,999') || '円' as urikake_gaku
     , to_char(to_date(tu.shiharai_deadline, 'yyyymmdd'), 'yyyy/mm/dd') as shiharai_deadline
     , tu.fami_pass_receipt_no2
     , hrsi.total_ticket
     , to_char(hrsi.total_ticket_price, 'fm999,999,999') || '円' as total_ticket_price
     , dense_rank() over (order by tri.reserve_no desc) as number
     , dense_rank() over (order by tri.reserve_no asc) + dense_rank() over (order by tri.reserve_no desc) - 1 as total_record
   from
     t_reserve_info tri
     inner join (
       select
         client_id
         , reserve_no
         , max(reserve_rireki_no) as reserve_rireki_no
       from
         h_reserve_info
       group by
         client_id
         , reserve_no
     ) hri
       on tri.client_id = hri.client_id
       and tri.reserve_no = hri.reserve_no
     inner join (
       select
         client_id
         , show_group_id
         , show_no
         , reserve_rireki_no
         , reserve_no
         , count(seat_no) as total_ticket
         , sum(sales_price) as total_ticket_price
       from
         h_reserve_seat_info
       group by
         client_id
         , show_group_id
         , show_no
         , reserve_rireki_no
         , reserve_no
     ) hrsi
       on hri.client_id = hrsi.client_id
       and hri.reserve_no = hrsi.reserve_no
       and hri.reserve_rireki_no = hrsi.reserve_rireki_no
     inner join t_urikake tu
       on tri.client_id = tu.client_id
       and tri.urikake_no = tu.urikake_no
     left join t_show_group tsg
       on hrsi.client_id = tsg.client_id
       and hrsi.show_group_id = tsg.show_group_id
     left join t_show ts
       on hrsi.client_id = ts.client_id
       and hrsi.show_group_id = ts.show_group_id
       and hrsi.show_no = ts.show_no
     inner join m_code mc1
       on tri.settle_cd = mc1.code_no
       and mc1.code_type_cd = '0006'
     inner join m_code mc2
       on tri.depart_cd = mc2.code_no
       and mc2.code_type_cd = '0007'
     inner join m_code mc3
       on tri.entry_media = mc3.code_no
       and mc3.code_type_cd = '0040'
   where
     tri.client_id = $client_id
     and tri.member_id = $member_id
   order by
     tri.reserve_no desc
     , hri.reserve_rireki_no desc
 ) a
where
 number >= $min_offset
 and number <= $max_offset
