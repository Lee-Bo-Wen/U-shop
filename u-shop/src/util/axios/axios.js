import axios from 'axios'
import router from '../../router/index'
import {Toast} from 'vant'
let http = axios.create({

});
http.interceptors.request.use(req=>{
    req.headers.authorization = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')).token :''
    return req;
})
//响应拦截器
http.interceptors.response.use((res)=>{
    //全局拦截统一错误 比如token失效
    //针对返回的结果进行统一设置！！！
    if(res.data.code==403){
        Toast.fail('登录已过期，请重新登录');
        router.push('/login')
    }
    return res.data
})
export default http;