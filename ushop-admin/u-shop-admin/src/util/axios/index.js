//这个模块用于封装所有的接口
import http from './axios'
/* 
有时候后端（java或者php）它们在post传参接收参数的时候，希望你用formData方式
可以调用qs插件
下载安装  npm install(i)  qs
它具有传参安全性
*/
//引入 qs转化插件
import qs from 'qs'

/* ===========菜单管理============ */
// 封装添加接口
export function addMenu(data){
    return http.post('/api/menuadd',data)
}

//封装一个获取菜单列表接口
export function getMenuList(){
    return http.get('/api/menulist',{
        params:{
            istree:true
        }
    })
}
// 封装编辑接口
export function editMenu(data){
    return http.post('/api/menuedit',data)
}

// 封装删除接口
export function delMenu(data){
    return http.post('/api/menudelete',data)
}

//封装一个获取一个菜单接口
export function getMenuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })
}
/* ===========角色管理============ */
// 封装添加接口
export function addRole(data){
    return http.post('/api/roleadd',data)
}

//封装一个获取角色列表接口
export function getRoleList(){
    return http.get('/api/rolelist')
}
// 封装编辑接口
export function editRole(data){
    return http.post('/api/roleedit',data)
}

// 封装删除接口
export function delRole(data){
    return http.post('/api/roledelete',data)
}

//封装一个获取一个角色接口
export function getRoleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}

/* ===========管理员管理============ */
// 封装添加接口
export function addUser(data){
    return http.post('/api/useradd',data)
}

//封装一个获取管理员列表(分页)接口
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}
// 封装编辑接口
export function editUser(data){
    return http.post('/api/useredit',data)
}

// 封装删除接口
export function delUser(data){
    return http.post('/api/userdelete',data)
}

//封装一个获取一个管理员接口
export function getUserInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}

//封装一个获取管理员总条数接口
export function getUserCount(){
    return http.get('/api/usercount')
}

//封装一个管理员登录
export function userLogin(data){
    return http.post('/api/userlogin',qs.stringify(data))
}
/* =========封装分类接口========= */
//分类添加
export function addCate(data){
    return http.post('/api/cateadd',data)
}
//分类编辑
export function postEditCate(data){
    return http.post('/api/cateedit',data)
}
//分类单条删除
export function deleteCate(data){
    return http.post('/api/catedelete',data)
}
//分类列表
export function getCateList(){
    return http.get('/api/catelist',{
        params:{
            istree:true
        }
    })
}
//分类单条查询
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}

/* 商品规格管理接口 */
//商品规格添加
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
    return http.get('/api/specscount')
}

/* 商品管理接口 */
//商品管理添加
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
//商品管理列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//商品管理获取（一条）
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
//商品管理修改
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}
//商品管理删除
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//商品管理总数（用于计算分页)
export function getGoodsCount(){
    return http.get('/api/goodscount')
}
/* =========封装轮播图接口========= */
//轮播图添加
export function addbanner(data){
    return http.post('/api/banneradd',data)
}
//轮播图编辑
export function postEditbanner(data){
    return http.post('/api/banneredit',data)
}
//轮播图单条删除
export function deletebanner(data){
    return http.post('/api/bannerdelete',data)
}
//轮播图列表
export function getbannerList(){
    return http.get('/api/bannerlist')
}
//轮播图单条查询
export function getbannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}

/* =========封装会员接口========= */
//会员列表
export function getMemberList(){
    return http.get('/api/memberlist')
}

//会员编辑
export function postEditMemeber(data){
    return http.post('/api/memberedit',data)
}

//会员单条查询
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}

/* 限时秒杀管理接口 */
//封装限时秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
//封装限时秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
//封装限时秒杀修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
//封装限时秒杀删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}

