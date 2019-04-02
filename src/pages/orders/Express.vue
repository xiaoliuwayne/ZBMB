<template>
  <div>
    <van-nav-bar
      title="物流状态"
      left-arrow
      @click-left="back"
      class="main-bk header"
    />
    <div class="content">
      <span class="p-header">快递公司：{{trackingContent.company}}</span>
      <span class="p-header" style="float: right">运单号：{{trackingContent.no}}</span>
      <div>
        <p v-for="item in trackingContent.list" :key="item.datetime">
          <span style="color: #ff4f4f;font-size: 12px">{{item.datetime}}</span><span>{{item.remark}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      trackingContent: {},
      number: '',
      receiverPhone: '',
      companyType: ''
    }
  },
  created () {
    let express = this.$route.params.express
    this.number = express.number
    this.receiverPhone = express.receiverPhone.substring(express.receiverPhone.length - 4) // 截取最后四位
    this.companyType = express.companyType
    // if (!this.number) {
    //   this.number = '803264688116'
    // }
    // if (!this.receiverPhone) {
    //   this.receiverPhone = '3318'
    // }
    // if (!this.companyType) {
    //   this.companyType = 'sf'
    // }
    // this.getTrackingStatus(num)
    this.getExpressStatus()
  },
  methods: {
    getExpressStatus () {
      let url = '/tsebuapi/show.do?' // 可以提取做公共部分
      let formdata = {
        'cmd': 'queryDeliveryInfo',
        'appName': 3,
        'companyType': this.companyType,
        'number': this.number,
        'receiverPhone': this.receiverPhone
      }
      this.axios.post(url, this.qs.stringify(formdata), {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      }).then(res => {
        console.log('Express=>res', res)
        if (res.exId) {
          alert(res.desc)
        } else {
          this.trackingContent = res.data
        }
      })
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
