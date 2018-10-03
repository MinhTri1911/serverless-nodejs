
<template>
  <div class="container">
    <div class="Login">
      <div class="LoginHead">{{ $t('login.login_head') }}</div>
        <div class="center-align">
          <div>
            <h3>{{ $t('login.login_guide_1') }}</h3>
            <h3>{{ $t('login.login_guide_2') }}</h3>
          </div>
          <form  method="post" name="loginForm">
            <table>
              <tr>
                <td>メールアドレス：</td>
                <td rowspan="2"><input type="text" name="loginMail" v-model="mail" autocomplete="on"></td>
              </tr>
              <tr>
                <td>またはログインID：</td>
              </tr>
              <tr>
                <td>パスワード：</td>
                <td><input type="password" name="loginPwd" v-model="password" autocomplete="on"></td>
              </tr>
              <tr>
                <td class= "ErrorMessenger"colspan="2" v-if="error">メールアドレス(またはログインID)かパスワードが間違っています</td>
              </tr>
              <tr>
                <td></td>
                <td align="left">新規登録は<nuxt-link to="/register">こちら</nuxt-link></td>
              </tr>
              <tr>
                <td></td>
                <td  align="left">パスワードを忘れた方は<nuxt-link to="login/forgotpassword">こちら</nuxt-link></td>
              </tr>
              <tr>
                <td v-if="ManhinhChonghe"><button type="button" v-on:click="back">{{ $t('common.btn_back') }}</button></td>
                <td v-if="!ManhinhChonghe"><button type="button" v-on:click="list">公演一覧へ</button></td>
                <td><button type="button" @click="onSubmit()" >ログイン</button></td>
              </tr>
            </table>
          </form>
      </div>
    </div>
  </div>
  </template>

<script src="@@/business/login/Loginbusiness.js"></script>

<style lang="scss">
 @import "assets/scss/login";
</style>
