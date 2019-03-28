<template>
  <div>
    <van-nav-bar
      title="修改信息"
      left-arrow
      @click-left="back"
    />
    <p>我的联系方式：</p>
    <div><span>公司名称：</span><input v-model="comName"/></div>
    <div><span>姓名：</span><input v-model="name"/></div>
    <div><span>移动电话：</span><input v-model="phone"/></div>
    <div><span>公司地址：</span><van-area :area-list="areaList" :item-height=25 /></div>
    <div>
      <p>主营业务：</p>
      <p style="" >{{TYPE[1]}}</p>
      <van-checkbox-group v-model="zzResult" class="boxes-group">
        <van-checkbox class="boxes" shape="square"
                      v-for="keyId in szList"
                      :key="keyId"
                      :name="keyId">
          {{ zzMajor[keyId] }}
        </van-checkbox>
      </van-checkbox-group>
      <p style="" >{{TYPE[2]}}</p>
      <van-checkbox-group v-model="szResult" class="boxes-group">
        <van-checkbox class="boxes" shape="square"
                      v-for="keyId in szList"
                      :key="keyId"
                      :name="keyId">
          {{ szMajor[keyId] }}
        </van-checkbox>
      </van-checkbox-group>

    </div>
    <van-button style="width: 100%;margin-bottom: 5px">修改</van-button>
  </div>
</template>

<script>
import areaList from '../../assets/js/area'
export default {
  components: {areaList},
  data () {
    return {
      TYPE: {1: '针织', 2: '梭织'},
      comName: '',
      name: '',
      phone: '',
      addr: '',
      allMajor: [],
      areaList: null,
      defaultData: {},
      szResult: [], // 只有keyId
      zzResult: [],
      szList: [], // 只有keyId
      zzList: [],
      szMajor: {}, // [{keyId: keyWord}..]
      zzMajor: {}
    }
  },
  created () {
    this.init()
    this.defaultData = this.$route.query.defaultInfo
    console.log('this.defaultData', this.defaultData)
    this.setDefault(this.defaultData)
  },
  methods: {
    init () {
      // 初始化地址选择器
      this.areaList = areaList.areaList
      // 初始化复选框
      this.allMajor = this.getMajor()
      if (this.allMajor) {
        this.allMajor.forEach(major => {
          if (major.groupId === 1) {
            major.list.forEach(obj => {
              this.zzMajor[obj.keyId] = obj.keyword
            })
            major.list.forEach(obj => {
              this.zzList.push(obj.keyId)
            })
          }
          if (major.groupId === 2) {
            major.list.forEach(obj => {
              this.szMajor[obj.keyId] = obj.keyword
            })
            major.list.forEach(obj => {
              this.szList.push(obj.keyId)
            })
          }
        })
      }
      console.log('this.zzMajor', this.zzMajor)
      console.log('this.szMajor', this.szMajor)
      console.log('this.zzList', this.zzList)
      console.log('this.szList', this.szList)
    },
    setDefault (data) {
      this.comName = data.comName
      this.name = data.name
      this.phone = data.phone
      let tmpMajor = data.major
      tmpMajor.forEach(major => {
        if (major.groupId === 1) {
          this.zzResult = major.list
          console.log('this.zzResult', this.zzResult)
        }
        if (major.groupId === 2) {
          this.szResult = major.list
          console.log('this.szResult', this.szResult)
        }
      })
    },
    getMajor () {
      // let url = 'http://ts.ebdaowei.com/ebuapi/show.do?cmd=fabricKeywords&groupId=0'
      let url = '/ebuapi/show.do?cmd=fabricKeywords&groupId=0'
      this.axios.get(url).then(res => {
        console.log('getMajor,res: ', res)
        this.allMajor = res.data
      })
    },
    back () {
      this.$router.go(-1)
    }
  }

}
</script>

<style scoped>
  .boxes-group{
    /*width: 300px;*/
    /*display: block;*/
    /*background: skyblue;*/
}
  .boxes{
    border: black 1px solid;
    width: 90px;
    font-size: 12px;
    display: inline-flex;
    margin: 5px 10px;
    border-radius: 2px;
    padding: 5px;
  }
</style>
