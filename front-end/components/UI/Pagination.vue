<template>
    <div class="rs-pagination" v-if="paginationRange.length >1">
        <ul>
            <li><a href="#" @click.prevent="pageChanged(1)" aria-label="First">&lt;&lt; </a></li>
            <li>
                <a v-show="paginationRange[0] != 1" href="#" @click.prevent="pageChanged(1)" aria-label="First">1 </a>
            </li>
            <li>
                <span v-show="paginationRange[0] != 1">...</span>
            </li>

            <li v-for="(pageNum,index) in paginationRange" :class="activePage(pageNum)">
                <a href="#" v-show="!activePage(pageNum)" @click.prevent="pageChanged(pageNum)">{{ pageNum }} </a>
                <span v-show="activePage(pageNum)">{{ pageNum }}</span>
            </li>

            <li>
                <span v-show="paginationRange[paginationRange.length -1] != lastPage">...</span>
            </li>
            <li>
                <a href="#" v-show="paginationRange[paginationRange.length -1] != lastPage"
                   @click.prevent="pageChanged(lastPage)" aria-label=""> {{lastPage}}</a>
            </li>
            <li>
                <a href="#" @click.prevent="pageChanged(lastPage)" aria-label="Last">>></a>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
  name: "Pagination",
  props: {
    currentPage: Number,
    // Total page
    totalPages: Number,
    // Items per page
    itemsPerPage: Number,
    // Total items
    totalItems: Number,
    // Visible Pages
    visiblePages: {
      type: Number,
      default: 5,
    }
  },
  data() {
    return {
      currentPageTemp: this.currentPage
    }
  },
  watch: {
    // Whenever currentPage changes, change currentPageTemp for the same
    currentPage: function () {
      this.currentPageTemp = this.currentPage;
    }
  },
  computed: {
    lastPage() {
      // Get last page number in pagination
      return this.totalItems % this.itemsPerPage === 0
        ? this.totalItems / this.itemsPerPage
        : Math.floor(this.totalItems / this.itemsPerPage) + 1
    },
    paginationRange() {
      // Array of pagination can visiable
      let start = this.currentPage - this.visiblePages / 2 <= 0
        ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
          ? this.lowerBound(this.lastPage - this.visiblePages + 1, 1)
          : Math.ceil(this.currentPage - this.visiblePages / 2);
      let range = [];
      for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {
        range.push(start + i);
      }
      return range;
    }
  },
  methods: {
    lowerBound(num, limit) {
      return num >= limit ? num : limit;
    },
    pageChanged(pageNum) {
      // Action trickger when change page , emit event page-changed
      history.pushState(null, null, '?page=' + pageNum);
      this.currentPageTemp = pageNum
      // emit event for parent component
      this.$emit('page-changed', pageNum);
    },
    activePage(pageNum) {
      // Set current class for active page
      return this.currentPageTemp === pageNum ? 'current' : ''
    }
  }
}
</script>

