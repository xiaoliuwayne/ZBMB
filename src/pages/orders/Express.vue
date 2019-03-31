<template>
  <div>
    <van-nav-bar
      title="物流状态"
      left-arrow
      @click-left="back"
      class="main-bk header"
    />
    <div class="content">{{trackingContent}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      trackingContent: 'sdsdsdddddddddddddddddddddddddddddddddd'
    }
  },
  created () {
    let num = this.$route.params.num
    this.getTrackingStatus(num)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getTrackingStatus (num) {
      console.log('num', num)
      this.trackingContent = '2019-03-18周一10:08:52等待揽收中'
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/mycss.css';
</style>
