<template>
  <div>
    <van-nav-bar
      title="需求单"
      left-arrow
      @click-left="back"
      class="main-bk header"
    />
    <div class="imgs" >
      <img v-for="(url,kk) in detailData.imgList" :key="kk"  v-lazy="url" alt="布料图片" @click="clickImg($event)">
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    </div>
    <div class="line"></div>
    <p class="p-header">需求说明：</p>
    <div class="desc">
      <van-field
        v-model="detailData.clothType"
        type="text"
        label="面料种类："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="detailData.type"
        type="text"
        label="类型："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="detailData.expireTime"
        type="text"
        label="有效期至："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="detailData.acceptCustomize"
        type="text"
        label="可否定制："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="detailData.desc"
        type="textarea"
        label="面料说明："
        placeholder=""
        :autosize="{minHeight: 70}"
        :readonly="true"
      />
      <!--<p>面料种类：{{detailData.clothType}}</p>-->
      <!--<p>类型：{{detailData.type}}</p>-->
      <!--<p>有效期至：{{detailData.expireTime}}</p>-->
      <!--<p>{{detailData.acceptCustomize}}</p>-->
      <!--<p class="p-header-small" >面料说明：</p>-->
      <!--<p>{{detailData.desc}}</p>-->
    </div>
    <div class="line"></div>
    <div class="com-info">
      <van-field
        v-model="detailData.companyName"
        type="text"
        label="公司名称："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="detailData.name"
        type="text"
        label="姓名："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="detailData.phone"
        type="text"
        label="移动电话："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="address"
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
    <div v-if="flag==='w'">
      <van-button class="bt-bright bt-big" @click="go('accept')">我要接这单</van-button>
      <!--<span style="background: #adadad;width: 50%;border: black 1px solid" @click="go('home')">放弃这单</span>-->
    </div>
    <div v-else class="req-more">
      <div class="line"></div>
      <p class="p-header">回单信息：</p>
      <div class="card">
        <div style="width: 30vw"  align="center">
          <img :src="feedBackData.img" style="margin-top:10px;width: 18vw;height: 18vw">
        </div>
        <div style="width: 40vw;">
          <p>色卡编号：{{feedBackData.colorCode}}</p>
          <p>剪版价：{{feedBackData.price}}</p>
          <p>调样价格：{{feedBackData.samplePrice}}</p>
        </div>
        <div style="width: 30vw;">
          <p>{{feedBackData.acceptDate}}</p>
          <p>{{feedBackData.sendSatus}}</p>
          <p>
            <!--<router-link :to="{name: 'Supplier'}" class="feedback-check bt-bright">-->
            <button class="feedback-check bt-bright">
              <router-link :to="{name: 'Supplier',params:{'flag': flag,'providerId': providerId,'inquiryId': inquiryId, 'receiptId': receiptId}}" style="color: white">
               查看
              </router-link>
            </button>
          </p>
        </div>
      </div>
      <div class="express-info" v-if="express.number">
        <span>物流信息：{{express.company}}|{{express.number}}</span>
        <!--<button class="bt-express">-->
          <!--<router-link :to="{name: 'Express',params: {'express': this.express}}" class="bt-express">-->
            <!--查看快递状态-->
          <!--</router-link>-->
        <!--</button>-->
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate, CUSTOMIZE, TYPE, CLOTHSTYLE, SENDSTATUS, BASEURL, API} from '../../assets/js/common.js'
import BigImg from '../../../src/components/BigImg'
export default {
  components: {'big-img': BigImg},
  data () {
    return {
      showImg: false,
      imgSrc: '',
      detailData: {},
      inquiryId: 0,
      providerId: 0,
      receiptId: 0,
      flag: '',
      address: '',
      addrBase: 'XX省XX市XX区',
      addrOther: 'XX街道XX路XX号',
      imageList: [
        require('../../assets/zsi.png'),
        require('../../assets/zsi.png'),
        require('../../assets/zsi.png'),
        require('../../assets/zsi.png')
      ],
      desc: {
        'clothType': '一级分类、二级分类',
        'type': '色卡',
        'time': '3天',
        'customization': '不接受定制',
        'specific': '面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、' +
          '面料说明、面料说明、面料说明、面料说明、面料说明、面料'
      },
      comInfo: {
        'comName': '面料说明',
        'name': '色卡',
        'phone': '123456783456',
        'addr': '面料说明面料说明面料说明'
      },
      feedBackData: {
        'img': '',
        'colorCode': '',
        'price': '',
        'samplePrice': '',
        'acceptDate': '',
        'sendSatus': ''
      },
      express: {}
    }
  },
  created () {
    this.flag = this.$route.params.flag
    this.providerId = this.$route.params.providerId
    this.inquiryId = this.$route.params.inquiryId
    this.receiptId = this.$route.params.receiptId
    console.log('requirement==>this.inquiryId', this.inquiryId)
    // this.inquiryId = 7
    if (this.flag === 'g') { // 已经接单了，可以获取回单信息
      this.getFeedBackData()
      this.getHttpData(this.inquiryId)
    } else {
      this.getHttpData(this.inquiryId)
    }
  },
  methods: {
    getFeedBackData () { // 获取供应商回单信息
      let url = API + '/show.do?'
      let formdata = {
        'cmd': 'getInquiryReceiptList',
        'userId': this.providerId,
        'page': 0,
        'pageSize': 10,
        'inquiryId': this.inquiryId,
        'status': -1
      }
      if (this.providerId <= 0 || this.inquiryId <= 0) { // Id异常
        alert('this.providerId:' + String(this.providerId) + ',this.inquiryId:' + String(this.inquiryId))
        return false
      }
      this.axios.post(BASEURL + url, this.qs.stringify(formdata), {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}).then(res => {
        console.log('getFeedBackData=>res', res)
        if (res.exId) {
          alert(res.desc)
        } else {
          console.log('getFeedBackData=>res.data: ', res.data)
          // item.receiptList[0]?item.receiptList[0].colorCardCode||'':''
          this.feedBackData['img'] = res.data.list[0] ? res.data.list[0].imgUrlListValue[0] : require('../../assets/zsi.png')
          this.feedBackData['colorCode'] = res.data.list[0] ? res.data.list[0].colorCardCode : 'ASD12365478'
          this.feedBackData['price'] = String(res.data.list[0].unitPrice) + '/米'
          this.feedBackData['samplePrice'] = String(res.data.list[0].samplePrice) + '/米'
          this.feedBackData['acceptDate'] = formatDate(res.data.list[0].createTime)
          this.feedBackData['sendSatus'] = SENDSTATUS[res.data.list[0].status]
          console.log('this.feedBackData=>', this.feedBackData)
        }
      })
    },
    getHttpData (inquiryId) { // 获取需求详细信息
      let url = API + '/show.do?'
      let formData = {
        'cmd': 'queryInquiryDetail',
        'inquiryId': inquiryId
      }
      if (this.inquiryId <= 0) { // Id异常
        alert('this.inquiryId:' + String(this.inquiryId))
        return false
      }
      this.axios.post(url, this.qs.stringify(formData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(
        res => {
          console.log('requiremnet=>res', res)
          let response = res.data
          if (response.exId) {
            alert(response.exDesc)
            this.back()
          } else {
            console.log('requiremnet=>response', response)
            this.detailData['imgList'] = response.imageList
            this.detailData['clothType'] = this.getClothType(response.keywords) // response.imageList
            this.detailData['expireTime'] = formatDate(response.expireTime)
            // this.detailData['createTime'] = formatDate(response.createTime)
            this.detailData['companyName'] = response.companyName
            this.detailData['name'] = response.name
            this.detailData['phone'] = response.phone
            this.detailData['type'] = TYPE[response.type]
            this.detailData['acceptCustomize'] = CUSTOMIZE[response.acceptCustomize]
            this.detailData['desc'] = response.desc
            this.address = response.address
            if (response.trackingNum) { // 如果有物流信息,
              this.express.company = response.deliCom
              this.express.number = response.trackingNum
              this.express.companyType = response.deliType
              this.express.receiverPhone = response.phone
            }
          }
        }
      ).catch(function (error) {
        console.log('error', error)
      })
    },
    back () {
      // this.$router.go(-1)
      console.log('requirement->back=>this.flag', this.flag)
      if (!this.flag) {
        this.flag = 'g'
      }
      this.$router.push({name: 'OrdersList', params: {'providerId': this.providerId, 'inquiryId': this.inquiryId, 'flag': this.flag}})
    },
    go (flag) {
      if (flag === 'accept') {
        this.$router.push({name: 'Customer',
          params: {'inquiryId': this.inquiryId,
            'providerId': this.providerId}})
      } else {
        this.$router.push('/')
      }
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
    },
    getClothType (keyWords) { // 设置面料种类
      let first = CLOTHSTYLE[keyWords[0].groupId]
      let second = keyWords[0].keyword
      return first + '-' + second
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
  .feedback-detail{
    display: flex;
  }
  .feedback-detail img{
    width: 60px;
    height: 60px;
  }
  .feedback-detail span{
  }
</style>
