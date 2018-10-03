import ItemShow from "@/components/Show/ItemShow"
import ItemNotify from "@/components/Show/ItemNotify"
import axios from "axios"
import { mapState, mapGetters } from 'vuex'

export default {
  name: "Index",
  components: {
    ItemShow,
    ItemNotify
  },
  data() {
    return {
      data: '123',
      shows: [],
      bottom: false,
      page: 1
    }
  },
  // beforeCreate() {
  //   alert('before create' + this.data + this.$el);
  // },
  // created() {
  //   alert('created' + this.data + this.$el);
  // },
  // beforeMount() {
  //   alert('before mount' + this.data + this.$el);
  // },
  // mounted() {
  //   alert('mounted' + this.data + this.$el);
  // },
  //
  // beforeUpdate() {
  //   alert('before update' + this.data + this.$el);
  // },
  // updated() {
  //   alert('updated' + this.data + this.$el);
  // }
  mounted() {
    // Add event scroll window
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible();
    });
    this.$nextTick(() => {
      this.addShow();
    });
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight ;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return scrollY && (bottomOfPage || pageHeight < visible);
    },
    addShow() {
      this.$nuxt.$loading.start();
      axios.get('http://localhost:4000/shows?page='+this.page)
        .then(res => {
          this.shows = [...this.shows, ...res.data.data];
          this.page++;
          this.$nuxt.$loading.finish();
        })
        .catch(error => {
          console.log('Not found data');
          this.$nuxt.$loading.finish();
        })
        .finally(() => {
          this.$nuxt.$loading.finish();
        });
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        // console.log(bottom, this.shows);
        this.addShow();
      }
    }
  }
}
