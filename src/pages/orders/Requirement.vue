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
        <span><img :src="feedBackData.img" style="margin:5px;"></span>
        <span>
          <p>色卡编号：{{detailData.colorCode}}</p>
          <p>单价：{{detailData.price}}</p>
          <p>调样价格：{{detailData.samplePrice}}</p>
        </span>
        <span>
          <p>{{detailData.createTime}}</p>
          <p>{{detailData.status}}</p>
          <p>
            <!--<router-link :to="{name: 'Supplier'}" class="feedback-check bt-bright">-->
            <button class="feedback-check bt-bright">
              <router-link :to="{name: 'Supplier',params:{'flag': flag}}" style="color: white">
               查看
              </router-link>
            </button>
          </p>
        </span>
      </div>
      <div class="express-info">
        <span>物流单号：{{detailData.express}}|{{detailData.trackingNO}}</span>
        <button class="bt-express">
          <router-link :to="{name: 'Express'}" class="bt-express">
            查看快递状态
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate, CUSTOMIZE, TYPE} from '../../assets/js/common.js'
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
        'img': require('../../assets/zsi.png'),
        'colorCode': 'ASD12365478',
        'price': '5.00/米',
        'samplePrice': '10.00/米',
        'dateTime': '2019.3.22 20:26',
        'remind': '待确认调版',
        'express': {'name': '顺丰物流', 'trackingNO': '123456789876'}
      }
    }
  },
  created () {
    let flag = this.$route.params.flag
    this.providerId = this.$route.params.providerId
    this.inquiryId = this.$route.params.inquiryId
    this.inquiryId = 7
    console.log('Requirement => flag', flag)
    this.flag = flag
    this.getHttpData(this.inquiryId)
  },
  methods: {
    getHttpData (inquiryId) {
      let url = '/tsebuapi/show.do?'
      let formData = {
        'cmd': 'queryInquiryDetail',
        'inquiryId': inquiryId
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
          } else {
            console.log('requiremnet=>response', response)
            this.detailData['imgList'] = response.imageList
            this.detailData['clothType'] = '一级分类、二级分类' // response.imageList
            this.detailData['expireTime'] = formatDate(response.expireTime)
            this.detailData['createTime'] = formatDate(response.createTime)
            this.detailData['companyName'] = response.companyName
            this.detailData['name'] = response.name
            this.detailData['phone'] = response.phone
            this.detailData['type'] = TYPE[response.type]
            this.detailData['acceptCustomize'] = CUSTOMIZE[response.acceptCustomize]
            this.detailData['desc'] = response.desc
            this.detailData['colorCode'] = 'ASD12365478' // response.
            this.detailData['status'] = '待确认调版' // response // 待确认调版
            this.detailData['samplePrice'] = '15.00/米' // response.
            this.detailData['price'] = '10.00/米'// response.
            this.detailData['trackingNO'] = '123456789876' // response.
            this.detailData['express'] = '顺丰快递' // response.
            this.address = response.address
            // let addr = response.address
            // if (addr) {
            //   this.addrBase = addr.split('区')[0] + '区'
            //   this.addrOther = addr.split('区')[1]
            // }
          }
        }
      ).catch(function (error) {
        console.log('error', error)
      })
    },
    back () {
      this.$router.go(-1)
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
