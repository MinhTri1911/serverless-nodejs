select
  tri.reserve_no
  , tsg.show_group_main_title
  , ts1.show_date_disp_char
  , ts2.sales_nm
  , hrsi.seat_type_no
  , mst.seat_type_nm
  , hrsi.ticket_type_no
  , mtt.ticket_type_nm
  , mhs.seat_nm
  , to_char(hrsi.sales_price, 'fm999,999,999') || '‰~' as sales_price
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
  inner join h_reserve_seat_info hrsi
    on hri.client_id = hrsi.client_id
    and hri.reserve_no = hrsi.reserve_no
    and hri.reserve_rireki_no = hrsi.reserve_rireki_no
  inner join t_urikake tu
    on tri.client_id = tu.client_id
    and tri.urikake_no = tu.urikake_no
    and tri.reserve_no = tu.reserve_no
    and hrsi.show_group_id = tu.show_group_id
  inner join t_urikake_detail tud
    on tu.client_id = tud.client_id
    and tu.urikake_no = tud.urikake_no
    and hrsi.show_group_id = tud.show_group_id
    and hrsi.show_no = tud.show_no
    and hrsi.seat_no = tud.seat_no
  left join t_show_group tsg
    on hrsi.client_id = tsg.client_id
    and hrsi.show_group_id = tsg.show_group_id
  left join t_show ts1
    on hrsi.client_id = ts1.client_id
    and hrsi.show_group_id = ts1.show_group_id
    and hrsi.show_no = ts1.show_no
  left join t_sales ts2
    on hrsi.client_id = ts2.client_id
    and hrsi.show_group_id = ts2.show_group_id
    and tud.sales_no = ts2.sales_no
  inner join m_seat_type mst
    on hrsi.client_id = mst.client_id
    and hrsi.seat_type_no = mst.seat_type_no
  inner join m_ticket_type mtt
    on hrsi.client_id = mtt.client_id
    and hrsi.ticket_type_no = mtt.ticket_type_no
  inner join m_hall_seat mhs
    on ts1.client_id = mhs.client_id
    and ts1.hall_no = mhs.hall_no
    and ts1.hall_layout_no = mhs.hall_layout_no
    and hrsi.seat_no = mhs.seat_no
  inner join t_seat_type tst
    on hrsi.client_id = tst.client_id
    and hrsi.show_group_id = tst.show_group_id
    and hrsi.seat_type_no = tst.seat_type_no
  inner join (
    select
      a.client_id
      , a.reserve_rireki_no
      , a.reserve_no
      , sum(
        case
          when a.seat_type_no = b.seat_type_no
          and a.ticket_type_no = b.ticket_type_no
            then 1
          else 0
          end
      ) as ticket_count
      , b.seat_type_no
      , b.ticket_type_no
    from
      h_reserve_seat_info a
      inner join (
        select
          client_id
          , reserve_no
          , max(reserve_rireki_no) as reserve_rireki_no
          , seat_type_no
          , ticket_type_no
        from
          h_reserve_seat_info
        group by
          client_id
          , reserve_no
          , seat_type_no
          , ticket_type_no
        having
          count(*) > 1
      ) b
        on a.client_id = b.client_id
        and a.reserve_no = b.reserve_no
        and a.reserve_rireki_no = b.reserve_rireki_no
        and a.seat_type_no = b.seat_type_no
        and a.ticket_type_no = b.ticket_type_no
    group by
      a.client_id
      , a.reserve_no
      , a.reserve_rireki_no
      , b.seat_type_no
      , b.ticket_type_no
  ) aa
    on hri.client_id = aa.client_id
    and hri.reserve_rireki_no = aa.reserve_rireki_no
    and hri.reserve_no = aa.reserve_no
    and hrsi.seat_type_no = aa.seat_type_no
    and hrsi.ticket_type_no = aa.ticket_type_no
where
  tri.client_id = $client_id
  and tri.member_id = $member_id
  and tri.reserve_no = $reserve_no
  and tst.seat_type_kb = '1'
  and (
    (
      tsg.internet_seat_notice = '0'
      and ts2.internet_seat_kb = '1'
    )
    or tsg.internet_seat_notice != '0'
  )
union all
select
  tri.reserve_no
  , tsg.show_group_main_title
  , ts1.show_date_disp_char
  , ts2.sales_nm
  , hrsi.seat_type_no
  , mst.seat_type_nm
  , hrsi.ticket_type_no
  , mtt.ticket_type_nm
  , case aa.ticket_count
    when 1 then 'Žw’èÈ'
    else 'Žw’èÈ ~ ' || aa.ticket_count || '–‡'
    end as seat_nm
  , to_char(sum(hrsi.sales_price), 'fm999,999,999') || '‰~' as sales_price
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
  inner join h_reserve_seat_info hrsi
    on hri.client_id = hrsi.client_id
    and hri.reserve_no = hrsi.reserve_no
    and hri.reserve_rireki_no = hrsi.reserve_rireki_no
  inner join t_urikake tu
    on tri.client_id = tu.client_id
    and tri.urikake_no = tu.urikake_no
    and tri.reserve_no = tu.reserve_no
    and hrsi.show_group_id = tu.show_group_id
  inner join t_urikake_detail tud
    on tu.client_id = tud.client_id
    and tu.urikake_no = tud.urikake_no
    and hrsi.show_group_id = tud.show_group_id
    and hrsi.show_no = tud.show_no
    and hrsi.seat_no = tud.seat_no
  left join t_show_group tsg
    on hrsi.client_id = tsg.client_id
    and hrsi.show_group_id = tsg.show_group_id
  left join t_show ts1
    on hrsi.client_id = ts1.client_id
    and hrsi.show_group_id = ts1.show_group_id
    and hrsi.show_no = ts1.show_no
  left join t_sales ts2
    on hrsi.client_id = ts2.client_id
    and hrsi.show_group_id = ts2.show_group_id
    and tud.sales_no = ts2.sales_no
  inner join m_seat_type mst
    on hrsi.client_id = mst.client_id
    and hrsi.seat_type_no = mst.seat_type_no
  inner join m_ticket_type mtt
    on hrsi.client_id = mtt.client_id
    and hrsi.ticket_type_no = mtt.ticket_type_no
  inner join m_hall_seat mhs
    on ts1.client_id = mhs.client_id
    and ts1.hall_no = mhs.hall_no
    and ts1.hall_layout_no = mhs.hall_layout_no
    and hrsi.seat_no = mhs.seat_no
  inner join t_seat_type tst
    on hrsi.client_id = tst.client_id
    and hrsi.show_group_id = tst.show_group_id
    and hrsi.seat_type_no = tst.seat_type_no
  inner join (
    select
      a.client_id
      , a.reserve_rireki_no
      , a.reserve_no
      , sum(
        case
          when a.seat_type_no = b.seat_type_no
          and a.ticket_type_no = b.ticket_type_no
            then 1
          else 0
          end
      ) as ticket_count
      , b.seat_type_no
      , b.ticket_type_no
    from
      h_reserve_seat_info a
      inner join (
        select
          client_id
          , reserve_no
          , max(reserve_rireki_no) as reserve_rireki_no
          , seat_type_no
          , ticket_type_no
        from
          h_reserve_seat_info
        group by
          client_id
          , reserve_no
          , seat_type_no
          , ticket_type_no
        having
          count(*) > 1
      ) b
        on a.client_id = b.client_id
        and a.reserve_no = b.reserve_no
        and a.reserve_rireki_no = b.reserve_rireki_no
        and a.seat_type_no = b.seat_type_no
        and a.ticket_type_no = b.ticket_type_no
    group by
      a.client_id
      , a.reserve_no
      , a.reserve_rireki_no
      , b.seat_type_no
      , b.ticket_type_no
  ) aa
    on hri.client_id = aa.client_id
    and hri.reserve_rireki_no = aa.reserve_rireki_no
    and hri.reserve_no = aa.reserve_no
    and hrsi.seat_type_no = aa.seat_type_no
    and hrsi.ticket_type_no = aa.ticket_type_no
where
  tri.client_id = $client_id
  and tri.member_id = $member_id
  and tri.reserve_no = $reserve_no
  and tst.seat_type_kb = '1'
  and tsg.internet_seat_notice = '0'
  and ts2.internet_seat_kb != '1'
group by
  tri.reserve_no
  , tsg.show_group_main_title
  , ts1.show_date_disp_char
  , ts2.sales_nm
  , hrsi.seat_type_no
  , mst.seat_type_nm
  , hrsi.ticket_type_no
  , mtt.ticket_type_nm
  , aa.ticket_count
union all
select
  tri.reserve_no
  , tsg.show_group_main_title
  , ts1.show_date_disp_char
  , ts2.sales_nm
  , hrsi.seat_type_no
  , mst.seat_type_nm
  , hrsi.ticket_type_no
  , mtt.ticket_type_nm
  , case aa.ticket_count
    when 1 then 'Ž©—RÈ'
    else 'Ž©—RÈ ~ ' || aa.ticket_count || '–‡'
    end as seat_nm
  , to_char(sum(hrsi.sales_price), 'fm999,999,999') || '‰~' as sales_price
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
  inner join h_reserve_seat_info hrsi
    on hri.client_id = hrsi.client_id
    and hri.reserve_no = hrsi.reserve_no
    and hri.reserve_rireki_no = hrsi.reserve_rireki_no
  inner join t_urikake tu
    on tri.client_id = tu.client_id
    and tri.urikake_no = tu.urikake_no
    and tri.reserve_no = tu.reserve_no
    and hrsi.show_group_id = tu.show_group_id
  inner join t_urikake_detail tud
    on tu.client_id = tud.client_id
    and tu.urikake_no = tud.urikake_no
    and hrsi.show_group_id = tud.show_group_id
    and hrsi.show_no = tud.show_no
    and hrsi.seat_no = tud.seat_no
  left join t_show_group tsg
    on hrsi.client_id = tsg.client_id
    and hrsi.show_group_id = tsg.show_group_id
  left join t_show ts1
    on hrsi.client_id = ts1.client_id
    and hrsi.show_group_id = ts1.show_group_id
    and hrsi.show_no = ts1.show_no
  left join t_sales ts2
    on hrsi.client_id = ts2.client_id
    and hrsi.show_group_id = ts2.show_group_id
    and tud.sales_no = ts2.sales_no
  inner join m_seat_type mst
    on hrsi.client_id = mst.client_id
    and hrsi.seat_type_no = mst.seat_type_no
  inner join m_ticket_type mtt
    on hrsi.client_id = mtt.client_id
    and hrsi.ticket_type_no = mtt.ticket_type_no
  inner join m_hall_seat mhs
    on ts1.client_id = mhs.client_id
    and ts1.hall_no = mhs.hall_no
    and ts1.hall_layout_no = mhs.hall_layout_no
    and hrsi.seat_no = mhs.seat_no
  inner join t_seat_type tst
    on hrsi.client_id = tst.client_id
    and hrsi.show_group_id = tst.show_group_id
    and hrsi.seat_type_no = tst.seat_type_no
  inner join (
    select
      a.client_id
      , a.reserve_rireki_no
      , a.reserve_no
      , sum(
        case
          when a.seat_type_no = b.seat_type_no
          and a.ticket_type_no = b.ticket_type_no
            then 1
          else 0
          end
      ) as ticket_count
      , b.seat_type_no
      , b.ticket_type_no
    from
      h_reserve_seat_info a
      inner join (
        select
          client_id
          , reserve_no
          , max(reserve_rireki_no) as reserve_rireki_no
          , seat_type_no
          , ticket_type_no
        from
          h_reserve_seat_info
        group by
          client_id
          , reserve_no
          , seat_type_no
          , ticket_type_no
        having
          count(*) > 1
      ) b
        on a.client_id = b.client_id
        and a.reserve_no = b.reserve_no
        and a.reserve_rireki_no = b.reserve_rireki_no
        and a.seat_type_no = b.seat_type_no
        and a.ticket_type_no = b.ticket_type_no
    group by
      a.client_id
      , a.reserve_no
      , a.reserve_rireki_no
      , b.seat_type_no
      , b.ticket_type_no
  ) aa
    on hri.client_id = aa.client_id
    and hri.reserve_rireki_no = aa.reserve_rireki_no
    and hri.reserve_no = aa.reserve_no
    and hrsi.seat_type_no = aa.seat_type_no
    and hrsi.ticket_type_no = aa.ticket_type_no
where
  tri.client_id = $client_id
  and tri.member_id = $member_id
  and tri.reserve_no = $reserve_no
  and tst.seat_type_kb = '2'
group by
  tri.reserve_no
  , tsg.show_group_main_title
  , ts1.show_date_disp_char
  , ts2.sales_nm
  , hrsi.seat_type_no
  , mst.seat_type_nm
  , hrsi.ticket_type_no
  , mtt.ticket_type_nm
  , aa.ticket_count
