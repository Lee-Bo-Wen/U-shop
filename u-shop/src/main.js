import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入重置样式
import './assets/css/reset.css'
import './assets/js/remScale'
// 引入vantUI框架
import VantUI from 'vant'
import 'vant/lib/index.css'
Vue.use(VantUI)
//引入封装好的过滤器模块
import gFilter from './filter'
for(let i in gFilter){
  Vue.filter(i,gFilter[i])
}

Vue.prototype.$imgUrl='http://localhost:3000'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
