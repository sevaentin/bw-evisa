import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
import NewVisa from '@/components/NewVisa.vue'
import About from '@/components/About.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/NewVisa',
      name: 'NewVisa',
      component: NewVisa
    }
    ,
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
