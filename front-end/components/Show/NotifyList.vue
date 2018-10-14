<template>
  <div>
    <div class="notify-list">
      <NotifyListItem v-for="(notify, index) in notifyList" v-bind:notify="notify" v-bind:key="index"/>
    </div>
    <Pagination :current-page="notifyPage.currentPage"
      :total-items="notifyPage.totalItems"
      :items-per-page="notifyPage.itemsPerPage"
      @page-changed="pageChanged">
    </Pagination>
  </div>
</template>

<script>
import NotifyListItem from '@/components/Show/NotifyListItem'
import Pagination from '@/components/UI/Pagination'
export default {
name: "NotifyList",
props: ['notifyList', 'notifyPage'],
components: {
  Pagination,
  NotifyListItem
  },
  methods: {
    pageChanged(pageNum){
      this.$emit('page-changed', pageNum);
    }
  },
  watch: {
    pageNum(pageNum){
      console.log(notifyPage)
    }
  }
}
</script>

<style scoped>

</style>
