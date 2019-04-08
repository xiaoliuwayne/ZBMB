<template>
  <div :style="bkImg" class="base-page">
    <div style="text-align:center; margin:3rem 0;">
      <img src="../assets/img/bk/zbmblogo.png" style="width: 30vw;height: 30vw;">
    </div>
    <div class="aa">
      <span>
        <img src="../assets/img/bk/idea.png" style="width: 3rem; height: 3rem"/>
      </span>
      <span class="bb">
        您已获得一个面料采购订单，请将短信中的“提取码”输入下方输入框中，点击“获得订单”查看订单。
      </span>
    </div>
    <!--<van-cell-group>-->
      <!--<van-field v-model="code" placeholder="输入提取码" class="code-input" type='number' input-align="left" label-align="left"/>-->
      <input v-model="code" placeholder="输入提取码" class="code-input" type='number'/>
    <!--</van-cell-group>-->
    <div style="text-align:center; padding:30px 0;">
    <van-button @click="sendCode" class="code-send">
      获得订单
    </van-button>
    </div>
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
        backgroundImage: 'url(' + require('../assets/img/bk/cloth.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  created () {
    // 防止不小心退出后重输验证码
    let tmpCode = sessionStorage.getItem('code')
    if (tmpCode) {
      this.code = tmpCode
    } else {
      this.code = ''
    }
  },
  methods: {
    sendCode () {
      console.log('index ==this.code,', this.code)
      // localStorage.setItem('code', String(this.code))
      sessionStorage.setItem('code', String(this.code))
      if (this.code) {
        this.$router.push({name: 'Main', params: {'code': String(this.code)}})
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/mycss.css';

  .aa{
    display: table;
    /*margin: 22vw 0 0 7.5vw;*/
    padding:1rem 1rem;
    background: rgba(0,0,0,0.4);
    /*display: table-cell;*/
    vertical-align:middle;
    /*width: 100vw;*/
    /*width: 100%;*/
    display:flex;
    align-items:center;
  }
  .aa span{
    display:flex;
  }
  .bb{
    color:#fff;
    font-size:0.9rem;
    padding:0 1rem;
    /*display: ;*/
    /*top: 0;*/
    /*font-size: 4vw;*/
    /*line-height: 5vw;*/
    /*color: white;*/
    /*width: 67vw;*/
    /*height: 15vw;*/
    /*margin-left: 5vw;*/
  }
  .cc{
    /*position: fixed;*/
    /*bottom: 5vw;*/
    /*margin: 10vw 6vw;*/
    flex:1;
    padding:2rem 1.5rem;
    font-size:0.9rem;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
  }
  .cc p {
    color: white;
    font-size: 4vw;
    margin: 0;
  }
</style>
