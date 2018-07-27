import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import Charge from './views/Charge.vue'
import ChargeNew from './views/ChargeNew.vue'
import ChargeView from './views/ChargeView.vue'
import Payment from './views/Payment.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // remove hashbang in url
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/charge',
      name: 'charge',
      component: Charge
    },
    {
      path: '/charge/new',
      name: 'charge_new',
      component: ChargeNew
    },
    {
      path: '/charge/view',
      name: 'charge_view',
      component: ChargeView
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
  ]
})
