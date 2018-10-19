select
  a.client_id
  , a.show_group_id
  , a.show_no
  , a.show_nm
  , to_char(
    to_date(a.show_date, 'YYYYMMDD')
    , 'yyyy/FMMM/FMdd'
  ) || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(a.show_date,'YYYYMMDD')) + 1]
   || ')' as show_date
  , a.hall_nm
  , a.hall_view_flg
  , e.sales_nm
  , e.sales_explanation
  , case
    when f.reserve_start = ''
    or f.reserve_limit = ''
      then ''
    else to_char(
      to_date(f.reserve_start, 'YYYYMMDDHH24MI')
      , 'yyyy/FMMM/FMdd'
    ) || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(f.reserve_start,'YYYYMMDDHH24MI')) + 1]
     || ')' || to_char(
      to_timestamp(f.reserve_start, 'YYYYMMDDHH24MI')
      , 'HH24:MI'
    ) || '　〜　' || to_char(
      to_date(f.reserve_limit, 'YYYYMMDDHH24MI')
      , 'yyyy/FMMM/FMdd'
    ) || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(f.reserve_limit,'YYYYMMDDHH24MI')) + 1]
     || ')' || to_char(
      to_timestamp(f.reserve_limit, 'YYYYMMDDHH24MI')
      , 'HH24:MI'
    )
    end as sales_term
  , g.seat_type_nm
  , g.seat_type_color
  , g.seat_type_kb
  , h.detail_explanation
  , j.code_nm
  , c.seat_nm
  , case
    when d.customer_id = ''
    and d.reserve_no = ''
    and d.cart_id = ''
    and d.handle_kb in ('0', '2')
      then '1'
    else '0'
    end as sales_seat_flg
  , c.x_zahyo
  , c.y_zahyo
  , c.angle
  , i.seat_size
  , a.hall_no
  , a.hall_layout_no
  , d.seat_no
  , d.seat_type_no
  , h.show_group_disp_kb
from
  t_show a
  inner join t_sales_show b
    on a.client_id = b.client_id
    and a.show_group_id = b.show_group_id
  inner join m_hall_seat c
    on a.client_id = c.client_id
    and a.hall_no = c.hall_no
    and a.hall_layout_no = c.hall_layout_no
  inner join t_reserve_seat_info d
    on a.client_id = d.client_id
    and a.show_group_id = d.show_group_id
    and a.show_no = d.show_no
    and c.seat_no = d.seat_no
  inner join t_sales e
    on a.client_id = e.client_id
    and a.show_group_id = e.show_group_id
    and b.sales_no = e.sales_no
  inner join v_sales_handle_time f
    on b.client_id = f.client_id
    and b.show_group_id = f.show_group_id
    and b.sales_no = f.sales_no
    and b.show_no = f.show_no
    and f.client_handle_kb = '2'
  inner join m_seat_type g
    on d.client_id = g.client_id
    and d.seat_type_no = g.seat_type_no
  inner join t_show_group h
    on a.client_id = h.client_id
    and a.show_group_id = h.show_group_id
  inner join m_hall_layout i
    on c.client_id = i.client_id
    and c.hall_no = i.hall_no
    and c.hall_layout_no = i.hall_layout_no
  left outer join (
    select
      code_no
      , code_nm
    from
      m_code
    where
      code_type_cd = '0043'
  ) j
    on i.hall_pic_kb = j.code_no
where
  a.client_id = /* client_id */$client_id
  and a.show_group_id = /* show_group_id */$show_group_id
  and a.show_no = /* show_no */$show_no
  and b.sales_no = /* sales_no */$sales_no
order by
  c.disp_seq