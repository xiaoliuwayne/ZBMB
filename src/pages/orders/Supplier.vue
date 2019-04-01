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
        label="单价："
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
      <!--<p>色卡编号：{{showData.colorCode}}</p>-->
      <!--<p>品名：{{showData.productName}}</p>-->
      <!--<p>成分：{{showData.ingredients}}</p>-->
      <!--<p>幅宽：{{showData.width}}</p>-->
      <!--<p>克重：{{showData.weight}}</p>-->
      <!--<p>单价：{{showData.price}} 元</p>-->
      <!--<p>是否现货：{{showData.inStock}}</p>-->
      <!--<p>调样价格：{{showData.samplePrice}} 元</p>-->
      <!--<p style="font-weight: bolder">面料说明：</p>-->
      <!--<p>{{showData.desc}}</p>-->
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
export default {
  data () {
    return {
      flag: '',
      showData: {},
      imageList: [
        require('../../assets/zsi.png'),
        require('../../assets/zsi.png'),
        require('../../assets/zsi.png'),
        require('../../assets/zsi.png')
      ],
      comInfo: {}
    }
  },
  created () {
    this.comInfo = window.providerInfo
    this.showData = window.providerFeedBack
    if (!this.showData) {
      alert('您还没有填写需求回单！')
      this.back()
    }
    // let flag = this.$route.params.flag
    // let receiptId = this.$route.params.receiptId // 这个参数暂时没有传过来
    // receiptId = 11
    // console.log('supplier => flag', flag)
    // this.flag = flag
    // this.getHttpData(receiptId)
  },
  methods: {
    // getHttpData (receiptId) {
    //   let url = '/tsebuapi/show.do?'
    //   let formData = {
    //     'cmd': 'queryDemandReceipt',
    //     'queryDatas': JSON.stringify({}),
    //     'receiptId': receiptId
    //   }
    //   this.axios.post(url, this.qs.stringify(formData), {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }}).then(
    //     res => {
    //       console.log('supplier=>res', res)
    //       let response = res.data
    //       if (response.exId) {
    //         alert(response.exDesc)
    //         this.back()
    //       } else {
    //         console.log('supplier=>response', response)
    //         this.setShowData(response)
    //       }
    //     }
    //   ).catch(function (error) {
    //     console.log('error', error)
    //   })
    // },
    // setShowData (response) {
    //   this.showData['imgList'] = response.imgUrlList
    //   this.showData['clothType'] = '一级分类、二级分类' // response.imageList
    //   this.showData['inStock'] = SPOTSTATUS[response.spotStatus]
    //   this.showData['productName'] = response.productName
    //   this.showData['desc'] = response.description
    //   this.showData['colorCode'] = response.colorCardCode
    //   this.showData['weight'] = response.weight
    //   this.showData['samplePrice'] = response.samplePrice
    //   this.showData['price'] = response.unitPrice
    //   this.showData['width'] = response.width
    //   this.showData['ingredients'] = response.ingredients // 成分
    //   console.log('supplier=>this.showData', this.showData)
    // },
    back () {
      this.$router.go(-1)
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
