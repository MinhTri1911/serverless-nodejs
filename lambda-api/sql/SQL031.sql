select
  main.client_id
  , main.show_group_id
  , main.sales_no
  , main.show_no
  , main.seat_type_no
  , main.seat_type_nm
  , main.seat_type_color
  , main.ticket_type_no
  , main.ticket_type_nm
  , main.ticket_price
  , main.net_max_maisu
  , main.net_zan_maisu
  , main.maisu_status
  , case
    when (
      case
        when (
          case
            when main.first_limit_count >= main.purchase_limit_count
              then main.purchase_limit_count
            else main.first_limit_count
            end
        ) >= main.once_purchase_limit_count
          then main.once_purchase_limit_count
        else (
          case
            when main.first_limit_count >= main.purchase_limit_count
              then main.purchase_limit_count
            else main.first_limit_count
            end
        )
        end
    ) >= main.net_zan_maisu
      then main.net_zan_maisu
    else (
      case
        when (
          case
            when main.first_limit_count >= main.purchase_limit_count
              then main.purchase_limit_count
            else main.first_limit_count
            end
        ) >= main.once_purchase_limit_count
          then main.once_purchase_limit_count
        else (
          case
            when main.first_limit_count >= main.purchase_limit_count
              then main.purchase_limit_count
            else main.first_limit_count
            end
        )
        end
    )
    end as limit_count
  , main.first_limit_count
  , main.purchase_limit_count
  , main.once_purchase_limit_count
  , main.ticket_unit
  , main.number_specified_flg
  , main.member_discount_flg
from
  (
    select
      a.client_id
      , a.show_group_id
      , a.sales_no
      , c.show_no
      , a.seat_type_no
      , e.seat_type_nm
      , e.seat_type_color
      , a.ticket_type_no
      , b.ticket_type_nm
      , d.ticket_price
      , g.net_max_maisu
      , count(*) as net_zan_maisu
      , case
        when count(*) > g.net_max_maisu * 0.1
          then '○'
        when count(*) <= g.net_max_maisu * 0.1
        and count(*) > 0
          then '△'
        when count(*) = 0
          then '×'
        else '-'
        end as maisu_status
      , case
        when to_char(
          to_date(k.reserve_start, 'YYYYMMDDHH24MI')
          , 'YYYYMMDD'
        ) = to_char(now(), 'YYYYMMDD')
          then c.first_limit_count
        else '10'
        end as first_limit_count
      , c.purchase_limit_count
      , c.once_purchase_limit_count
      , h.ticket_unit
      , case
        when i.seat_type_kb = '2'
          then '1'
        when i.seat_type_kb = '1'
        and j.internet_seat_kb in ('2', '3')
          then '1'
        else '0'
        end as number_specified_flg
      , h.member_discount_flg
    from
      t_sales_ticket_type a
      inner join m_ticket_type b
        on a.client_id = b.client_id
        and a.ticket_type_no = b.ticket_type_no
      inner join t_sales_show c
        on a.client_id = c.client_id
        and a.show_group_id = c.show_group_id
        and a.sales_no = c.sales_no
      inner join (
        select
          *
        from
          t_ticket_price d
        where
          member_kb_no = '0'
      ) d
        on a.client_id = d.client_id
        and a.show_group_id = d.show_group_id
        and a.seat_type_no = d.seat_type_no
        and a.ticket_type_no = d.ticket_type_no
        and c.show_no = d.show_no
      inner join m_seat_type e
        on a.client_id = e.client_id
        and a.seat_type_no = e.seat_type_no
      inner join t_reserve_seat_info f
        on f.client_id = a.client_id
        and f.show_group_id = a.show_group_id
        and f.seat_type_no = a.seat_type_no
        and f.handle_kb in ('0', '2')
        and f.reserve_no = ''
        and f.cart_id = ''
        and f.customer_id = ''
      inner join (
        select
          client_id
          , show_group_id
          , show_no
          , seat_type_no
          , count(seat_no) as net_max_maisu
        from
          t_reserve_seat_info
        where
          handle_kb in ('0', '2')
          and customer_id = ''
        group by
          client_id
          , show_group_id
          , show_no
          , seat_type_no
      ) g
        on a.client_id = g.client_id
        and a.show_group_id = g.show_group_id
        and a.seat_type_no = g.seat_type_no
        and c.show_no = g.show_no
      inner join t_ticket_type h
        on a.client_id = h.client_id
        and a.show_group_id = h.show_group_id
        and a.seat_type_no = h.seat_type_no
        and a.ticket_type_no = h.ticket_type_no
      inner join t_seat_type i
        on a.client_id = i.client_id
        and a.show_group_id = i.show_group_id
        and a.seat_type_no = i.seat_type_no
      inner join t_sales j
        on a.client_id = j.client_id
        and a.show_group_id = j.show_group_id
        and a.sales_no = j.sales_no
      inner join v_sales_handle_time k
        on c.client_id = k.client_id
        and c.show_group_id = k.show_group_id
        and c.sales_no = k.sales_no
        and c.show_no = k.show_no
        and k.client_handle_kb = '2'
    where
      a.client_id = /* client_id */$client_id
      and a.show_group_id = /* show_group_id */$show_group_id
      and a.sales_no = /* sales_no */$sales_no
      and c.show_no = /* show_no */$show_no
    group by
      a.client_id
      , a.show_group_id
      , a.sales_no
      , c.show_no
      , a.seat_type_no
      , e.seat_type_nm
      , e.seat_type_color
      , a.ticket_type_no
      , b.ticket_type_nm
      , d.ticket_price
      , g.net_max_maisu
      , case
        when to_char(
          to_date(k.reserve_start, 'YYYYMMDDHH24MI')
          , 'YYYYMMDD'
        ) = to_char(now(), 'YYYYMMDD')
          then c.first_limit_count
        else '10'
        end
      , c.purchase_limit_count
      , c.once_purchase_limit_count
      , h.ticket_unit
      , i.seat_type_kb
      , case
        when i.seat_type_kb = '2'
          then '1'
        when i.seat_type_kb = '1'
        and j.internet_seat_kb in ('2', '3')
          then '1'
        else '0'
        end
      , h.member_discount_flg
  ) main