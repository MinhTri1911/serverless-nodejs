<template>
  <div class="mt-4 mb-3" v-if="dataClientInfo">
    <div class="mb-2">{{$t('common.title_qa')}}</div>
    <table class="rs-table table-line w-100">
      <tbody>
        <tr>
          <td class="w-25">{{$t('common.client.name')}}</td>
          <td class="w-75">{{ dataClientInfo.inquiry_nm }}</td>
        </tr>
        <tr>
          <td class="w-25">{{$t('common.client.phone')}}</td>
          <td class="w-75"><a class="lb-question" :href="'tel:'+dataClientInfo.inquiry_tel_no">{{ dataClientInfo.inquiry_tel_no }}</a></td>
        </tr>
        <tr>
          <td class="w-25">{{$t('common.client.url')}}</td>
          <td class="w-75"><a class="lb-question" :href="dataClientInfo.inquiry_url">{{ dataClientInfo.inquiry_url }}</a></td>
        </tr>
        <tr>
          <td class="w-25">{{$t('common.client.remark')}}</td>
          <td class="w-75">{{ dataClientInfo.inquiry_notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="block-center block-client-info" v-else>
    {{$t('common.lbl_loading')}}
  </div>
</template>

<script>
  export default {
    name: "ClientInfo",
    props: ["clientInfo"],
    data(){
      return {
        loading: false
      }
    },
    computed: {
      dataClientInfo(){
        if (this.clientInfo) {
          return {
            inquiry_nm: this.clientInfo.inquiry_nm || this.clientInfo.inquiryNm ? this.clientInfo.inquiry_nm || this.clientInfo.inquiryNm  : "",
            inquiry_notes: this.clientInfo.inquiry_notes || this.clientInfo.inquiryNote ? this.clientInfo.inquiry_notes || this.clientInfo.inquiryNote : "",
            inquiry_tel_no: this.clientInfo.inquiry_tel_no || this.clientInfo.inquiryTelNo ? this.clientInfo.inquiry_tel_no || this.clientInfo.inquiryTelNo : "",
            inquiry_url: this.clientInfo.inquiry_url || this.clientInfo.inquiryUrl ? this.clientInfo.inquiry_url || this.clientInfo.inquiryUrl : "",
          }
        }
        return null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "assets/scss/variables";
  .block-client-info{
    border-radius: 10px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: $color-blue-dianne;
  }
</style>
