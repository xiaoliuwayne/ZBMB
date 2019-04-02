<template>
  <div :style="bkImg" class="base-page">
    <div style="margin-top: 22vw;margin-left: 35vw">
      <img src="../assets/img/bk/zbmblogo.png" style="width: 30vw;height: 30vw;">
    </div>
    <div class="aa">
      <span style="">
        <img src="../assets/img/bk/idea.png" style="width: 15vw;height: 15vw"/>
      </span>
      <span style="float: left;margin-left: 10px" class="bb">
        您已获得一个面料采购订单，请将短信中的“提取码”输入下方输入框中，点击“获得订单”查看订单。
      </span>
    </div>
    <!--<van-cell-group>-->
      <van-field v-model="code" placeholder="输入提取码" class="code-input" />
    <!--</van-cell-group>-->
    <van-button @click="sendCode" class="code-send">
        进入
    </van-button>
    <div class="cc">
      <p style="font-weight: bolder">找布买布 平台介绍：</p>
      <p>“找布买布” 服务于面料采购和面料档口，将双方需求进行汇聚到平台中，进行自由交易。</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: '',
      bkImg: {
        backgroundImage: 'url(' + require('../assets/img/bk/bk3.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  created () {
    this.code = ''
  },
  methods: {
    sendCode () {
      console.log('index ==this.code,', this.code)
      if (this.code) {
        this.$router.push({name: 'Main', params: {'code': this.code}})
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/mycss.css';
  .aa{
    display: table;
    margin: 22vw 0 3vw 7.5vw;
    /*width: 100vw;*/
    /*width: 100%;*/
  }
  .aa span{
    display: table-cell;
  }
  .bb{
    /*display: ;*/
    top: 0;
    font-size: 4vw;
    line-height: 5vw;
    color: white;
    width: 67vw;
    height: 15vw;
    /*margin-left: 5vw;*/
  }
  .cc{
    width: 90vw;
    height: 17vw;
    /*position: fixed;*/
    /*bottom: 5vw;*/
    margin: 10vw 6vw;
  }
  .cc p {
    color: white;
    font-size: 4vw;
    margin: 0;
  }
</style>
