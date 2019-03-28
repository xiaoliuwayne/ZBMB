<template>
<div>
  <h3>{{ title }}</h3>
  <van-tabs @click="onClick(3, 4)" color="green">
    <van-tab title="待接单">
      <div class="card" v-for="(item,hh) in ordersDataWait" :key="hh" @click="goRequirement('w')">
        <div>
          <img :src="item.img" alt="样布图片"/>
        </div>
        <div>
          <p>{{item.dateTime}}<span style="color: red;margin-left: 15px">{{item.deadline}}</span></p>
          <p>面料种类：{{item.type}}</p>
          <p>说明：{{item.remark}}</p>
        </div>
        <div style="width: 70px">
          <p style="margin: 5px">{{item.status}}</p>
        </div>
      </div>
    </van-tab>
    <van-tab title="已接单">
      <div v-for="(item,gg) in ordersData" :key="gg" class="get-order">
        <div class="card" style="margin-bottom: 0" >
          <div>
            <img :src="item.img" alt="样布图片"/>
          </div>
          <div>
            <p>{{item.dateTime}}</p>
            <p>面料种类：{{item.type}}</p>
            <p>说明：{{item.remark}}</p>
          </div>
          <div style="width: 70px">
            <p style="margin: 5px">{{item.status}}</p>
          </div>
        </div>
        <div class="dot-line"></div>
        <div class="feedback">
          <span>色卡编号：{{item.colorCode}}</span>
          <span>单价：{{item.price}}</span>
          <span><van-button @click="goRequirement('g')">查看</van-button></span>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: '找布买布',
      ordersDataWait: [
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:40', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:41', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:42', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:43', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:44', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:45', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:46', 'deadline': '14天后清除', 'status': '待接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...'}
      ],
      ordersData: [
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:47', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:48', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:49', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:50', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:51', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:52', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'},
        {'img': require('../../assets/logo.png'), 'dateTime': '2019.3.22 16:53', 'deadline': '', 'status': '已接单', 'type': '一级分类、二级分类', 'remark': '请描述要找的主要特征、品名、成分、工艺、用途、规格等请描...', 'colorCode': 'ASD12365478', 'price': '10.00/米'}
      ]
    }
  },
  methods: {
    onClick (index, title) {
      console.log('index, title', index, title)
    },
    goRequirement (flag) {
      console.log('flag', flag)
      this.$router.push({name: 'Requirement', params: {'flag': flag}})
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
</style>
