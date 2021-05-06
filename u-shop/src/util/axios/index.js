import http from './axios'
// import qs from 'qs'


//封装登录接口
export function Login(data){
    console.log(data,'入参');
    return http.post('api/login',data)
}

//封装注册接口
export function Register(data){
    return http.post('api/register',data)
}
// 封装轮播图接口
export function getBanner(){
    return http.get('/api/getbanner')
}
// 获取商品信息(首页)
export function getHomeGoods(){
    return http.get('/api/getindexgoods')
}
// 获取分类树形结构
export function getTreeGoods(params){
    return http.get('/api/getcatetree',{params});//fid分类编号，必填项
}



//分类树商品列表
export async function getCateGoods(params){
    let res = await http.get('/api/getgoods',{
        params
    })
    return res.list
}

//商品详情
export async function getGoodsDetail(params){
    let res = await http.get('/api/getgoodsinfo',{
        params
    })
    return res.list
}
//购物车列表
export async function getCartList(params){
    let res = await http.get('/api/cartlist',{
        params
    })
    res.list = res.list ? res.list: []
    return res.list
}
//购物车添加
export async function getCartAdd(data){
    let res = await http.post('/api/cartadd',data)
    return res
}
//购物车编辑
export async function getCartEdit(data){
    let res = await http.post('/api/cartedit',data)
    return res.list
}
//购物车删除
export async function getCartDelete(data){
    let res = await http.post('/api/cartdelete',data)
    return res.list
}
//获取分类信息(首页)
export async function getCartClass(){
    let res = await http.get('/api/getcate')
    return res.list
}