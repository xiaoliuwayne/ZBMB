import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '../pages/Main.vue'
import OrdersList from '../pages/orders/OrdersList'
import Requirement from '../pages/orders/Requirement'
import Express from '../pages/orders/Express'
import Sample from '../pages/orders/Sample'
import Modify from '../pages/orders/Modify'

Vue.use(Router)
const routes = [
  {
    path: '/hellowold',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/orderslist',
    name: 'OrdersList',
    component: OrdersList
  },
  {
    path: '/requirement',
    name: 'Requirement',
    component: Requirement
  },
  {
    path: '/express',
    name: 'Express',
    component: Express
  },
  {
    path: '/sample',
    name: 'Sample',
    component: Sample
  },
  {
    path: '/modify',
    name: 'Modify',
    component: Modify
  }
]

export default new Router({
  routes: routes
})
