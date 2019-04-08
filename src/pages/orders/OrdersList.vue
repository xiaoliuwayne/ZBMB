<template>
<div>
  <h3 class="main-bk">{{ title }}</h3>
  <!--<van-nav-bar-->
    <!--title="找布买布"-->
    <!--left-arrow-->
    <!--@click-left="back"-->
    <!--class="main-bk header"-->
  <!--/>-->
  <van-tabs @click="onClick" color="#1aad19" v-model="active">
    <van-tab title="待接单">
      <div class="card" v-for="(item,hh) in showDatasWait" :key="hh" @click="goRequirement('w',item.inquiryId)">
        <div style="width: 20vw"  align="center">
          <img :src="item.imgUrl" alt="样布图片"/>
        </div>
        <div style="width: 70vw;">
          <p><span class="card-div-span">{{item.createTime}}</span>
            <span style="color: red;float: right;" class="card-div-span">{{item.expireTime}}</span>
          </p>
          <p class="card-div-p">面料种类：{{item.clothType}}</p>
          <p class="card-div-p">说明：{{item.desc}}</p>
        </div>
        <div style="width: 14vw;">
          <p class="card-div-span" style="text-align: center">{{item.status}}</p>
        </div>
      </div>
      <!--<van-card-->
        <!--num="2"-->
        <!--tag="标签"-->
        <!--price="2.00"-->
        <!--desc="描述信息"-->
        <!--title="商品标题"-->
        <!--thumb=""-->
        <!--origin-price="10.00"-->
      <!--&gt;-->
        <!--<div slot="footer">-->
          <!--<van-button size="mini">按钮</van-button>-->
          <!--<van-button size="mini">按钮</van-button>-->
        <!--</div>-->
      <!--</van-card>-->
    </van-tab>
    <van-tab title="已接单">
      <div v-for="(item,gg) in showDatas" :key="gg" class="get-order">
        <div class="card" style="margin-bottom: 0" >
          <div style="width: 20vw"  align="center">
            <img :src="item.imgUrl" alt="样布图片"/>
          </div>
          <div style="width: 70vw;">
            <p><span class="card-div-span">{{item.createTime}}</span>
            </p>
            <p class="card-div-p">面料种类：{{item.clothType}}</p>
            <p class="card-div-p">说明：{{item.desc}}</p>
          </div>
          <div style="width: 14vw;">
            <p class="card-div-span" style="text-align: center">{{item.status}}</p>
          </div>
        </div>
        <div class="dot-line"></div>
        <div class="feedback">
          <span>色卡编号：{{item.receiptList[0]?item.receiptList[0].colorCardCode||'':''}}</span>
          <span>剪版价：{{item.receiptList[0]?String(item.receiptList[0].unitPrice) + '/元':'/元'}}</span>
          <span>
            <van-button @click="goRequirement('g',item.inquiryId, item.receiptList[0].receiptId)" class="bt-bright bt-check" >
              查看
            </van-button>
          </span>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import {STATUS, formatDate, CLOTHSTYLE, BASEURL, API} from '../../assets/js/common.js'
export default {
  data () {
    return {
      active: 1,
      index2responsed: {0: 0, 1: 1},
      title: '找布买布',
      page: 0,
      pageSize: 20, // 一页20条
      // responsed: 1,
      providerId: 0,
      inquiryId: 0,
      showDatas: [],
      showDatasWait: []
    }
  },
  created () {
    this.providerId = this.$route.params.providerId
    this.inquiryId = this.$route.params.inquiryId
    let flag = this.$route.params.flag
    console.log('orderlist=>create=>let flag', flag)
    if (flag) {
      if (flag === 'w') {
        this.active = 0
        console.log(200)
        this.init(this.active)
      } else {
        this.active = 1
        console.log(300)
        this.init(this.active)
      }
    } else {
      this.active = 0
      console.log(100)
      this.init(this.active)
    }
  },
  methods: {
    init (id) { // 已接单需求列表
      console.log('id:', id)
      this.getHttpData(id)
    },
    getHttpData (responsedId) { // 逻辑修改！！！
      // let url = '/tsebuapi/show.do?'
      let url = API + '/show.do?'
      // this.providerId = 28191
      let param = {
        'sendProviderId': this.providerId,
        'responsed': responsedId
      }
      let formData = {
        'cmd': 'queryInquiryList',
        'param': JSON.stringify(param),
        'page': this.page,
        'pageSize': this.pageSize
      }
      if (this.providerId <= 0) { // Id异常
        alert('this.providerId:' + String(this.providerId))
        return false
      }
      this.axios.post(BASEURL + url, this.qs.stringify(formData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(
        res => {
          console.log('orderlist=>res', res)
          let response = res.data
          if (response.exId) {
            alert(response.exDesc)
            // this.back()
          } else {
            console.log('orderList=>response', response)
            this.setShowDatas(response, responsedId)
          }
        }
      ).catch(function (error) {
        console.log('error', error)
      })
    },
    getClothType (keyWords) { // 设置面料种类
      if (keyWords) {
        let first = CLOTHSTYLE[keyWords[0].groupId]
        let second = keyWords[0].keyword
        return first + '-' + second
      }
    },
    setShowDatas (response, id) {
      this.showDatas = []
      this.showDatasWait = []
      response.list.forEach(obj => {
        let tmpCreate = formatDate(obj.createTime)
        let tmpExpire = formatDate(obj.expireTime)
        if (id === 1) {
          this.showDatas.push({
            'inquiryId': obj.inquiryId,
            'imgUrl': obj.imageList[0],
            'createTime': tmpCreate,
            'expireTime': tmpExpire,
            'status': STATUS[1], // 是否接单，obj.status
            'clothType': this.getClothType(obj.keywords), // obj.clothType,
            'desc': obj.desc, // obj.desc
            // 'colorCode': obj.colorCardCode, // obj.colorCode
            // 'price': String(obj.price) + '/米', // obj.price
            'receiptList': obj.receiptList
          })
        } else {
          this.showDatasWait.push({
            'inquiryId': obj.inquiryId,
            'imgUrl': obj.imageList[0],
            'createTime': tmpCreate,
            'expireTime': tmpExpire,
            'status': STATUS[0], // 是否接单，obj.status
            'clothType': this.getClothType(obj.keywords), // obj.clothType,
            'desc': obj.desc // obj.desc
          })
        }
      })
      console.log('this.showDatas', this.showDatas)
      console.log('this.showDatasWait', this.showDatasWait)
    },
    onClick (index, title) {
      console.log('index, title', index, title)
      this.getHttpData(this.active)
    },
    goRequirement (flag, inquiryId, receiptId) {
      this.$router.push({name: 'Requirement',
        params: {'flag': flag,
          'providerId': this.providerId,
          'inquiryId': inquiryId,
          'receiptId': receiptId
        }})
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
</style>
