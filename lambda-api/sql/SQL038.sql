select
  main.client_id
  , main.show_group_id
  , main.show_no
  , main.sales_no
  , case
    when (main.once_purchase_limit_count >= main.cart_count + /* seat_select_count */:seat_select_count)
      then '0'
    else '1'
    end as once_purchase_limit_count_ng_flg
  , case
    when (main.once_purchase_limit_count >= main.cart_count + /* seat_select_count */:seat_select_count)
      then ''
    else '一度にお申込みできる枚数は最大' || main.once_purchase_limit_count || 'までです。'
    end as once_purchase_limit_count_ng_flg_msg
  , case
    when (main.purchase_limit_count >= main.purchase_count + /* seat_select_count */:seat_select_count)
      then '0'
    else '1'
    end as purchase_limit_count_ng_flg
  , case
    when (main.purchase_limit_count >= main.purchase_count + /* seat_select_count */:seat_select_count)
      then ''
    else 'お申込みできる枚数は最大' || purchase_limit_count || 'までです。'
    end as purchase_limit_count_ng_flg_msg
  , case
    when (main.first_limit_count >= main.first_count + /* seat_select_count */:seat_select_count)
      then '0'
    else '1'
    end as first_limit_count_ng_flg
  , case
    when (main.first_limit_count >= main.first_count + /* seat_select_count */:seat_select_count)
      then ''
    else '初日にお申込みできる枚数は最大' || first_limit_count || '枚までです。'
    end as first_limit_count_ng_flg_msg
  , case
    when (main.first_limit_count > main.first_count + /* seat_select_count */:seat_select_count)
      then '0'
    else '1'
    end as day_entry_limit_count_ng_flg
  , case
    when (main.day_entry_limit_count > main.day_entry_count)
      then ''
    else '初日にお申込みできる枚数は最大' || first_limit_count || '枚までです。'
    end as day_entry_limit_count_ng_flg_msg
from
  (
    --購入制限枚数取得
    select
      a.client_id
      , a.show_group_id
      , a.sales_no
      , a.show_no
      , a.once_purchase_limit_count               --制限枚数(回)
      , cart_count.cart_count                     --カートのチケット枚数
      , a.purchase_limit_count                    --制限枚数(合計)
      , purchase_count.purchase_count             --過去に購入したチケット枚数
      , a.first_limit_count                       --初日制限枚数(合計)
      , first_count.first_count                   --初日購入したチケット枚数
      , b.day_entry_limit_count                   --回数制限(日)
      , day_entry_count.day_entry_count           --本日購入した回数
    from
      t_sales_show a
      inner join m_client b
        on a.client_id = b.client_id
      cross join (
        --カートのチケット枚数取得
        select
          count(a.*) as cart_count
        from
          t_cart a
        where
          a.client_id = /* client_id */:client_id
          and a.show_group_id = /* show_group_id */:show_group_id
          and a.sales_no = /* sales_no */:sales_no
          and a.show_no = /* show_no */:show_no
          and a.member_id = /* member_id */:member_id
      ) cart_count
      cross join (
        --過去に購入したチケット枚数取得
        select
          count(*) as purchase_count
        from
          t_reserve_info a
          inner join t_urikake_detail b
            on a.client_id = b.client_id
            and a.urikake_no = b.urikake_no
            and a.member_id != ''
            and b.urikake_kb_cd in ('0', '1')
            and b.client_id = /* client_id */:client_id
            and b.show_group_id = /* show_group_id */:show_group_id
            and b.show_no = /* show_no */:show_no
            and b.sales_no = /* sales_no */:sales_no
            and a.member_id = /* member_id */:member_id
            and a.cancel_flg = '0'
      ) purchase_count
      cross join (
        --初日に購入したチケット枚数取得
        select
          count(*) as first_count
        from
          t_reserve_info a
          inner join t_urikake_detail b
            on a.client_id = b.client_id
            and b.client_id = /* client_id */:client_id
            and a.urikake_no = b.urikake_no
            and b.urikake_kb_cd in ('0', '1')
            and a.member_id != ''
            and a.member_id = /* member_id */:member_id
            and to_char(to_date(a.reserve_dtime, 'YYYYMMDDHH24MI'), 'YYYYMMDD') = to_char(/* admin_time */now(), 'YYYYMMDD')
            and b.show_group_id = /* show_group_id */:show_group_id
            and b.show_no = /* show_no */:show_no
            and b.sales_no = /* sales_no */:sales_no
            and a.cancel_flg = '0'
      ) first_count
      cross join (
        --本日購入した回数取得
        select
          count(*) as day_entry_count
        from
          t_reserve_info a
          inner join t_urikake_detail b
            on a.client_id = b.client_id
            and a.client_id = /* client_id */:client_id
            and a.urikake_no = b.urikake_no
            and a.member_id != ''
            and a.member_id = /* member_id */:member_id
            and b.urikake_kb_cd in ('0', '1')
            and to_char(to_date(a.reserve_dtime, 'YYYYMMDDHH24MI'), 'YYYYMMDD') = to_char(/* admin_time */now(), 'YYYYMMDD')
            and a.cancel_flg = '0'
      ) day_entry_count
    where
      a.client_id = /* client_id */:client_id
      and a.show_group_id = /* show_group_id */:show_group_id
      and a.sales_no = /* sales_no */:sales_no
      and a.show_no = /* show_no */:show_no
  ) main