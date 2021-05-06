import Vue from "vue";
import VueRouter from "vue-router";
//引入封装好的仓库模块
import store from "../store";
//封装一个函数
function hasUrl(url) {
  //some 数组操作方法，有一个是真结果就为真
  return store.getters.getUserInfo.menus_url.some((item) => item === url);
}

Vue.use(VueRouter);

//设定一个子路由列表并导出
export const routerChild = [
  {
    path: "/menu",
    component: () => import("../views/menu/index"),
    name: "菜单管理",
    //路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl("/menu") ? next() : next("/home");
    },
  },
  {
    path: "/role",
    component: () => import("../views/role/role"),
    name: "角色管理",
    //路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl("/role") ? next() : next("/home");
    },
  },
  {
    path: "/manger",
    component: () => import("../views/manger/manger"),
    name: "管理员管理",
    //路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl("/manger") ? next() : next("/home");
    },
  },
  {
    path: "/cate",
    component: () => import("../views/goodscate/goodscate"),
    name: "商品分类管理",
  },
  {
    path: "/specs",
    component: () => import("../views/goodsspecs/goodsspecs"),
    name: "商品规格管理",
  },
  {
    path: "/goods",
    component: () => import("../views/goods/goods"),
    name: "商品管理",
  },
  {
    path: "/banner",
    component: () => import("../views/banner/banner"),
    name: "轮播图管理",
  },
  {
    path: "/member",
    component: () => import("../views/member/member"),
    name: "会员管理",
  },
  {
    path: "/seck",
    component: () => import("../views/seck/seck"),
    name: "秒杀管理",
  },
];

const routes = [
  {
    path: "/login",
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/index",
    component: () => import("../pages/index.vue"),
    children: [
      {
        path: "/home",
        component: () => import("../views/home"),
      },
      ...routerChild,
      {
        path: "",
        redirect: "/home",
      },
    ],
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//封装全局登录拦截
router.beforeEach((to, from, next) => {
  //如果去的是登录就next
  if (to.path == "/login") {
    next();
    return;
  }
  //如果有存储状态就next
  if (store.getters.getUserInfo) {
    next();
    return;
  }
  //以上条件都不符合 就强制跳转到登录
  next("/login");
});

export default router;
