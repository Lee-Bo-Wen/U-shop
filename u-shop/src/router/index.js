import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: ()=>import('../pages/index.vue'),
    children:[
      {
        path:'/home',
        component:()=>import('../views/home.vue'),
        name:'小U商城'
      },
      {
        path:'/shopping',
        component:()=>import('../views/shopping.vue'),
        name:'购物车'
      },
      {
        path:'/getcate',
        component:()=>import('../views/getcate.vue'),
        name:'分类'
      },
      {
        path:'/my',
        component:()=>import('../views/my.vue'),
        name:'我的'
      },
      {
        path: '',
        redirect:'/home'
      }
    ]
  },
  {
    path: '/list',
    component: ()=>import('../pages/list.vue'),
    name:'小U商城'
  },
  {
    path: '/detail',
    component: ()=>import('../pages/detail.vue'),
    name:''
  },
  {
    path: '/login',
    component: ()=>import('../pages/login.vue'),
    name:'手机登录'
  },
  {
    path: '/register',
    component: ()=>import('../pages/register.vue'),
    name:'手机注册'
  },
  {
    path: '/confirm',
    component: ()=>import('../pages/confirm.vue'),
    name:'确认订单'
  },
  {
    path: '*',
    redirect:'/index',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
