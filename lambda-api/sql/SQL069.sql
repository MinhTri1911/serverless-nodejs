select
  tri.reserve_no
  , tuf.fee_no
  , tuf.fee_nm
  , tuf.fee_price
  , tudf.fee_no as detail_fee_no
  , tudf.fee_nm as detail_fee_nm
  , sum(tudf.fee_price) as detail_fee_price
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
  inner join t_urikake_detail tud
    on tri.client_id = tud.client_id
    and tri.urikake_no = tud.urikake_no
    and hrsi.show_group_id = tud.show_group_id
    and hrsi.show_no = tud.show_no
    and hrsi.seat_no = tud.seat_no
  left join t_urikake_fee tuf
    on tu.client_id = tuf.client_id
    and tu.urikake_no = tuf.urikake_no
  left join t_urikake_detail_fee tudf
    on tud.client_id = tudf.client_id
    and tud.urikake_no = tudf.urikake_no
    and tud.urikake_detail_no = tudf.urikake_detail_no
where
  tri.client_id = $client_id
  and tri.member_id = $member_id
  and tri.reserve_no = $reserve_no
group by
  tri.reserve_no
  , tuf.fee_no
  , tuf.fee_nm
  , tuf.fee_price
  , tudf.fee_no
  , tudf.fee_nm
