<template>
  <div>
    <van-nav-bar
      title="修改信息"
      left-arrow
      @click-left="back"
      class="main-bk"
    />
    <p class="p-header">我的联系方式：</p>
    <van-field
      v-model="comName"
      type="text"
      label="公司名称："
      placeholder=""
    />
    <van-field
      v-model="name"
      type="text"
      label="姓名："
      placeholder=""
    />
    <van-field
      v-model="phone"
      type="text"
      label="移动电话："
      placeholder=""
    />
    <!--<van-address-edit-->
      <!--:area-list="areaList"-->
      <!--:address-info="addressInfo"-->
      <!--show-postal-->
      <!--show-delete-->
      <!--show-set-default-->
      <!--show-search-result-->
      <!--:search-result="searchResult"-->
      <!--@save="onSave"-->
      <!--@delete="onDelete"-->
      <!--@change-detail="onChangeDetail"-->
    <!--/>-->
    <!--<div><span>公司名称：</span><input v-model="comName"/></div>-->
    <!--<div><span>姓名：</span><input v-model="name"/></div>-->
    <!--<div><span>移动电话：</span><input v-model="phone"/></div>-->
    <div style="font-size: 14px"><span style="margin-left: 13px">公司地址：</span><input class="addr-input" v-model="province" @click="show" />
      <input class="addr-input" v-model="city" @click="show"/>
      <input class="addr-input" v-model="district" @click="show"/>
      <van-field
        v-model="street"
        type="text"
        placeholder="街道门牌、楼层房间号等信息"
      />
      <!--<input v-model="street" style=""/>-->
    </div>
    <div v-show="flag">
      <van-area :area-list="areaList" :item-height=25 @confirm="onAddrConfirm" @cancel="shut" :value="addrCode"/>
    </div>
    <div class="line"></div>
    <div style="margin-top: 15px">
      <p class="p-header">主营业务：</p>
      <p class="p-header-small" >{{TYPE[1]}}</p>
      <van-checkbox-group v-model="zzResult" class="boxes-group">
        <van-checkbox class="boxes" shape="square"
                      v-for="keyId in zzList"
                      :key="keyId"
                      :name="keyId">
          {{ zzMajor[keyId] }}
        </van-checkbox>
      </van-checkbox-group>
      <p class="p-header-small" >{{TYPE[2]}}</p>
      <van-checkbox-group v-model="szResult" class="boxes-group">
        <van-checkbox class="boxes" shape="square"
                      v-for="keyId in szList"
                      :key="keyId"
                      :name="keyId">
          {{ szMajor[keyId] }}
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <van-button class="bt-bright bt-big">修改</van-button>
  </div>
</template>

<script>
import areaList from '../../assets/js/area'
export default {
  components: {areaList},
  data () {
    return {
      addressInfo: {
        'id': '1',
        'name': '1',
        'tel': '1',
        'province': '',
        'city': '',
        'country': ''
      },
      searchResult: '',
      TYPE: {1: '针织', 2: '梭织'},
      addrCode: '440105',
      province: '',
      city: '',
      district: '',
      street: '',
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
      zzMajor: {},
      flag: false
      // flag: true
    }
  },
  created () {
    this.init()
    this.defaultData = this.$route.query.defaultInfo
    console.log('this.defaultData', this.defaultData)
    this.setDefault(this.defaultData)
  },
  methods: {
    splitAddr (addr) {
      // 拆分地址,目前不适应自治区，特别行政区的划分
      if (addr) {
        try {
          this.province = addr.split('省')[0] + '省'
          this.city = addr.split('省')[1].split('市')[0] + '市'
          this.district = addr.split('省')[1].split('市')[1].split('区')[0] + '区'
          if (!this.district) {
            this.district = addr.split('省')[1].split('市')[1].split('县')[0] + '县'
          }
          this.street = addr.split('区')[1]
          if (!this.street) {
            this.street = addr.split('县')[1]
          }
          this.setAddrCode()
        } catch (e) {
          console.log('e: ', e)
          alert('该地址不是"省-市-区/县"格式地址!')
        }
      }
    },
    setBaseInfo (data) { // 设置szMajor szList等值
      if (data) {
        data.forEach(major => {
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
    init () {
      // 初始化地址选择器
      this.areaList = areaList.areaList
      // 初始化复选框
      this.allMajor = this.getMajor()
    },
    // getArrdCode () {
    //   // 获取默认地址的地址code
    //   console.log(111111)
    // },
    // setAddrCode () {
    //   this.addrCode = '440105'
    // },
    setDefault (data) {
      this.comName = data.comName
      this.name = data.name
      this.phone = data.phone
      this.addr = data.addr
      this.splitAddr(this.addr)
      let tmpMajor = data.major
      tmpMajor.forEach(major => {
        if (major.groupId === 1) {
          // 初始的zzResult
          major.list.forEach(obj => {
            this.zzResult.push(obj.keyId)
          })
          console.log('this.zzResult', this.zzResult)
        }
        if (major.groupId === 2) {
          // 初始的zzResult
          major.list.forEach(obj => {
            this.szResult.push(obj.keyId)
          })
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
        this.setBaseInfo(this.allMajor)
      })
    },
    back () {
      this.$router.go(-1)
    },
    show () {
      this.flag = true
    },
    onAddrConfirm (e) {
      // 确定选择,返回的必定是三元素数组
      console.log('this.onAddrConfirm=>e', e)
      this.province = e[0].name
      this.city = e[1].name
      this.district = e[2].name
      this.flag = false
    },
    shut () {
      this.flag = false
    },
    onSave () {
      // Toast('save')
    },
    onDelete () {
      // Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
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
  .van-cell {
    line-height: 24px;
    color: #323233;
    font-size: 14px;
  }
</style>
