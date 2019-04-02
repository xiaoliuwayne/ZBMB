// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'
import VueLazyload from 'vue-lazyload'
import 'vant/lib/index.css'
// import querystring from 'querystring'
import qs from 'qs'
import {
  Button,
  Tab,
  Tabs,
  NavBar,
  Uploader,
  Icon,
  RadioGroup,
  Radio,
  Area,
  Checkbox,
  CheckboxGroup,
  Swipe,
  SwipeItem,
  Field,
  AddressEdit,
  Cell,
  CellGroup,
  Toast
  // ImagePreview  // 图片预览
} from 'vant'

Vue.use(Button)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(Uploader)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Area)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Field)
Vue.use(AddressEdit)
Vue.use(Cell).use(CellGroup)
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.qs = qs
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/lazyLoad/error.jpg',
  loading: './assets/lazyLoad/loading.jpg',
  attempt: 3
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
