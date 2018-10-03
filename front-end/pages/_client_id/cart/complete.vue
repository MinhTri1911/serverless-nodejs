<template>
    <div id="MainC">
        <!-- Main Contents -->
        <main class="clearfix" id="ContentsPane">
            <h1 class="rs-title-pg"><span id="Pagetitle">予約完了</span></h1>
            <div class="clearfix" id="SingleContents">


                <!-- コンテンツペイン -->

                <section id="compCom">
                    <p>ご登録メールアドレスに確認メールをお送りいたしましたので、ご確認ください。<br>
                        確認メールはチケットが届くまで大事に保存して下さい。</p>
                </section>

                <!--予約テーブル-->
                <table width="100%" border="1" class="cartTable rs-table table-line">
                    <caption>
                        予約された公演
                    </caption>
                    <tbody>
                    <tr>
                        <th scope="row">予約番号</th>
                        <td>0000000001</td>
                    </tr>
                    <tr>
                        <th scope="row">公演名</th>
                        <td>山田太郎バイオリンリサイタル全国ツアー</td>
                    </tr>
                    <tr>
                        <th scope="row">公演日</th>
                        <td>2018年6月1日（金）19：00開演（18：00開場）</td>
                    </tr>
                    <tr>
                        <th scope="row">会場</th>
                        <td>東京オペラシティ　コンサートホール</td>
                    </tr>
                    <tr>
                        <th scope="row">選択中の座席</th>
                        <td>
                            SS席　1階　5列　34<br>
                            SS席　1階　5列　35
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">合計金額</th>
                        <td>
                            21,600円（税込）
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">お支払い方法</th>
                        <td>クレジットカード</td>
                    </tr>
                    </tbody>
                </table>


            </div>
        </main>
        <!-- Main Contents end --></div>
</template>

<script>
    export default {
        name: "complete"
    }
</script>

<style scoped>

</style>
