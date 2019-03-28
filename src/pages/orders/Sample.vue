<template>
  <div>
    <van-nav-bar
      title="给客户回样"
      left-arrow
      @click-left="back"
    />
    <div>
      <p style="font-weight: bolder">上传需要找的面料照片：</p>
      <p style="font-size: 12px">请上传要找的完整图案、细节图、尺寸参照图、正反面对比等。(最多5张)</p>
      <van-uploader :after-read="onRead">
        <van-icon name="photograph" />
      </van-uploader>
    </div>
    <div class="line"></div>
    <div class="samp-remark">
      <p>回样说明：</p>
      <div><span>色卡编号：</span><input/></div>
      <div><span>单价：</span><input/></div>
      <div><span>品名：</span><input/></div>
      <div><span>成份：</span><input/></div>
      <div><span>幅宽：</span><input/></div>
      <div><span>克重：</span><input/></div>
      <div style="display: flex">
        <span>是否现货：</span>
        <van-radio-group v-model="inStock" style="display: flex">
          <van-radio name="1">现货</van-radio>
          <van-radio name="2">定制</van-radio>
        </van-radio-group>
      </div>
      <div style="display: flex">
        <span>调样价格：</span>
        <van-radio-group v-model="isFree" style="display: flex">
          <van-radio name="3">免费</van-radio>
          <van-radio name="4">收费</van-radio>
        </van-radio-group>
        <input/>
      </div>
      <p>面料说明：</p>
      <textarea rows="3" cols="20" >
         在w3school，你可以找到你所需要的所有的网站建设教程。
      </textarea>
    </div>
    <div class="line"></div>
    <div>
      <p>我的联系方式：<span><router-link :to="{name: 'Modify',query:{'defaultInfo': defaultInfo}}">修改</router-link></span></p>
      <div><span>供应商名称：</span>{{defaultInfo.comName}}</div>
      <div><span>联系人姓名：</span>{{defaultInfo.name}}<span>移动电话：</span>{{defaultInfo.phone}}</div>
      <div><span>公司地址：</span>{{defaultInfo.addr}}</div>
      <div><span>主营业务：</span>
      <div v-for="item in defaultInfo.major" :key="item.groupId">
        <span v-if="item.groupId==1">针织：<span v-for="(kword,dd) in item.list" :key="dd">{{kword.keyword}}</span></span>
        <span v-if="item.groupId==2">梭织：<span v-for="(kword,ff) in item.list" :key="ff">{{kword.keyword}}</span></span>
      </div>
      </div>
      <van-button>提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inStock: '',
      isFree: '',
      defaultInfo: {
        'comName': 'AAAAAAAA',
        'name': 'BBBB',
        'phone': '12345678909',
        'addr': 'CCCCCCCCCCCCCCC',
        'major': [
          {'groupId': 1, 'list': [{'keyId': 1016, 'keyword': '直贡呢'}, {'keyId': 1017, 'keyword': '针织毛呢'}, {'keyId': 1018, 'keyword': '珊瑚绒'}]},
          {'groupId': 2,
            'list': [ {'keyId': 2006, 'keyword': '平布'}, {'keyId': 2007, 'keyword': '牛仔面料'}, {'keyId': 2008, 'keyword': '梭织棉麻'},
              {'keyId': 2009, 'keyword': '塔丝隆'}, {'keyId': 2010, 'keyword': '尼丝纺'}, {'keyId': 2011, 'keyword': '牛津布'}]}
        ]
      }
    }
  },
  methods: {
    onRead () {
      alert('图片上传成功！')
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
