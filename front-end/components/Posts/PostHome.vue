<template>
    <div>
        <table width="100%" border="1" class="eventList rs-table table-dot">
        <thead>
            <tr>
                <th>公演名</th>
                <th>ジャンル</th>
                <th>公演期間</th>
                <th>&nbsp;</th>
            </tr>
            　</thead>
            <tbody>

            <tr v-for="post in postList">
                <td class="eventTitle"><a href="detail/detail001.html">{{post.title}}</a></td>
                <td class="genre"><img src="@/assets/images/icon_brass.gif" width="100" height="30" alt="吹奏楽"/></td>
                <td class="term">{{post.from}}～{{post.to}}</td>
                <td class="controll"><a href="detail/detail001.html"><img src="@/assets/images/btn_detail.gif" width="92" height="35" alt="詳細"/></a></td>
            </tr>

            </tbody>
        </table>　
    </div>
</template>

<script>
export default {
  name: "PostHome",
  props: {
    postList: Array
  }

}
</script>

