import Pagination from "@/components/UI/Pagination"
import PostHome from "@/components/Posts/PostHome"
import axios from 'axios'

export default {
  components: {Pagination,PostHome},
  head() {
    return {
      title: this.$t('common.home.title'),
    }
  },
  data() {
    return {
      postList : [],
      page: {
        currentPage: 1,
        totalPages: 1,
        totalItems : 1,
        itemsPerPage : 3
      }
    }
  },
  created() {
    this.loadedPosts(1);
  },
  methods: {
    loadedPosts(pageNum) {
      // Get Post from server when change page
      let url = "http://localhost:3003/posts"+"-page-"+pageNum ;
      axios.get(url)
        .then(res => {
          const postsArray = [];
          // Push post item to array posts
          for (const key in res.data.items) {
            postsArray.push({...res.data.items[key] ,id :key});
          }
          // Set posts to data
          this.postList = postsArray;
          this.page.totalItems = res.data.total_items;
        })
        .catch(e => {
          console.log(e);
        })
    },
    pageChanged(pageNum) {
      // event change page , get posts in page
      this.page.currentPage = pageNum;
      this.loadedPosts(pageNum);
    }
  }
};
