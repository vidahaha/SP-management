import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/container/Login'
import Public from '@/container/Public'
import Apply from '@/container/Apply'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/public',
      name: 'public',
      component: Public,
    },
    {
        path: '/apply',
        name: 'apply',
        component: Apply,
      }
  ]
})
