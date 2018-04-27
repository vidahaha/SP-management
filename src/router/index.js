import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/container/Login'
import Public from '@/container/Public'
import Apply from '@/container/Apply'
import Submit from '@/container/Submit'
import Award from '@/container/Award'


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
    },
    {
        path: '/submit',
        name: 'submit',
        component: Submit,
    },
    {
        path: '/award',
        name: 'award',
        component: Award,
    },
  ]
})
