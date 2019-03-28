<template>
  <div>
    <van-nav-bar
      title="需求单"
      left-arrow
      @click-left="back"
    />
    <div class="imgs" >
      <img v-for="(url,kk) in imageList" :key="kk"  v-lazy="url" alt="布料图片">
    </div>
    <div class="line"></div>
    <p style="font-weight: bolder;font-size: 18px">需求说明：</p>
    <div class="desc">
      <p>面料种类：{{desc.clothType}}</p>
      <p>类型：{{desc.type}}</p>
      <p>有效期：{{desc.time}}</p>
      <p>{{desc.customization}}</p>
      <p style="font-weight: bolder">面料说明：</p>
      <p>{{desc.specific}}</p>
    </div>
    <div class="line"></div>
    <div class="com-info">
      <p>公司名称：{{comInfo.comName}}</p>
      <p><span>姓名：{{comInfo.name}}</span><span>移动电话：{{comInfo.phone}}</span></p>
      <p style="width: 300px;">收货地址：{{comInfo.addr}}</p>
    </div>
    <div v-if="flag==='w'" style="position: fixed;bottom: 0;width: 100%;background: skyblue;padding: 10px 0">
      <span style="background: #ff2e50;color: white;width: 50%;border: black 1px solid" @click="go('accept')">我要接这单</span>
      <span style="background: #adadad;width: 50%;border: black 1px solid" @click="go('home')">放弃这单</span>
    </div>
    <div v-else>
      <p style="font-weight: bolder">回单信息：</p>
      <div class="aaa">
        <span><img :src="feedBackData.img"></span>
        <span>
          <p>色卡编号：{{feedBackData.colorCode}}</p>
          <p>单    价：{{feedBackData.price}}</p>
          <p>调样价格：{{feedBackData.samplePrice}}</p>
        </span>
        <span>
          <p>{{feedBackData.dateTime}}</p>
          <p>{{feedBackData.remind}}</p>
          <van-button>查看</van-button>
        </span>
      </div>
      <div style="display: flex">
        <span style="font-size: 12px">物流单号：{{feedBackData.express.name}}|{{feedBackData.express.trackingNO}}</span>
        <span>
          <router-link :to="{name: 'Express'}">
            查看快递状态
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: '',
      imageList: [
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png')
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
        'comName': 'XXXXXXXXXXX',
        'name': 'XXX',
        'phone': 'XXxXXXXXXXXXXX',
        'addr': 'XXXXXXXXXXXXXXXXXXXXXXXXXX'
      },
      feedBackData: {
        'img': require('../../assets/logo.png'),
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
    console.log('Requirement => flag', flag)
    this.flag = flag
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    go (flag) {
      if (flag === 'accept') {
        this.$router.push('/sample')
      } else {
        this.$router.push('/')
      }
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
