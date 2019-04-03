<template>
  <div>
    <van-nav-bar
      title="供应商回样单"
      left-arrow
      @click-left="back"
      class="main-bk"
    />
    <div class="imgs" >
      <img v-for="(url,kk) in showData.imgList" :key="kk"  v-lazy="url" alt="布料图片">
    </div>
    <div class="line"></div>
    <p style="font-weight: bolder;font-size: 18px">回样说明：</p>
    <div class="desc">
      <van-field
        v-model="showData.colorCode"
        type="text"
        label="色卡编号："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="showData.productName"
        type="text"
        label="品名："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="showData.ingredients"
        type="text"
        label="成分："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="showData.width"
        type="text"
        label="幅宽："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="showData.weight"
        type="text"
        label="克重："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="showData.price"
        type="text"
        label="剪版价："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="showData.inStock"
        type="text"
        label="是否现货："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="showData.samplePrice"
        type="number"
        label="调样价格："
        placeholder="免费"
        :readonly="true"
      />
      <van-field
        v-model="showData.desc"
        type="textarea"
        label="面料说明："
        placeholder=""
        :autosize="{minHeight: 70}"
        :readonly="true"
      />
    </div>
    <div class="line"></div>
    <p class="p-header">供应商信息：</p>
    <div class="com-info">
      <van-field
        v-model="comInfo.companyName"
        type="text"
        label="公司名称："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="comInfo.name"
        type="text"
        label="姓名："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="comInfo.phone"
        type="text"
        label="移动电话："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="comInfo.address"
        type="textarea"
        label="收货地址："
        placeholder=""
        :readonly="true"
      />
      <!--<p><span class="p-header-small per-info">公司名称：</span>{{comInfo.comName}}</p>-->
      <!--<p><span><span class="p-header-small per-info">姓名：</span>{{comInfo.name}}</span>-->
        <!--<span style="margin-left: 20%"><span class="p-header-small per-info">移动电话：</span>{{comInfo.phone}}</span></p>-->
      <!--<p><span class="p-header-small per-info">收货地址：</span>{{comInfo.addr}}</p>-->
    </div>
  </div>
</template>

<script>
// CUSTOMIZE, TYPE, formatDate,
import {BASEURL, API, SPOTSTATUS} from '../../assets/js/common.js'
export default {
  data () {
    return {
      flag: '',
      showData: {
        // 'desc': '',
        // 'samplePrice': 0.0,
        // 'inStock': '',
        // 'price': 0.0,
        // 'weight': '',
        // 'width': '',
        // 'ingredients': '',
        // 'productName': '',
        // 'colorCode': '',
        // 'imgList': []
      },
      providerId: 0,
      inquiryId: 0,
      receiptId: 0,
      // imageList: [
      //   require('../../assets/zsi.png'),
      //   require('../../assets/zsi.png'),
      //   require('../../assets/zsi.png'),
      //   require('../../assets/zsi.png')
      // ],
      comInfo: {}
    }
  },
  created () {
    this.comInfo = window.providerInfo
    this.showData = window.providerFeedBack
    this.providerId = this.$route.params.providerId
    this.inquiryId = this.$route.params.inquiryId
    this.receiptId = this.$route.params.receiptId
    this.flag = this.$route.params.flag
    this.showData = {
      'desc': '',
      'samplePrice': 0.0,
      'inStock': '',
      'price': 0.0,
      'weight': '',
      'width': '',
      'ingredients': '',
      'productName': '',
      'colorCode': '',
      'imgList': []
    }
    console.log('supplier=>this.inquiryId', this.inquiryId)
    console.log('supplier=>this.providerId', this.providerId)
    console.log('supplier=>this.receiptId', this.receiptId)
    this.getFeedBackDetail()
  },
  methods: {
    getFeedBackDetail () { // 获取供应商回单信息详情
      let url = API + '/show.do?'
      let queryDatas = {
        // 'userId': this.providerId,
        // 'page': 0,
        // 'pageSize': 10,
        // 'inquiryId': this.inquiryId,
        // 'status': -1
      }
      let formdata = {
        'cmd': 'queryInquiryReceipt',
        'queryDatas': JSON.stringify(queryDatas),
        'receiptId': this.receiptId
      }
      if (this.receiptId <= 0) { // Id异常
        alert('this.receiptId:' + String(this.receiptId))
        return false
      }
      this.axios.post(BASEURL + url, this.qs.stringify(formdata), {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}).then(res => {
        console.log('supplier=>res', res)
        if (res.exId) {
          alert(res.desc)
        } else {
          console.log('getFeedBackDetail=>res.data: ', res.data)
          console.log('supplier=>this.showData:', this.showData)
          this.setShowData(res.data)
        }
      })
    },
    setShowData (data) {
      this.showData['desc'] = data.description
      this.showData['samplePrice'] = String(data.samplePrice) + '/元'
      this.showData['inStock'] = SPOTSTATUS[data.spotStatus]
      this.showData['price'] = String(data.unitPrice) + '/元'
      this.showData['weight'] = data.weight
      this.showData['width'] = data.width
      this.showData['ingredients'] = data.ingredients
      this.showData['productName'] = data.productName
      this.showData['colorCode'] = data.colorCardCode
      this.showData['imgList'] = data.imgUrlListValue
    },
    back () {
      // this.$router.go(-1)
      this.$router.push({name: 'Requirement', params: {'providerId': this.providerId, 'inquiryId': this.inquiryId, 'flag': this.flag, 'receiptId': this.receiptId}})
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
  .aaa{
    display: flex;
    /*position: fixed;*/
    /*bottom: 0;*/
  }
  .aaa img{
    width: 60px;
    height: 60px;
  }
  .aaa span{
    font-size: 12px;
  }
</style>
