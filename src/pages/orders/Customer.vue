<template>
  <div>
    <van-nav-bar
      title="给客户回样"
      left-arrow
      @click-left="back"
      class="main-bk"
    />
    <div :class="postData.length>4?'upload-img-5':'upload-img-1'">
      <p class="p-header">上传需要找的面料照片：</p>
      <p style="font-size: 12px">请上传要找的完整图案、细节图、尺寸参照图、正反面对比等。(最多5张)</p>
      <!--<van-uploader :after-read="onRead" multiple>-->
        <!--&lt;!&ndash;<van-icon name="photograph" />&ndash;&gt;-->
        <!--<img style="width: 60px;height: 60px;" src="../../assets/img/timg2.jpg" ref="clothImg"/>-->
      <!--</van-uploader>-->
      <div class="posting-uploader">
        <div class="posting-uploader-item" v-for="(item,nn) in postData" :key="nn">
          <img :src="item.content" alt="图片" class="imgPreview">
          <van-icon name="close" @click="delImg(nn)" class="delte"/>
        </div>
        <van-uploader :after-read="onRead" :accept="'image/*'" v-show="postData.length<=4">
          <img src="../../assets/img/timg.jpg" alt="等待传图" class="imgPreview">
        </van-uploader>
      </div>
    </div>
    <div class="line"></div>
    <div class="samp-remark">
      <p class="p-header">回样说明：</p>
      <van-field
        v-model="colorCardCode"
        type="text"
        label="色卡编号："
        placeholder=""
        required
      />
      <van-field
        v-model="unitPrice"
        type="number"
        label="剪版价/元："
        placeholder=""
        required
      />
      <van-field
        v-model="productName"
        type="text"
        label="品名："
        placeholder=""
      />
      <van-field
        v-model="ingredients"
        type="text"
        label="成份："
        placeholder=""
      />
      <van-field
        v-model="width"
        type="text"
        label="幅宽："
        placeholder=""
      />
      <van-field
        v-model="weight"
        type="text"
        label="克重："
        placeholder=""
      />
      <div class="radio-sty" style="">
        <span class="ver-mid">是否现货：</span>
        <van-radio-group v-model="spotStatus" style="display: flex">
          <van-radio name="0" class="van-radio">现货</van-radio>
          <van-radio name="1">定制</van-radio>
        </van-radio-group>
      </div>
      <div class="radio-sty">
        <span class="ver-mid">调样价格：</span>
        <van-radio-group v-model="sampleStatus" style="display: flex">
          <van-radio name="0">免费</van-radio>
          <van-radio name="1">收费</van-radio>
          <input :disabled="flag" v-model="samplePrice" style="width: 80px;margin: auto 5px" type="number" placeholder="单位：元"/>
        </van-radio-group>
      </div>
      <p class="p-header-small">面料说明：</p>
      <textarea rows="4" cols="25" v-model="description" >
      </textarea>
    </div>
    <div class="line"></div>
    <div>
      <p class="p-header">我的联系方式：
        <!--<van-button class="bt-bright" style="float: right" @click="goModify">-->
        <!--<button class="bt-bright" style="float: right">-->
          <!--<router-link :to="{name: 'Modify'}" style="color: white;font-size: 14px;font-weight: normal">-->
            <!--修改-->
          <!--</router-link>-->
        <!--</button>-->
        <van-button class="bt-bright" style="float: right; color: white; font-size: 14px;height: 25px;line-height: 25px" @click="goModify">
          修改
        </van-button>
        <!--<span style="float: right">-->
        <!--<router-link :to="{name: 'Modify',query:{'defaultInfo': defaultInfo}}">修改</router-link>-->
        <!--</span>-->
      </p>
      <van-field
        v-model="providerInfo.companyName"
        type="text"
        label="供应商名称："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="providerInfo.name"
        type="text"
        label="联系人姓名："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="providerInfo.phone"
        type="text"
        label="移动电话："
        placeholder=""
        :readonly="true"
      />
      <van-field
        v-model="providerInfo.address"
        type="textarea"
        label="公司地址："
        placeholder=""
        :readonly="true"
      />
      <!--<div><span>供应商名称：</span>{{defaultInfo.comName}}</div>-->
      <!--<div><span>联系人姓名：</span>{{defaultInfo.name}}<span>移动电话：</span>{{defaultInfo.phone}}</div>-->
      <!--<div><span>公司地址：</span>{{defaultInfo.addr}}</div>-->
      <div style="margin: 10px 0"><span class="p-header-small major-sty">主营业务：</span>
        <van-field
          v-for="item in providerKeyWords" :key="item.groupId"
          v-if="item.keywords.length>0"
          v-model="item.keywords"
          type="text"
          :label="clothstyle[item.groupId] + '：'"
          placeholder=""
          :autosize="{minHeight:10}"
          :readonly="true"
        />
      <!--<div v-for="item in providerKeyWords" :key="item.groupId">-->
        <!--<span v-if="item.groupId==1" class="major-sty">针织：<span v-for="(kword,dd) in item.list" :key="dd" style="">{{kword.keyword}}</span></span>-->
        <!--<span v-if="item.groupId==2" class="major-sty">梭织：<span v-for="(kword,ff) in item.list" :key="ff">{{kword.keyword}}</span></span>-->
      <!--</div>-->
      </div>
      <van-button class="bt-bright bt-big" @click="postHttpData" >提交</van-button>
    </div>
  </div>
</template>

<script>
import {CLOTHSTYLE, FEEDBACK_SPOTSTATUS, BASEURL, API} from '../../assets/js/common'
export default {
  data () {
    return {
      tmpSaveInput: {},
      inquiryId: 0,
      providerId: 0,
      colorCardCode: '',
      unitPrice: '',
      productName: '',
      ingredients: '',
      width: '',
      weight: '',
      spotStatus: '0',
      sampleStatus: '0',
      samplePrice: '',
      description: '',
      imgUrlListValue: [],
      postData: [],
      imgIndex: ['1', '2', '3', '4', '5'],
      addrBase: '广东省广州市海珠区',
      addrOther: '新滘西路117号广州酒家',
      address: '',
      providerInfo: {},
      providerKeyWords: [],
      clothstyle: {},
      flag: true
    }
  },
  created () {
    this.clothstyle = CLOTHSTYLE
    this.providerId = this.$route.params.providerId
    this.inquiryId = this.$route.params.inquiryId
    console.log('customer==created==>this.providerId', this.providerId)
    if (this.$route.params.tmpSaveInput) { // 将保持的记录赋值回去
      let tmpSaveInput = this.$route.params.tmpSaveInput
      // this.inquiryId = tmpSaveInput['inquiryId']
      // this.providerId = tmpSaveInput['userId']
      this.colorCardCode = tmpSaveInput['colorCardCode']
      this.unitPrice = tmpSaveInput['unitPrice']
      this.productName = tmpSaveInput['productName']
      this.ingredients = tmpSaveInput['ingredients']
      this.width = tmpSaveInput['width']
      this.weight = tmpSaveInput['weight']
      this.spotStatus = tmpSaveInput['spotStatus']
      this.sampleStatus = tmpSaveInput['sampleStatus']
      this.samplePrice = tmpSaveInput['samplePrice']
      this.description = tmpSaveInput['description']
      this.imgUrlListValue = tmpSaveInput['imgUrlListValue']
    }
    console.log('customer=> this.providerId', this.providerId)
    console.log('customer=> this.inquiryId', this.inquiryId)
    this.providerInfo = window.providerInfo
    let zzKeyWords = ''
    let szKeyWords = ''
    this.providerInfo.keywords.forEach(obj => {
      if (obj.groupId === 1) {
        zzKeyWords = zzKeyWords + obj.keyword + '  '
      }
      if (obj.groupId === 2) {
        szKeyWords = szKeyWords + obj.keyword + '  '
      }
    })
    if (zzKeyWords) {
      this.providerKeyWords.push({'groupId': 1, 'keywords': zzKeyWords})
    }
    if (szKeyWords) {
      this.providerKeyWords.push({'groupId': 2, 'keywords': szKeyWords})
    }
    // this.postHttpData()
  },
  watch: {
    sampleStatus (val) {
      console.log('watch==>val', val)
      if (val === '1') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  },
  mounted () {
  },
  methods: {
    goModify () {
      this.tmpSaveInput['inquiryId'] = this.inquiryId
      this.tmpSaveInput['providerId'] = this.providerId
      this.tmpSaveInput['colorCardCode'] = this.colorCardCode
      this.tmpSaveInput['unitPrice'] = this.unitPrice
      this.tmpSaveInput['productName'] = this.productName
      this.tmpSaveInput['ingredients'] = this.ingredients
      this.tmpSaveInput['width'] = this.width
      this.tmpSaveInput['weight'] = this.weight
      this.tmpSaveInput['spotStatus'] = this.spotStatus
      this.tmpSaveInput['sampleStatus'] = this.sampleStatus
      this.tmpSaveInput['samplePrice'] = this.samplePrice
      this.tmpSaveInput['description'] = this.description
      this.tmpSaveInput['imgUrlListValue'] = []
      this.$router.push({name: 'Modify', params: {'tmpSaveInput': this.tmpSaveInput}})
    },
    postHttpData () {
      // 将数据设置为全局
      if ((this.colorCardCode === '') || (this.unitPrice === '')) {
        alert('剪版价或者色卡编号没有填写！')
        return false
      }
      let postImgDatas = []
      this.postData.forEach(file => {
        postImgDatas.push(file.content)
      })
      window.providerFeedBack = {
        'imgList': postImgDatas,
        'inStock': FEEDBACK_SPOTSTATUS[this.spotStatus],
        'productName': this.productName,
        'desc': this.description,
        'colorCode': this.colorCardCode,
        'weight': this.weight,
        'samplePrice': this.samplePrice,
        'price': this.unitPrice,
        'width': this.width,
        'ingredients': this.ingredients // 成分
      }
      let url = API + '/show.do?'
      let receipt = {
        'inquiryId': this.inquiryId,
        'userId': this.providerId,
        'colorCardCode': this.colorCardCode,
        'unitPrice': this.unitPrice,
        'productName': this.productName,
        'ingredients': this.ingredients,
        'width': this.width,
        'weight': this.weight,
        'spotStatus': this.spotStatus,
        'sampleStatus': this.sampleStatus,
        'samplePrice': this.samplePrice,
        'description': this.description,
        'imgUrlListValue': this.imgUrlListValue
      }
      if (this.providerId <= 0 || this.inquiryId <= 0) { // Id异常
        alert('this.providerId:' + String(this.providerId) + ',this.inquiryId:' + String(this.inquiryId))
        return false
      }
      let formData = {
        // 'cmd': 'insertDemandReceipt',
        'cmd': 'insertInquiryReceipt',
        'receipt': JSON.stringify(receipt)
      }
      console.log('customer==>BASEURL + url:', BASEURL + url)
      this.axios.post(BASEURL + url, this.qs.stringify(formData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }}).then(
        res => {
          console.log('customer=>res', res)
          let response = res.data
          if (response.exId) {
            alert(response.exDesc)
            // this.colorCardCode = ''
            // this.unitPrice = 0.0
            // this.productName = ''
            // this.ingredients = ''
            // this.width = ''
            // this.weight = ''
            // this.spotStatus = '0'
            // this.sampleStatus = '0'
            // this.samplePrice = 0.0
            // this.description = ''
          } else {
            console.log('customer=>response', response)
            alert(response.desc + '提交成功！')
            this.colorCardCode = ''
            this.unitPrice = 0.0
            this.productName = ''
            this.ingredients = ''
            this.width = ''
            this.weight = ''
            this.spotStatus = '0'
            this.sampleStatus = '0'
            this.samplePrice = 0.0
            this.description = ''
            this.postData = []
            this.$router.push({name: 'OrdersList', params: {'providerId': this.providerId, 'inquiryId': this.inquiryId, 'flag': 'g'}})
          }
        }
      ).catch(function (error) {
        console.log('error', error)
      })
    },
    delImg (index) {
      console.log('delImg->index', index)
      // 删除指定下标的图片对象
      if (isNaN(index) || index >= this.postData.length) {
        return false
      }
      let tmp = []
      for (let i = 0, len = this.postData.length; i < len; i++) {
        if (this.postData[i] !== this.postData[index]) {
          tmp.push(this.postData[i])
        }
      }
      this.postData = tmp
    },
    onRead (file) {
      // this.$refs.clothImg.src = file.content
      // alert('图片上传成功！')
      console.log('file.content: ', file.content)
      this.postData.push(file)
      console.log('this.postData', this.postData)
      // 上传图片到后台
      let url = API + '/upload?type=99'
      let fd = new FormData()
      fd.append('upImgs', file.file)
      console.log('fd:', fd)
      console.log('ddddd', fd.get('upImgs'))
      this.axios.post(url, fd, {headers: {
        'Content-Type': 'multipart/form-data'
      }}).then(res => {
        console.log('onRead=>res', res)
        this.imgUrlListValue.push(res.data.urls[0].image)
        console.log('this.imgUrlListValue:', this.imgUrlListValue)
      }).catch(err => {
        alert(err)
      })
    },
    back () {
      this.$router.push({name: 'OrdersList', params: {'providerId': this.providerId, 'inquiryId': this.inquiryId, 'flag': 'g'}})
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
  .posting-uploader{
    margin: 5px 0 15px 0;
}
  .posting-uploader-item {
    float: left;
    width: 60px;
    height: 80px;
    margin: 0 6px;
  }
  .imgPreview{
    width: 60px;
    height: 60px;
    margin-left: 6px;
  }
  .ver-mid{
    line-height: 40px;
  }
  .radio-sty{
    display: flex;
    font-size: 14px
  }
  .major-sty{
    margin-left: 15px;
    font-size: 14px;
  }
  .major-sty span{
    margin-left: 5px;
    color: #969799;
  }
</style>
