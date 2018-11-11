select
  * 
from
  ( 
    select distinct
      a.client_id
      , dense_rank() over (order by c.min_show, a.show_group_id) as number
      , a.show_group_id
      , b.sales_no
      , case 
        when a.show_group_disp_kb = '1' 
          then b.show_no 
        else null 
        end as show_no
      , a.show_group_main_title
      , c.koen_kikan as show_term
      , d.genre_nm
      , e.message as show_group_sales_status
      , j.code_nm
      , a.list_explanation
      , case 
        when a.show_group_disp_kb = '1' 
          then f.hall_nm 
        else '' 
        end as hall_nm
      , g.info as show_sales_status
      , h.sales_nm
      , h.sales_explanation
      , case 
        when i.reserve_start = '' 
        or i.reserve_limit = '' 
          then '' 
        else to_char( 
          to_date(i.reserve_start, 'YYYYMMDDHH24MI')
          , 'yyyy/FMMM/FMdd'
        ) || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(i.reserve_start,'YYYYMMDDHH24MI')) + 1]
         || ')' || to_char( 
          to_timestamp(i.reserve_start, 'YYYYMMDDHH24MI')
          , 'HH24:MI'
        ) || '　～　' || to_char( 
          to_date(i.reserve_limit, 'YYYYMMDDHH24MI')
          , 'yyyy/FMMM/FMdd'
        ) || '(' || (ARRAY ['日','月','火','水','木','金','土']) [extract('dow' FROM to_timestamp(i.reserve_limit,'YYYYMMDDHH24MI')) + 1]
         || ')' || to_char( 
          to_timestamp(i.reserve_limit, 'YYYYMMDDHH24MI')
          , 'HH24:MI'
        ) 
        end as sales_term
      , c.min_show as disp_sort
      , case 
        when a.show_group_disp_kb = '1' 
        and e.group_sales_kbn in ('0', '1') 
          then '1' 
        when a.show_group_disp_kb = '2' 
        and g.yusen_kbn in ('0', '1') 
          then '1' 
        else '0' 
        end as select_button_disp_flg
      , dense_rank() over (order by c.min_show asc, a.show_group_id asc) + dense_rank() over (order by c.min_show desc, a.show_group_id desc)
       - 1 as show_cnt
      , a.show_group_disp_kb
      , case 
        when f.hall_view_flg = '0' 
        and k.min_seat_type_kb = '1' 
        and h.internet_seat_kb = '1' 
          then '1' 
        else '0' 
        end as seat_selection_flg
      , case 
        when f.hall_view_flg = '0'                --'0'で表示
        and k.min_seat_type_kb = '1'              --指定席
        and h.internet_seat_kb in ('1', '2')      --座席指定または枚数指定（座席図表示）
          then '1' 
        else '0' 
        end as hall_seat_view_flg 
    from
      t_show_group a 
      inner join t_sales_show b 
        on a.client_id = b.client_id 
        and a.show_group_id = b.show_group_id 
      inner join v_show_group_koen_kikan c 
        on a.client_id = c.client_id 
        and a.show_group_id = c.show_group_id 
      inner join m_genre d 
        on a.client_id = d.client_id 
        and a.genre_no = d.genre_no 
      inner join v_show_group_sales_status e 
        on a.client_id = e.client_id 
        and a.show_group_id = e.show_group_id 
      inner join t_show f 
        on a.client_id = f.client_id 
        and a.show_group_id = f.show_group_id 
        and b.show_no = f.show_no 
      inner join v_show_sales_status g 
        on a.client_id = g.client_id 
        and a.show_group_id = g.show_group_id 
        and b.sales_no = g.sales_no 
        and b.show_no = g.show_no 
      inner join t_sales h 
        on a.client_id = h.client_id 
        and a.show_group_id = h.show_group_id 
        and b.sales_no = h.sales_no 
      inner join v_sales_handle_time i 
        on b.client_id = i.client_id 
        and b.show_group_id = i.show_group_id 
        and b.sales_no = i.sales_no 
        and b.show_no = i.show_no 
        and i.client_handle_kb = '2' 
      left outer join ( 
        select
          code_no
          , code_nm 
        from
          m_code 
        where
          code_type_cd = '0043'
      ) j 
        on a.list_image_kb = j.code_no 
      inner join ( 
        select
          client_id
          , show_group_id
          , min(seat_type_kb) as min_seat_type_kb 
        from
          t_seat_type 
        group by
          client_id
          , show_group_id
      ) k 
        on a.client_id = k.client_id 
        and a.show_group_id = k.show_group_id 
    where #where_condition
  ) aaa
#where_paginate
order by
  client_id
  , disp_sort
  , show_group_id
  , sales_no
  , show_no
