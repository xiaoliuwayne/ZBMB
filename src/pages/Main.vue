<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{info.company}}</p>
    <p>{{info.msg}}</p>
    <div class="imgs" >
      <img v-for="(url,index) in imageList" :key="index"  v-lazy="url" alt="布料图片">
    </div>
    <div class="line"></div>
    <div class="desc">
      <p>类型：{{desc.type}}</p>
      <p>有效期：{{desc.time}}</p>
      <p>{{desc.customization}}</p>
      <p style="font-weight: bolder">面料说明：</p>
      <p>{{desc.specific}}</p>
    </div>
    <div class="line"></div>
    <h4 >请进入“找布买布”，接这一单</h4>
    <van-button type="info" @click="goOrders" style="width:30%;margin: 0 35%;">
      <router-link :to="{ name: 'OrdersList'}">
        接单
      </router-link>
    </van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '找布买布',
      info: {'company': '您好! 灯光纺织', 'msg': '三福时尚的陈先生向您发来了一个面料采购信息'},
      imageList: [
        require('../assets/logo.png'),
        require('../assets/logo.png'),
        require('../assets/logo.png'),
        require('../assets/logo.png')
      ],
      desc: {
        'type': '色卡',
        'time': '3天',
        'customization': '不接受定制',
        'specific': '面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、面料说明、' +
          '面料说明、面料说明、面料说明、面料说明、面料说明、面料'
      }
    }
  },
  methods: {
    goOrders () {
      this.$router.push('/orderslist')
      alert('disable:=> goOrders ')
    }
  }
}
</script>

<style scoped>
  @import '../assets/css/mycss.css';
</style>
