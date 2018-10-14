<template>
  <div class="notify-item">
    <p class="notify-tt">{{notify.information_title}}</p>
    <p class="notify-ct"><span class="notify-dt">{{notify.apply_start_dtime}}</span>{{notify.information_contents}}</p>
  </div>
</template>

<script>
  export default {
    name: "NotifyListItem",
    props: ['notify']
  }
</script>

<style lang="scss">
  .notify-item{
    p{
      margin-bottom: 5px;
    }
  }
</style>
