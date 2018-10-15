<template>
  <div class="modal fade" id="topHeaderSearch" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <form @submit.prevent="searchModalShow">
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
                <input type="text"  class="form-control" name="q" id="staticEmail" @input="onInput"  v-model="keySearch"
                       :placeholder="$t('common.modal_search.lbl_key_placeholder')">
              </div>
            </div>
            <div class="form-group row">
              <label for="fromShowDate" class="col-sm-2 col-form-label">{{$t('common.modal_search.lbl_show_date')}}</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-sm-5">
                    <date-picker v-model="fromShowDate" v-bind:config="datepicker.config" :placeholder="'公演日'" id="fromShowDate"></date-picker>
                  </div>
                  <div class="col-sm-2">
                    ~
                  </div>
                  <div class="col-sm-5">
                    <date-picker v-model="toShowDate" v-bind:config="datepicker.config" :placeholder="'公演日'" id="toShowDate"></date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="fromSalesDate" class="col-sm-2 col-form-label">{{$t('common.modal_search.lbl_sales_date')}}</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-sm-5">
                    <date-picker v-model="fromSalesDate" v-bind:config="datepicker.config" :placeholder="'公演日'" id="fromSalesDate"></date-picker>
                  </div>
                  <div class="col-sm-2">
                    ~
                  </div>
                  <div class="col-sm-5">
                    <date-picker v-model="toSalesDate" v-bind:config="datepicker.config" :placeholder="'公演日'" id="toSalesDate"></date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="genreNo" class="col-sm-2 col-form-label">{{$t('common.modal_search.lbl_genre_no')}}</label>
              <div class="col-sm-10">
                <ul class="top-list-genre">
                  <li v-for="_genre in genreNoList" v-bind:key="_genre.genre_id">
                    <input type="checkbox" :id="'genreNo_'+_genre.genre_no" v-model="chkGenreList" :value="_genre.genre_no"><label :for="'genreNo_'+_genre.genre_no">{{_genre.genre_nm}}</label>
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
  import _api from '@/constant/api';
  import { post } from '@/plugins/api';
  import datePicker from "vue-bootstrap-datetimepicker"
  import route from "@/constant/router"
  export default {
    name: "TheHeaderModalSearch",
    components: {
      datePicker
    },
    props: ['keySearchM'],
    data() {
      return {
        keySearch: this.keySearchM,
        fromShowDate: this.$route.query.from_show_date,
        toShowDate: this.$route.query.to_show_date,
        fromSalesDate: this.$route.query.from_sales_date,
        toSalesDate: this.$route.query.to_sales_date,
        genreNo: this.$route.query.genre_no,
        genreNoList: null,
        chkGenreList: [],
        datepicker: {
          config: {
            format: 'YYYY/MM/DD',
            useCurrent: true,
            locale: 'ja'
          }
        }
      }
    },
    created() {
      post(_api.GENRE_LIST, {
        params:{
          client_id: this.$route.params.client_id
        }
      }).then(res => {
        this.genreNoList = res.data.data.genre_list
      })
    },

    watch: {
      keySearchM : function () {
        this.keySearch = this.keySearchM;
      },
      '$route'(){
        if (this.$route.name != route.LISTPERFORM) {
          this.keySearch = null
          this.fromShowDate = null
          this.toShowDate = null
          this.fromSalesDate = null
          this.toSalesDate = null
          this.chkGenreList = []
        }
      }
    },
    mounted(){

    },
    methods: {
      ...mapActions('show', ['startSearch']),
      searchModalShow() {
        let queryString = {
          q: this.keySearchM ? this.keySearchM.trim() : null,
          from_show_date: this.fromShowDate ? this.fromShowDate.trim() : null,
          to_show_date: this.toShowDate ? this.toShowDate.trim() : null,
          from_sales_date: this.fromSalesDate ? this.fromSalesDate.trim() : null,
          to_sales_date: this.toSalesDate ? this.toSalesDate.trim() : null,
          genre_no: this.chkGenreList
        }
        $('#topHeaderSearch').modal('hide')
        this.$router.push({path: `/${this.$route.params.client_id}`, query: queryString})
        this.$store.dispatch('show/startSearch');
      },
      onInput(e){
        this.$emit('update_keySearchM', e.target.value);
        // this.$parent.keySearchM = e.target.value;
      }
    }
  }
</script>

<style scoped>

</style>
