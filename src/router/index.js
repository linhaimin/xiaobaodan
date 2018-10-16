import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home.vue'
import List from '../views/list.vue'
import User from '../views/user.vue'
import ProductList from '../views/product.vue'
import DetailsList from '../views/details.vue'
import Info from '../views/info.vue'
import InfoText from '../views/infoText.vue'
import Payment from '../views/payment.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/productlist',
      component: ProductList
    },
    {
      path: '/detailslist',
      component: DetailsList
    },
    {
      path: '/info',
      component: Info
    },
    {
      path: '/infoText',
      component: InfoText
    },
    {
      path: '/payment',
      component: Payment
    }
  ]
})
