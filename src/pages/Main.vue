<template>
  <div>
    <h3 class="main-bk">{{ title }}</h3>
    <p>您好！{{provider}}：</p>
    <p>{{companyName}}的{{name}}向您发来了一个面料采购信息！</p>
    <div class="imgs" >
      <!--图片轮播-->
      <!--<van-swipe :autoplay="3000" style="height: 100%;width: 100%">-->
        <!--<van-swipe-item v-for="(url, index) in imageList" :key="index" style="height: 100%;width: 100%;float: left">-->
          <!--&lt;!&ndash;<img v-lazy="url" alt="布料图片" @click="clickImg($event)"/>&ndash;&gt;-->
          <!--<img :src="url" alt="布料图片" @click="clickImg($event)"/>-->
          <!--<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>-->
        <!--</van-swipe-item>-->
      <!--</van-swipe>-->
      <img v-for="(url,index) in imageList" :key="index" :src="url" alt="布料图片" @click="clickImg($event)">
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    </div>
    <div class="line"></div>
    <div class="desc">
      <van-field
        v-model="type"
        type="text"
        placeholder=""
        label="类型："
        :readonly="true"
      />
      <van-field
        v-model="expireTime"
        type="text"
        label="有效期至："
        :readonly="true"
      />
      <van-field
        v-model="customization"
        type="text"
        label="可否定制："
        placeholder=""
        :readonly="true"
      />
      <!--<p style="font-weight: bolder;margin: 0 15px">面料说明：</p>-->
      <van-field
        v-model="desc"
        type="textarea"
        placeholder=""
        label="面料说明："
        :autosize="{minHeight: 70}"
        :readonly="true"
      />
      <!--<p>类型：{{type}}</p>-->
      <!--<p>有效期至：{{expireTime}}</p>-->
      <!--<p>{{customization}}</p>-->
      <!--<p style="font-weight: bolder;margin: 0 15px">面料说明：</p>-->
      <!--<p style="margin: 5px 15px">{{desc}}</p>-->
    </div>
    <div class="line"></div>
    <h4 >请进入“找布买布”，接这一单</h4>
    <!--<van-button type="info" @click="goOrders" style="width:30%;margin: 0 35%;background: #4b8feb;border-radius: 5px;color: white ">-->
      <van-button @click="goOrders" style="" class="bt-bright bt-accept">
        接单
     </van-button>
  </div>
</template>

<script>
import BigImg from '../../src/components/BigImg'
// import {CUSTOMIZE, TYPE, formatDate} from '../../static/js/common.js'
import {CUSTOMIZE, TYPE, formatDate} from '../assets/js/common.js'
export default {
  components: {'big-img': BigImg, CUSTOMIZE, TYPE, formatDate},
  data () {
    return {
      title: '找布买布',
      showImg: false,
      imgSrc: '',
      provider: '',
      companyName: '',
      name: '',
      customization: '',
      desc: '',
      type: '',
      expireTime: '',
      providerId: 0,
      imageList: []
    }
  },
  created () {
    let code = this.$route.params.code
    console.log('code:', code)
    this.init(code)
  },
  methods: {
    init (code) {
      let url = '/tsebuapi/show.do?cmd=querySendInfoByCode&code=' + String(code)
      this.axios.get(url).then(res => {
        console.log('main==>res', res)
        let response = res.data
        if (response.exId) {
          alert(response.exDesc)
          this.$router.push('/')
        } else {
          console.log('main==>response', response)
          this.provider = response.provider
          this.companyName = response.inquiry.companyName
          this.name = response.inquiry.name
          let timestamp = response.inquiry.expireTime
          this.expireTime = formatDate(timestamp)
          let typeId = response.inquiry.type
          this.type = TYPE[typeId]
          let customizationId = response.inquiry.acceptCustomize
          this.customization = CUSTOMIZE[customizationId]
          this.desc = response.inquiry.desc
          this.providerId = response.userId
          let imgList = response.inquiry.imageList
          if (imgList.length === 0) {
            this.imageList = [
              require('../assets/zsi.png'),
              require('../assets/zsi1.jpg'),
              require('../assets/zsi1.jpg'),
              require('../assets/zsi1.jpg'),
              require('../assets/zsi1.jpg')
            ]
          } else {
            this.imageList = imgList
          }
          // 供应商的基本信息
          window.providerInfo = {
            'companyName': response.provider,
            'name': '我来自Main=>window.providerInfo,没有此字段',
            'tel': response.tel,
            'address': '我来自Main=>window.providerInfo,没有此字段',
            'keywords': [
              {'groupId': 2, 'inquiryId': 7, 'keyId': 2007, 'keyword': '牛仔面料'},
              {'groupId': 1, 'inquiryId': 7, 'keyId': 1016, 'keyword': '直贡呢'},
              {'groupId': 2, 'inquiryId': 7, 'keyId': 2006, 'keyword': '平布'},
              {'groupId': 1, 'inquiryId': 7, 'keyId': 1017, 'keyword': '针织毛呢'}
            ]
          }
        }
      })
    },
    goOrders () {
      this.$router.push({name: 'OrdersList', params: {'providerId': this.providerId}})
      // alert('系统维护中')
    },
    clickImg (e) {
      this.showImg = true
      // 获取当前图片地址
      console.log('clickImg=>e', e)
      this.imgSrc = e.currentTarget.src
      // this.imgSrc = e.target.dataset.src
      console.log('this.imgSrc: ', this.imgSrc)
    },
    viewImg () {
      this.showImg = false
    }
  }
}
</script>

<style scoped>
  @import '../assets/css/mycss.css';
</style>
