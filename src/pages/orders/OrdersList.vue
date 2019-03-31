<template>
<div>
  <h3 class="main-bk">{{ title }}</h3>
  <van-tabs @click="onClick" color="#1aad19">
    <van-tab title="待接单">
      <div class="card" v-for="(item,hh) in showDatasWait" :key="hh" @click="goRequirement('w')">
        <span>
          <img :src="item.imgUrl" alt="样布图片"/>
        </span>
        <span>
          <p>{{item.createTime}}<span style="color: red;float: right;margin-top: 0;">{{item.expireTime}}</span></p>
          <p>面料种类：{{item.clothType}}</p>
          <p>说明：{{item.desc}}</p>
        </span>
        <span style="width: 70px">
          <p style="margin: 2px 15px">{{item.status}}</p>
        </span>
      </div>
    </van-tab>
    <van-tab title="已接单">
      <div v-for="(item,gg) in showDatas" :key="gg" class="get-order">
        <div class="card" style="margin-bottom: 0" >
          <span>
            <img :src="item.imgUrl" alt="样布图片"/>
          </span>
          <span>
            <p>{{item.createTime}}</p>
            <p>面料种类：{{item.clothType}}</p>
            <p>说明：{{item.desc}}</p>
          </span>
          <span style="width: 70px">
            <p style="margin: 5px">{{item.status}}</p>
          </span>
        </div>
        <div class="dot-line"></div>
        <div class="feedback">
          <span>色卡编号：{{item.colorCode}}</span>
          <span>单价：{{item.price}}</span>
          <span>
            <van-button @click="goRequirement('g')" class="bt-bright bt-check" >
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
import {STATUS, formatDate} from '../../assets/js/common.js'
export default {
  data () {
    return {
      index2responsed: {0: 0, 1: 1},
      title: '找布买布',
      page: 0,
      pageSize: 20,
      // responsed: 1,
      providerId: 0,
      showDatas: [],
      showDatasWait: [],
      ordersDataWait: [
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:40', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:41', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:42', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:43', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:44', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:45', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:46', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'}
      ],
      ordersData: [
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:47', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:48', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:49', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:50', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:51', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:52', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/zsi.png'), 'dateTime': '2019.3.22 16:53', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'}
      ]
    }
  },
  created () {
    this.providerId = this.$route.params.providerId
    this.init()
  },
  methods: {
    init () {
      this.getHttpData(1)
    },
    getHttpData (responsedId) {
      let url = '/tsebuapi/show.do?'
      this.providerId = 28191
      let param = {
        'sendProviderId': this.providerId,
        'responsed': responsedId,
        'inquiryId': 7
      }
      let formData = {
        'cmd': 'queryInquiryList',
        'param': JSON.stringify(param),
        'page': this.page,
        'pageSize': this.pageSize
      }
      this.axios.post(url, this.qs.stringify(formData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(
        res => {
          console.log('orderlist=>res', res)
          let response = res.data
          if (response.exId) {
            alert(response.exDesc)
          } else {
            console.log('orderList=>response', response)
            this.setShowDatas(response, responsedId)
          }
        }
      ).catch(function (error) {
        console.log('error', error)
      })
    },
    setShowDatas (response, id) {
      this.showDatas = []
      this.showDatasWait = []
      response.list.forEach(obj => {
        let tmpCreate = formatDate(obj.createTime)
        let tmpExpire = formatDate(obj.expireTime)
        if (id === 0) { // 暂时互换，测试 id === 1
          this.showDatas.push({
            'imgUrl': obj.imageList[0],
            'createTime': tmpCreate,
            'expireTime': tmpExpire,
            'status': STATUS[1], // 是否接单，obj.status
            'clothType': '一级分类、二级分类', // obj.clothType,
            'desc': '水泥地上的是第四代是多少都会山东', // obj.desc
            'colorCode': 'ASD12365478', // obj.colorCode
            'price': '10/米' // obj.price
          })
        } else {
          this.showDatasWait.push({
            'imgUrl': obj.imageList[0],
            'createTime': tmpCreate,
            'expireTime': tmpExpire,
            'status': STATUS[1], // 是否接单，obj.status
            'clothType': '一级分类、二级分类', // obj.clothType,
            'desc': '水泥地上的是第四代是多少都会山东', // obj.desc
            'colorCode': 'ASD12365478', // obj.colorCode
            'price': '10/米' // obj.price
          })
        }
      })
      console.log('this.showDatas', this.showDatas)
      console.log('this.showDatasWait', this.showDatasWait)
    },
    onClick (index, title) {
      console.log('index, title', index, title)
      this.getHttpData(this.index2responsed[index])
    },
    goRequirement (flag) {
      this.$router.push({name: 'Requirement',
        params: {'flag': flag,
          'providerId': this.providerId,
          'inquiryId': 7}})
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
</style>
