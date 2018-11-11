select
  hall_view_flg
  , case 
    when yusen_kbn in ('0', '1', '3') 
      then '1' 
    else '0' 
    end as sales_flg 
from
  v_show_sales_status 
where
  client_id = /* client_id */$client_id
  and show_group_id = /* show_group_id */$show_group_id
  and show_no = /* show_no */$show_no
  and sales_no = /* sales_no */$sales_no
