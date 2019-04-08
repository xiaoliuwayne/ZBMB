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
      v-model="companyName"
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
      label="移动电话："
      placeholder=""
    />
    <van-field
      v-model="address"
      label="公司地址："
      placeholder=""
      type="textarea"
      :clearable="true"
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
    <!--<div style="font-size: 14px"><span style="margin-left: 13px">公司地址：</span><input class="addr-input" v-model="province" @click="show" />-->
      <!--<input class="addr-input" v-model="city" @click="show"/>-->
      <!--<input class="addr-input" v-model="district" @click="show"/>-->
      <!--&lt;!&ndash;<input v-model="street" style=""/>&ndash;&gt;-->
    <!--</div>-->
    <!--<div v-show="flag">-->
      <!--<van-area :area-list="areaList" :item-height=25 @confirm="onAddrConfirm" @cancel="shut" :value="addrCode" v-show="showArea"/>-->
      <!--<div class="line"></div>-->
      <!--<van-cell-group>-->
        <!--<van-field-->
          <!--v-model="street"-->
          <!--type="text"-->
          <!--placeholder="街道门牌、楼层房间号等信息"-->
          <!--:clearable="true"-->
         <!--&gt;-->
          <!--<van-button slot="button" size="small" class="bt-big bt-bright" @click="finish">确定</van-button>-->
        <!--</van-field>-->
      <!--</van-cell-group>-->
    <!--</div>-->
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
    <van-button class="bt-bright bt-big" @click="update">修改</van-button>
  </div>
</template>

<script>
import areaList from '../../assets/js/area'
import {BASEURL, API, pushHistory} from '../../assets/js/common.js'
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
      showArea: true,
      searchResult: '',
      TYPE: {1: '针织', 2: '梭织'},
      addrCode: '440105',
      province: '',
      city: '',
      district: '',
      street: '',
      companyName: '',
      name: '',
      phone: '',
      address: '',
      allMajor: [],
      areaList: null,
      defaultData: {},
      szResult: [], // 只有keyId
      zzResult: [],
      szList: [], // 只有keyId
      zzList: [],
      szMajor: {}, // [{keyId: keyWord}..]
      zzMajor: {},
      providerInfo: {},
      tmpSaveInput: {},
      inquiryId: 0,
      providerId: 0,
      flag: false
      // flag: true
    }
  },
  created () {
    // var _ = require('lodash')
    // this.providerInfo = _.cloneDeep(window.providerInfo) // 深拷贝
    this.providerInfo = window.providerInfo
    this.tmpSaveInput = this.$route.params.tmpSaveInput
    this.inquiryId = this.tmpSaveInput['inquiryId']
    this.providerId = this.tmpSaveInput['providerId']
    this.init()
    console.log('this.providerInfo', this.providerInfo)
    this.setDefault(this.providerInfo)
  },
  mounted () {
    pushHistory()
    console.log(87654321)
    // 监听历史记录点, 添加返回事件监听
    window.onpopstate = () => {
      // 输入要返回的上一级路由地址
      this.$router.push({name: 'OrdersList', params: {'providerId': this.providerId, 'inquiryId': this.inquiryId, 'flag': 'w'}})
    }
  },
  methods: {
    finish () {
      this.flag = false
      this.address = this.province + this.city + this.district + this.street
    },
    showAddrEditor () {
      this.showArea = true
      this.flag = true
    },
    getKeyWords (keyIdList, groupId) {
      let tmp = []
      let inquiryId = 7
      let selectMajor = {1: this.zzMajor, 2: this.szMajor}
      if (keyIdList.length > 0) {
        keyIdList.forEach(key => {
          tmp.push({
            'groupId': groupId,
            'keyId': key,
            'keyword': selectMajor[groupId][key],
            'inquiryId': inquiryId
          })
        })
        return tmp
      }
      return tmp // 没有值返回空数组
    },
    update () {
      // 更新当前的window.providerInfo信息
      let zzObjList = this.getKeyWords(this.zzResult, 1)
      let szObjList = this.getKeyWords(this.szResult, 2)
      let keywords = zzObjList.concat(szObjList)
      // 修改供应商信息
      window.providerInfo = {
        'providerId': window.providerInfo.providerId,
        'companyName': this.companyName,
        'name': this.name,
        'phone': this.phone,
        // 'address': this.province + this.city + this.district + this.street,
        'address': this.address,
        'keywords': keywords
      }
      let url = API + '/show.do?'
      let busiKeywords = []
      this.zzResult.forEach(obj => {
        busiKeywords.push({'keyId': obj})
      })
      this.szResult.forEach(obj => {
        busiKeywords.push({'keyId': obj})
      })
      console.log('busiKeywords=>', busiKeywords)
      let provider = {
        'userId': window.providerInfo.providerId,
        'regTel': this.phone,
        'name': this.companyName, // 公司名
        'address': this.address,
        'linkman': this.name,
        'busiKeywords': busiKeywords
      }
      let formdata = {
        'cmd': 'selfMdfProvider',
        'userId': window.providerInfo.providerId,
        'provider': JSON.stringify(provider)
      }
      console.log('modify=>formdata==>', formdata)
      // if (window.providerInfo.providerId) {
      //   return false
      // }
      if (window.providerInfo.providerId <= 0) { // Id异常
        alert('window.providerInfo.providerId:' + String(window.providerInfo.providerId))
        return false
      }
      this.axios.post(BASEURL + url, this.qs.stringify(formdata), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(res => {
        console.log('modify==>res:', res)
        if (res.exId) {
          alert(res.desc)
        }
        if (res.data && (res.data.result === 0)) {
          console.log('res.desc:::', res.data.desc)
          alert(res.data.desc + '数据更新成功！')
          console.log('this.providerId=>update', this.providerId)
          console.log('this.inquiryId=>update', this.inquiryId)
          this.$router.push({name: 'Customer', params: {'tmpSaveInput': this.tmpSaveInput, 'providerId': this.providerId, 'inquiryId': this.inquiryId}})
        }
      })
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
    shut () {
      this.showArea = false
    },
    setDefault (data) {
      this.companyName = data.companyName
      this.name = data.name
      this.phone = data.phone
      this.address = data.address
      // this.splitAddr(this.address)
      let tmpMajor = data.keywords
      tmpMajor.forEach(major => {
        if (major.groupId === 1) {
          this.zzResult.push(major.keyId)
        }
        if (major.groupId === 2) {
          this.szResult.push(major.keyId)
        }
      })
      console.log('this.zzResult', this.zzResult)
      console.log('this.szResult', this.szResult)
      // tmpMajor.forEach(major => {
      //   if (major.groupId === 1) {
      //     // 初始的zzResult
      //     major.list.forEach(obj => {
      //       this.zzResult.push(obj.keyId)
      //     })
      //     console.log('this.zzResult', this.zzResult)
      //   }
      //   if (major.groupId === 2) {
      //     // 初始的zzResult
      //     major.list.forEach(obj => {
      //       this.szResult.push(obj.keyId)
      //     })
      //     console.log('this.szResult', this.szResult)
      //   }
      // })
    },
    getMajor () {
      // 获取所有关键字
      // let url = 'http://ts.ebdaowei.com/ebuapi/show.do?cmd=fabricKeywords&groupId=0'
      let url = API + '/show.do?cmd=fabricKeywords&groupId=0'
      this.axios.get(url).then(res => {
        console.log('getMajor,res: ', res)
        this.allMajor = res.data
        this.setBaseInfo(this.allMajor)
      })
    },
    back () {
      // this.$router.go(-1)
      console.log('this.providerId=>back', this.providerId)
      console.log('this.inquiryId=>back', this.inquiryId)
      this.$router.push({name: 'Customer', params: {'tmpSaveInput': this.tmpSaveInput, 'providerId': this.providerId, 'inquiryId': this.inquiryId}})
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
      this.showArea = false
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
