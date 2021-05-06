//引入封装好的接口
import {getbannerList} from '../../../util/axios'
const state = {
    bannerList:[]
} 
const getters = {
    getbannerList(state){
        return state.bannerList
    }
}
const mutations = {
    REQ_BANNERLIST(state,payload){
        state.bannerList = payload
    }
} 
const actions = {
    //封装一个获取菜单列表的行动
    getbannerListAction({commit}){
        getbannerList()
        .then(res=>{
            if(res.code==200){
                commit('REQ_BANNERLIST',res.list)
            }
        })
    }
} 


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}