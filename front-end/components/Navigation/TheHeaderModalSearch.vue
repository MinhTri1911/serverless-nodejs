<template>
  <div class="modal fade" id="topHeaderSearch" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <form @submit.prevent="searchModalShow" autocomplete="off">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{$t('common.modal_search.title')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">{{$t('common.modal_search.lbl_key')}}</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="q" id="staticEmail" @input="onInput" v-model="keySearch"
                       :placeholder="$t('common.modal_search.lbl_key_placeholder')">
              </div>
            </div>
            <div class="form-group row">
              <label for="fromShowDate"
                     class="col-sm-2 col-form-label">{{$t('common.modal_search.lbl_show_date')}}</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-sm-5">
                    <date-picker v-model="fromShowDate" v-bind:config="datepicker.config" :placeholder="'公演日'"
                                 id="fromShowDate"></date-picker>
                  </div>
                  <div class="col-sm-2">
                    ~
                  </div>
                  <div class="col-sm-5">
                    <date-picker v-model="toShowDate" v-bind:config="datepicker.config" :placeholder="'公演日'"
                                 id="toShowDate"></date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="fromSalesDate"
                     class="col-sm-2 col-form-label">{{$t('common.modal_search.lbl_sales_date')}}</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-sm-5">
                    <date-picker v-model="fromSalesDate" v-bind:config="datepicker.config" :placeholder="'公演日'"
                                 id="fromSalesDate"></date-picker>
                  </div>
                  <div class="col-sm-2">
                    ~
                  </div>
                  <div class="col-sm-5">
                    <date-picker class="rs-datepicker" v-model="toSalesDate" v-bind:config="datepicker.config" :placeholder="'公演日'"
                                 id="toSalesDate"></date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="genreNo" class="col-sm-2 col-form-label">{{$t('common.modal_search.lbl_genre_no')}}</label>
              <div class="col-sm-10">
                <ul class="top-list-genre">
                  <li v-for="_genre in genreNoList" v-bind:key="_genre.genre_id">
                    <input type="checkbox" :id="'genreNo_'+_genre.genre_no" v-model="chkGenreList"
                           :value="_genre.genre_no"><label :for="'genreNo_'+_genre.genre_no">{{_genre.genre_nm}}</label>
                  </li>
                </ul>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('common.btn_close')}}</button>
            <button type="submit" class="btn btn-primary">{{$t('common.btn_search')}}</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex"
  import _api from '@/constant/api'
  import {post, get} from '@/plugins/api'
  import datePicker from "vue-bootstrap-datetimepicker"
  import route from "@/constant/router"

  export default {
    name: "TheHeaderModalSearch",
    components: {
      datePicker
    },
    props: ['keySearchM', 'searching', 'searchInfo', 'reset'],
    data() {
      return {
        keySearch: this.keySearchM,
        fromShowDate: this.$route.query.from_show_date,
        toShowDate: this.$route.query.to_show_date,
        fromSalesDate: this.$route.query.from_sales_date,
        toSalesDate: this.$route.query.to_sales_date,
        genreNoList: null,
        resetObjSearch: this.reset || false,
        chkGenreList: this.$route.query.genre_no || [],
        // resetObjSearch: this.reset,
        datepicker: {
          config: {
            format: 'YYYY/MM/DD',
            useCurrent: false,
            locale: 'ja',
            icons: {
              date: 'fa fa-calendar'
            }
          }
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        $('#topHeaderSearch').on('show.bs.modal', this.getListGenre)
      })
    },
    watch: {
      reset(value){
        this.resetObjSearch = value
      },
      // When user click logo, reload data and reset form search if searching
      resetObjSearch(reset) {
        if (reset) {
          this.resetSearch()
          this.$emit('update_reset', false)
          this.resetObjSearch = false
        }
      },
      // Sync value key search on top with key search on modal search
      keySearchM: function () {
        this.keySearch = this.keySearchM;
      },
      // When leave home page, clear form search with searching
      '$route'(to, from) {
        if (this.$route.name != route.LISTPERFORM) {
          this.keySearch = null
          this.fromShowDate = null
          this.toShowDate = null
          this.fromSalesDate = null
          this.toSalesDate = null
          this.chkGenreList = []
          this.genreNoList = null
        } else {
          if (this.searching) {
            this.keySearch = this.searchInfo.key_search || null
            this.fromShowDate = this.searchInfo.from_show_date || null
            this.toShowDate = this.searchInfo.to_show_date || null
            this.fromSalesDate = this.searchInfo.from_sales_date || null
            this.toSalesDate = this.searchInfo.to_sales_date || null
            this.chkGenreList = this.searchInfo.genre_no || []
          }
        }
      }
    },
    methods: {
      ...mapActions('show', ['startSearch']),
      searchModalShow() {
        let queryString = this.setDataSearch();
        $('#topHeaderSearch').modal('hide');
        this.$store.dispatch('show/addFormSearch', queryString);
        this.$store.dispatch('show/updateClickBtnSearch', true);
        this.$router.push({path: `/${this.$route.params.client_id}`, query: queryString});
      },

      onInput(e) {
        this.$emit('update_keySearchM', e.target.value);
      },

      /**
       * Convert data from request to dat search
       */
      setDataSearch() {
        let objSearch = [];
        if (this.keySearchM && this.keySearchM.trim()) {
          objSearch.key_search = this.keySearchM.trim();
        }

        if (this.fromShowDate && this.fromShowDate.trim()) {
          objSearch.from_show_date = this.fromShowDate.trim();
        }
        if (this.toShowDate && this.toShowDate.trim()) {
          objSearch.to_show_date = this.toShowDate.trim();
        }
        if (this.fromSalesDate && this.fromSalesDate.trim()) {
          objSearch.from_sales_date = this.fromSalesDate.trim();
        }
        if (this.toSalesDate && this.toSalesDate.trim()) {
          objSearch.to_sales_date = this.toSalesDate.trim();
        }

        if (this.chkGenreList && this.chkGenreList.length > 0) {
          objSearch.genre_no = this.chkGenreList;
        }
        return objSearch;
      },
      /**
       *
       */
      resetSearch() {
        this.keySearch = null
        this.fromShowDate = null
        this.toShowDate = null
        this.fromSalesDate = null
        this.toSalesDate = null
        this.chkGenreList = []
        // this.genreNoList = null
      },
      /**
       * Get list genre show from modal search
       * When click button search detail, show loading to get data and show modal
       * since done and loaded data to modal
       */
      getListGenre() {
        if (!this.genreNoList || this.genreNoList == null) {
          $(this.$el).addClass('rs-loading')
          get(_api.GENRE_LIST, {
            client_id: this.$route.params.client_id
          }).then(res => {
            $(this.$el).removeClass('rs-loading')
            this.genreNoList = res.data.data.genre_list
          })
            .catch(err => {
              $(this.$el).removeClass('rs-loading')
              this.$nuxt.$loading.finish()
            })
        }
      }
    }
  }
</script>
